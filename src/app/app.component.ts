import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Wigilabs';
  url: string;

  constructor(
    public auth: AuthService,
    public router: Router
  ){

  }

  ngOnInit(){
  }

}
