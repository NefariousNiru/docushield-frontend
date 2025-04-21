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

  getPublicKey(): Observable<{user_id: string; public_key: string}> {
    return this.http.get<{ public_key: string, user_id: string}>(
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

  getMyUploads(): Observable<any[]> {
    return this.http.get<any[]>(
      `${URIs.BASE_URL}${URIs.GET_DOCUMENT_UPLOADS}`,
      { withCredentials: true }
    );
  }

  getAccessHistory(): Observable<any[]> {
    return this.http.get<any[]>(
      `${URIs.BASE_URL}${URIs.GET_ACCESS_HISTORY}`,
      { withCredentials: true }
    );
  }

  requestAccess(payload: any): Observable<any> {
    return this.http.post(`${URIs.BASE_URL}${URIs.REQUEST_ACCESS}`, payload, { withCredentials: true });
  }

  getPendingAccessRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${URIs.BASE_URL}${URIs.GRANT_ACCESS}`, { withCredentials: true });
  }

  grantAccess(accessId: string, approve: boolean): Observable<any> {
    const payload = {
      access_id: accessId,
      approve: approve
    };

    return this.http.post(`${URIs.BASE_URL}${URIs.GRANT_ACCESS}`, payload, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError((error) => throwError(() => error))
    );
  }

  getAccessStatus(): Observable<any> {
    return this.http.get(`${URIs.BASE_URL}${URIs.REQUEST_STATUS}`, { withCredentials: true });
  }

  
  downloadDocument(accessId: string): Observable<Blob> {
    const url = `${URIs.BASE_URL}${URIs.DOWNLOAD}?access_id=${accessId}`;
    return this.http.get(url, {
      withCredentials: true,
      responseType: 'blob'  // Important to treat the response as a file
    });
  }
}
