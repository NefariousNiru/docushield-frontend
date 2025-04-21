import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserRequestService } from '../../../requests/user-request.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-access-status',
  templateUrl: './access-status.component.html',
  styleUrls: ['./access-status.component.css'],
  imports: [CommonModule]
})
export class AccessStatusComponent implements OnInit {
  static pathRoute: string = "status";

  errorMessage: string | null = null;

  statuses = [
    { key: "APPROVED", label: "Approved" },
    { key: "PENDING", label: "Pending" },
    { key: "DECLINED", label: "Declined" },
    { key: "COMPLETED", label: "Completed" }
  ];

  requests: Record<string, any[]> = {
    APPROVED: [],
    PENDING: [],
    DECLINED: [],
    COMPLETED: []
  };

  constructor(private userRequestService: UserRequestService) {}

  ngOnInit(): void {
    this.userRequestService.getAccessStatus().subscribe({
      next: (res) => {
        this.requests['APPROVED'] = res.approved || [];
        this.requests['PENDING'] = res.pending || [];
        this.requests['DECLINED'] = res.declined || [];
        this.requests['COMPLETED'] = res.completed || [];
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'Failed to load access requests';
      }
    });
  }

  download(accessId: string) {
    this.userRequestService.downloadDocument(accessId).subscribe({
      next: (fileBlob) => {
        const blobUrl = window.URL.createObjectURL(fileBlob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `document_${accessId}.pdf`; // or use a better title if returned from server
        a.click();
        window.URL.revokeObjectURL(blobUrl);
      },
      error: async (err: HttpErrorResponse) => {
        if (err.error instanceof Blob) {
          const text = await err.error.text();               // read blob as text
          try {
            const json = JSON.parse(text);
            this.errorMessage = json.detail || err.statusText;
          } catch {
            this.errorMessage = err.statusText;
          }
        } else {
          this.errorMessage = err.error?.detail || err.statusText;
        }
      }
    });
  }
}
