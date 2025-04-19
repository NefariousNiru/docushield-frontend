import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GrantAccessComponent } from "./grant-access/grant-access.component";

@Component({
  selector: 'app-dashboard-i',
  templateUrl: './dashboard-i.component.html',
  styleUrls: ['./dashboard-i.component.css'],
  imports: [GrantAccessComponent]
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
