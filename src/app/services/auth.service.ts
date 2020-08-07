import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  ERROR$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        console.log('AuthState', user);
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }


  async googleSignin(): Promise<any> {

    var obj: { [k: string]: any } = {};

    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    console.log('Credenciales', credential.user);
    obj = credential.user;
    obj.tasks = 'some tasks';
    obj.rol = {
      editor: true
    }
    console.log('prueba de objet', obj);
    return new Promise(() => {
      this.updateUserData(credential.user)
      this.router.navigate(['/Menu/Gallery'])
    });

  }

  private updateUserData(user: User) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      rol: {
        editor: true
      }
    }

    console.log('ya es el final?', data);

    userRef.set(data, { merge: true })

  }

  async loginFacebook(): Promise<any> {

    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);

    return new Promise(() => {
      this.updateUserData(credential.user)
      this.router.navigate(['/Menu/Gallery'])
    });

  }

  async loginTwitter(): Promise<any> {

    const provider = new auth.TwitterAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);

    return new Promise(() => {
      this.updateUserData(credential.user)
      this.router.navigate(['/Menu/Gallery'])
    });

  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/Login']);
  }

  signup(name: string, email: string, tel: number, password: string) {

    this.afAuth.createUserWithEmailAndPassword(email, password).then(res => {

      const user = res.user;

      const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: name,
        tel: tel,
        photoURL: user.photoURL
      }

      this.updateUserData(newUser)
      this.router.navigateByUrl('/Menu/Gallery');
    });

  }

  async login(email: string, password: string) {

    this.afAuth.signInWithEmailAndPassword(email, password).then(async value => {
      console.log('Nice, it worked!', value);
      this.ERROR$ = null;
      this.updateUserData(value.user);
      this.router.navigate(['Menu/Gallery'], { queryParams: { registered: true } });
    }).catch(err => {
      console.log('Something went wrong:', err.message);
      console.log('error completo', err);
      console.log('TypeOf', typeof (err));
      this.ERROR$ = of(err);
      this.router.navigate(['Login'], { queryParams: { registered: false } });
      return err.message;
    });

  }

}
