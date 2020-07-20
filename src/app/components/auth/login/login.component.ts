import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  NgForm,
  FormGroupDirective,
} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MyErrorStateMatcher } from '../../../class/MyErrorStateMatcher.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  Login() {
    if (this.emailFormControl.value !== '' && this.passwordFormControl.value) {
      this.auth.signIn(
        this.emailFormControl.value,
        this.passwordFormControl.value
      );
    }
  }
}
