import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { UserProfileComponent } from '../app/user-profile/user-profile.component';
import { GalleryComponent } from '../app/gallery/gallery.component';
import { LoginComponent } from '../app/login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MapsComponent } from './maps/maps.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  { path: '', redirectTo: '/Menu/Gallery', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  {
    path: 'Menu', children: [
      { path: '', component: GalleryComponent },
      { path: 'Gallery', component: GalleryComponent },
      { path: 'Maps', component: MapsComponent },
      { path: 'ToDoList', component: ToDoListComponent },
      { path: 'Registration', component: RegistrationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
