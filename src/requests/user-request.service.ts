import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URIs } from '../app/constants';
import { catchError, throwError, Observable } from 'rxjs';
import { DocumentResponse } from '../app/models/document-response';

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {
  constructor(private http: HttpClient) {}

  getPublicKey(): Observable<{ public_key: string }> {
    return this.http.get<{ public_key: string }>(
      `${URIs.BASE_URL}${URIs.ME_V1}${URIs.GET_PUBLIC_KEY}`,
      { withCredentials: true }
    ).pipe(
      catchError(error => throwError(() => error))
    );
  }

  getMyDocuments(): Observable<DocumentResponse[]> {
    return this.http.get<DocumentResponse[]>(
      `${URIs.BASE_URL}${URIs.ME_V1}${URIs.GET_DOCUMENTS}`,
      { withCredentials: true }
    ).pipe(
      catchError(error => throwError(() => error))
    );
  }

  getDocumentHash(docId: string): Observable<{ hash: string }> {
    return this.http.get<{ hash: string }>(
      `${URIs.BASE_URL}${URIs.ME_V1}${URIs.GET_DOCUMENT_HASH}?document_id=${docId}`,
      { withCredentials: true }
    ).pipe(
      catchError((error) => throwError(() => error))
    );
  }

}
