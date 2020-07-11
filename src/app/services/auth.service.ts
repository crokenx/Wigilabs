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

  signup(email: string, password: string) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${email}`);

    const data = {
      email: email,
      password: password
    }

    return userRef.set(data, { merge: true })   
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

}
