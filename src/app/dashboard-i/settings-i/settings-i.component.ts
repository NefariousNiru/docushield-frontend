import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { URIs } from '../../constants';
import { CommonModule } from '@angular/common';
import { UserRequestService } from '../../../requests/user-request.service';

@Component({
  selector: 'app-settings-i',
  templateUrl: './settings-i.component.html',
  styleUrls: ['./settings-i.component.css'],
  imports: [CommonModule]
})
export class SettingsIComponent implements OnInit {
  static pathRoute: string = "settings"
  publicKey: string | null = null;
  errorMessage: string | null = null;

  constructor(private userRequestService: UserRequestService) {}

  ngOnInit() {
    this.userRequestService.getPublicKey().subscribe({
      next: (res) => {
        this.publicKey = res.public_key || 'Public key not found';
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'Failed to load public key';
      }
    });
  }

}
