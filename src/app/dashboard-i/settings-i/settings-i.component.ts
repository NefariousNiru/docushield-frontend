import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { URIs } from '../../constants';
import { CommonModule } from '@angular/common';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>(
      `${URIs.BASE_URL}${URIs.ME_V1}${URIs.GET_PUBLIC_KEY}`,
      { withCredentials: true }
    ).subscribe({
      next: (response) => {
        this.publicKey = response.public_key || 'Public key not found';
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'Failed to load public key';
      }
    });
  }

}
