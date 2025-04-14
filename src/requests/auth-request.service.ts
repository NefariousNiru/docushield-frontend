import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { URIs } from '../app/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {

  constructor(private http: HttpClient) { }

  signUp(payload: any): Observable<any> {
    return this.http.post(`${URIs.BASE_URL}${URIs.AUTH}${URIs.SIGN_UP}`, payload, {withCredentials: true}).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  signIn(payload: any): Observable<any> {
    return this.http.post(`${URIs.BASE_URL}${URIs.AUTH}${URIs.SIGN_IN}`, payload, {withCredentials: true}).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
