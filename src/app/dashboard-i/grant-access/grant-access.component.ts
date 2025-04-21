import { Component, OnInit } from '@angular/core';
import { UserRequestService } from '../../../requests/user-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grant-access',
  templateUrl: './grant-access.component.html',
  styleUrls: ['./grant-access.component.css'],
  imports: [CommonModule]
})
export class GrantAccessComponent implements OnInit {

  requests: any[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private userRequestService: UserRequestService) {}

  ngOnInit() {
    this.refreshRequests();
  }

  refreshRequests() {
    this.userRequestService.getPendingAccessRequests().subscribe({
      next: (res) => {
        this.requests = res;
        this.errorMessage = null;
        console.log(res)
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || "Failed to load requests.";
      }
    });
  }

  approve(requestId: string) {
    console.log(requestId)
    this.userRequestService.grantAccess(requestId, true).subscribe({
      next: () => {
        this.successMessage = `✅ Approved request: ${requestId}`;
        this.refreshRequests();
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || "Failed to approve request.";
      }
    });
  }

  decline(requestId: string) {
    this.userRequestService.grantAccess(requestId, false).subscribe({
      next: () => {
        this.successMessage = `❌ Declined request: ${requestId}`;
        this.refreshRequests();
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || "Failed to decline request.";
      }
    });
  }
}
