// src/app/auth/dashboard-redirect.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate, Router, UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthRequestService } from '../../requests/auth-request.service';
import { DashboardIComponent } from '../dashboard-i/dashboard-i.component';
import { DashboardOComponent } from '../dashboard-o/dashboard-o.component';

@Injectable({ providedIn: 'root' })
export class DashboardRedirectGuard implements CanActivate {
  constructor(
    private auth: AuthRequestService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean|UrlTree> {
    return this.auth.getUserInfo().pipe(
      map(info => {
        console.dir(info)
        // not logged in?
        if (!info?.user_id) {
          return this.router.parseUrl('/login');
        }
        // send them where their role dictates
        return info.role === 'INDIVIDUAL'
          ? this.router.parseUrl(`/${DashboardIComponent.pathRoute}`)
          : this.router.parseUrl(`/${DashboardOComponent.pathRoute}`);
      }),
      catchError(_ => of(this.router.parseUrl('/login')))
    );
  }
}
