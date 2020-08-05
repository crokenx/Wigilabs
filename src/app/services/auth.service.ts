import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  ERROR = 0;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }


  async googleSignin(): Promise<any> {

    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    console.log('Credenciales', credential);
    return new Promise(() => {
      this.updateUserData(credential.user)
      this.router.navigate(['/Menu/Gallery'])
    })

  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/Login']);
  }

  signup(name: string, email: string, tel: number, password: string) {

    this.afAuth.createUserWithEmailAndPassword(email, password).then(res => {
      this.updateUserData(res.user)
      this.router.navigateByUrl('/Menu/Gallery');
    });

  }

  async login(email: string, password: string) {

    this.afAuth.signInWithEmailAndPassword(email, password).then(async value => {
      console.log('Nice, it worked!', value);
      this.updateUserData(value.user);
      this.ERROR = 0;
      this.router.navigate(['Menu/Gallery'], { queryParams: { registered: true } });
    }).catch(err => {
      this.ERROR = 1;
      console.log('Something went wrong:', err.message);
      console.log('error completo', err);
      this.router.navigate(['Login'], { queryParams: { registered: false } });
      return err.message;
    });

  }

}
