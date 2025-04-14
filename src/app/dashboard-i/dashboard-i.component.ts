import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-i',
  templateUrl: './dashboard-i.component.html',
  styleUrls: ['./dashboard-i.component.css']
})
export class DashboardIComponent implements OnInit {
  static pathRoute: string = "dashboard-i";
  constructor(private router: Router) { }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit() {
  }

}
