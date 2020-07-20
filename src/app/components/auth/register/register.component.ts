import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MyErrorStateMatcher } from '../../../class/MyErrorStateMatcher.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  matcher = new MyErrorStateMatcher();

  userNameFormControl = new FormControl('', [Validators.required]);

  lastNameFormControl = new FormControl('', [Validators.required]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  tipoFormControl = new FormControl('', [Validators.required]);

  file;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  Register() {
    if (
      this.emailFormControl.valid &&
      this.lastNameFormControl.valid &&
      this.userNameFormControl.valid &&
      this.passwordFormControl.valid &&
      this.tipoFormControl.valid
    ) {
      this.auth.signUp(
        this.emailFormControl.value,
        this.passwordFormControl.value,
        this.userNameFormControl.value,
        this.lastNameFormControl.value,
        this.file,
        this.tipoFormControl.value
      );
    } else {
      console.log('bye bitch');
    }
  }

  getFile(event) {
    this.file = event.target.files[0];
  }
}
