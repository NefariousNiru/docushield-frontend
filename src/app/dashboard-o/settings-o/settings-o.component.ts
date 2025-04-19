import { Component, OnInit } from '@angular/core';
import { UserRequestService } from '../../../requests/user-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-o',
  templateUrl: './settings-o.component.html',
  styleUrls: ['./settings-o.component.css'],
  imports: [CommonModule]
})
export class SettingsOComponent implements OnInit {
  static pathRoute: string = "settings";
  publicKey: string | null = null;
  userId: string | null = null;
  errorMessage: string | null = null;

  constructor(private userRequestService: UserRequestService) {}

  ngOnInit() {
    this.userRequestService.getPublicKey().subscribe({
      next: (res) => {
        this.publicKey = res.public_key || 'Public key not found';
        this.userId = res.user_id || 'User ID not found'
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'Failed to load public key';
      }
    });
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    }).catch(() => {
      alert("Failed to copy.");
    });
  }
}
