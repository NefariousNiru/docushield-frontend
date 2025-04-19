import { Component, OnInit } from '@angular/core';
import { UserRequestService } from '../../../requests/user-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-access-history',
  templateUrl: './access-history.component.html',
  styleUrls: ['./access-history.component.css'],
  imports: [CommonModule]
})
export class AccessHistoryComponent implements OnInit {
  static pathRoute: string = "access-history";
  history: any[] = [];
  errorMessage: string | null = null;

  constructor(private userRequestService: UserRequestService) {}

  ngOnInit(): void {
    this.userRequestService.getAccessHistory().subscribe({
      next: (res) => this.history = res,
      error: (err) => {
        this.errorMessage = err.error?.detail || "Failed to fetch access history.";
      }
    });
  }

}
