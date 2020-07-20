import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/class/User';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router) {}
  canActivate() {
    const helper = new JwtHelperService();
    const user: User = JSON.parse(localStorage.getItem('data'));
    const token = helper.decodeToken(localStorage.getItem('token'));
    if (user != null && token != null) {
      switch (user.role) {
        case 'cliente':
          this.route.navigateByUrl('/cliente');
          break;

        case 'especialista':
          this.route.navigateByUrl('/especialista');
          break;

        case 'recepcionista':
          this.route.navigateByUrl('/recepcionista');
          break;
      }
    } else {
      return true;
    }
  }
}
