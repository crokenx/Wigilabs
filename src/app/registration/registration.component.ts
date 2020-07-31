import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registration: FormGroup;

  constructor(
    public auth: AuthService
  ) { 
    this.registration = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      repeat: new FormControl('',Validators.required)
    }, { validators: this.passwordConfirming });
  }

  ngOnInit(): void {
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('repeat').value) {
        return { invalid: true };
    } 
  }


}
