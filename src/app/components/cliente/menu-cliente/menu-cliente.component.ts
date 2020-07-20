import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrls: ['./menu-cliente.component.scss'],
})
export class MenuClienteComponent implements OnInit {
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
