import { Component, OnInit } from '@angular/core';
import { UserRequestService } from '../../../requests/user-request.service';
import { CommonModule } from '@angular/common';
import { DocumentResponse } from '../../models/document-response';

@Component({
  selector: 'app-my-uploads',
  templateUrl: './my-uploads.component.html',
  styleUrls: ['./my-uploads.component.css'],
  imports: [CommonModule]
})
export class MyUploadsComponent implements OnInit {
  static pathRoute: string = "my-upload";
  uploads: DocumentResponse[] = [];
  errorMessage: string | null = null;

  constructor(private userRequestService: UserRequestService) { }

  ngOnInit(): void {
    this.userRequestService.getMyUploads().subscribe({
      next: (data) => this.uploads = data,
      error: (err) => {
        this.errorMessage = err.error?.detail || "Failed to load uploads.";
      }
    });
  }

}
