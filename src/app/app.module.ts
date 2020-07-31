import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MapsComponent } from './maps/maps.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';

var firebaseConfig = {
  apiKey: "AIzaSyB3t5HelTU44Jj4_suz9qMluWTz1M0JFLc",
  authDomain: "wigilabsapi.firebaseapp.com",
  databaseURL: "https://wigilabsapi.firebaseio.com",
  projectId: "wigilabsapi",
  storageBucket: "wigilabsapi.appspot.com",
  messagingSenderId: "694893550591",
  appId: "1:694893550591:web:ad793c958acef4fae3a5ca",
  measurementId: "G-4WD2GG4WR5"
};

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    GalleryComponent,
    LoginComponent,
    MenuComponent,
    MapsComponent,
    ToDoListComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
