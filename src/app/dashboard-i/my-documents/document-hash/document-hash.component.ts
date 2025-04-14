import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRequestService } from '../../../../requests/user-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-hash',
  templateUrl: './document-hash.component.html',
  styleUrls: ['./document-hash.component.css'],
  imports: [CommonModule]
})
export class DocumentHashComponent implements OnInit {
  static pathRoute: string = "document-hash"

  hash: string | null = null;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private userRequestService: UserRequestService) {}

  ngOnInit(): void {
    const docId = this.route.snapshot.paramMap.get('id');
    if (!docId) {
      this.errorMessage = "Invalid document ID";
      return;
    }

    this.userRequestService.getDocumentHash(docId).subscribe({
      next: (res) => this.hash = res.hash,
      error: (err) => {
        this.errorMessage = err.error?.detail || 'Failed to fetch document hash';
      }
    });
  }

}
