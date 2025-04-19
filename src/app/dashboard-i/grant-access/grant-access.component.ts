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

  constructor(private userRequestService: UserRequestService) {}

  ngOnInit() {
    this.userRequestService.getPendingAccessRequests().subscribe({
      next: (res) => this.requests = res,
      error: (err) => this.errorMessage = err.error?.detail || 'Failed to load access requests'
    });
  }

  approve(requestId: string) {
    // TODO: implement approval
    alert(`✅ Approved request: ${requestId}`);
  }

  decline(requestId: string) {
    // TODO: implement decline
    alert(`❌ Declined request: ${requestId}`);
  }

}
