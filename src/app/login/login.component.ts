import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  name = new FormControl('');
  password = new FormControl('');

  constructor(
    public auth: AuthService,
    public faiconLibrary: FaIconLibrary
  ) {
    faiconLibrary.addIcons(faCoffee, faGoogle);
   }

  ngOnInit(): void {
  }

}





