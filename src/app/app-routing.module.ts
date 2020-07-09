import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { UserProfileComponent } from '../app/user-profile/user-profile.component';
import { GalleryComponent } from '../app/gallery/gallery.component';
import { LoginComponent } from '../app/login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MapsComponent } from './maps/maps.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component:LoginComponent },
  { path: 'Menu', children: [
    { path: '', component: GalleryComponent, canActivate: [AuthGuard] },
    { path: 'Gallery', component: GalleryComponent, canActivate: [AuthGuard] },
    { path: 'Maps', component:MapsComponent, canActivate: [AuthGuard] },
    { path: 'ToDoList', component: ToDoListComponent, canActivate: [AuthGuard] }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
