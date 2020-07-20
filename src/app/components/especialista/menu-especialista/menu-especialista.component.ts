import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-especialista',
  templateUrl: './menu-especialista.component.html',
  styleUrls: ['./menu-especialista.component.scss'],
})
export class MenuEspecialistaComponent implements OnInit {
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
