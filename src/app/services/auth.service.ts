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

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${email}`);

    this.afAuth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

    // const data = {
    //   name: name,
    //   email: email,
    //   tel: tel,
    //   password: password
    // }

    // console.log('Data en auth service', data);

    // return userRef.set(data, { merge: true })   
  }

  login(email: string, password: string) {
    console.log(email, password);
    this.afAuth.signInWithEmailAndPassword(email, password).then(value => {
        console.log('Nice, it worked!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        return err.message;
      });
  }

}
