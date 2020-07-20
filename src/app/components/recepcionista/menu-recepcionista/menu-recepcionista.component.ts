import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/User';

@Component({
  selector: 'app-menu-recepcionista',
  templateUrl: './menu-recepcionista.component.html',
  styleUrls: ['./menu-recepcionista.component.scss'],
})
export class MenuRecepcionistaComponent implements OnInit {
  dateUser: User;

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.dateUser = JSON.parse(localStorage.getItem('data'));
  }

  singOut() {
    localStorage.removeItem('data');
    localStorage.removeItem('token');
    this.route.navigateByUrl('/login');
  }
}
