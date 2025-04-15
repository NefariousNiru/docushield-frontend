import { Component, OnInit } from '@angular/core';
import { UserRequestService } from '../../../requests/user-request.service';
import { DocumentResponse } from '../../models/document-response';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.css'],
  imports: [CommonModule]
})
export class MyDocumentsComponent implements OnInit {
  static pathRoute: string = "my-documents";

  documents: DocumentResponse[] = [];
  errorMessage: string | null = null;
  constructor(private userRequestService: UserRequestService, private router: Router) { }

  ngOnInit() {
    this.userRequestService.getMyDocuments().subscribe({
      next: (res) => {
        this.documents = res;
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || "Failed to load documents";
      }
    });
  }

  formatDate(epoch: number): string {
    return new Date(epoch * 1000).toLocaleDateString();
  }

  viewHash(docId: string) {
    this.router.navigate([`/dashboard-i/document-hash/${docId}`]);
  }

  download(documentId: string): void {
    this.userRequestService.downloadDocument(documentId).subscribe({
      next: (response) => {
        const blob = response.body;
        const contentDisposition = response.headers.get('Content-Disposition');

        let filename = `document-${documentId}.bin`; // fallback

        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?(.+?)"?$/);
          if (match && match[1]) {
            filename = match[1];
          }
        }

        // Trigger download
        const url = window.URL.createObjectURL(blob!!);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Download failed:', err);
        alert("Failed to download document.");
      }
    });
  }
}
