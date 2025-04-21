import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild, Router,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { AuthRequestService } from '../../requests/auth-request.service';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthRequestService, private router: Router) {}

  private check(): Observable<boolean> {
    return this.auth.isLoggedIn().pipe(
      tap(is => {
        if (!is) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.check();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.check();
  }
}
