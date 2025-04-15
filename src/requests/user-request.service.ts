import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
      `${URIs.BASE_URL}${URIs.GET_PUBLIC_KEY}`,
      { withCredentials: true }
    ).pipe(
      catchError(error => throwError(() => error))
    );
  }

  getMyDocuments(): Observable<DocumentResponse[]> {
    return this.http.get<DocumentResponse[]>(
      `${URIs.BASE_URL}${URIs.GET_DOCUMENTS}`,
      { withCredentials: true }
    ).pipe(
      catchError(error => throwError(() => error))
    );
  }

  getDocumentHash(docId: string): Observable<{ hash: string }> {
    return this.http.get<{ hash: string }>(
      `${URIs.BASE_URL}${URIs.GET_DOCUMENT_HASH}?document_id=${docId}`,
      { withCredentials: true }
    ).pipe(
      catchError((error) => throwError(() => error))
    );
  }

  uploadDocument(payload: {
    title: string;
    owner_id: string;
    owner_public_key: string;
    file: File;
  }): Observable<any> {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('owner_id', payload.owner_id);
    formData.append('owner_public_key', payload.owner_public_key);
    formData.append('file', payload.file);

    return this.http.post(`${URIs.BASE_URL}${URIs.GET_DOCUMENTS}`, formData, {
      withCredentials: true
    }).pipe(
      catchError((error) => throwError(() => error))
    );
  }

  downloadDocument(documentId: string): Observable<HttpResponse<Blob>> {
    return this.http.get(
      `${URIs.BASE_URL}${URIs.DOWNLOAD_DOCUMENT}?document_id=${documentId}`,
      {
        observe: 'response',
        responseType: 'blob',
        withCredentials: true
      }
    );
  }

}
