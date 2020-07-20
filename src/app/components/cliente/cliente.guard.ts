import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/class/User';

@Injectable({
  providedIn: 'root',
})
export class ClienteGuard implements CanActivate {
  constructor(private route: Router) {}

  canActivate() {
    const helper = new JwtHelperService();
    const user: User = JSON.parse(localStorage.getItem('data'));
    const token = helper.decodeToken(localStorage.getItem('token'));
    if (user != null && token != null) {
      if (user.role === 'cliente') {
        return true;
      }
    } else {
      this.route.navigateByUrl('/login');
    }
  }
}
