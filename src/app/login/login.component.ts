import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Constants } from '../constants';
import { AuthRequestService } from '../../requests/auth-request.service';
import { DashboardOComponent } from '../dashboard-o/dashboard-o.component';
import { DashboardIComponent } from '../dashboard-i/dashboard-i.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  static pathRoute: string = "login";

  ngOnInit() {
  }

  loginForm: FormGroup;
  errorMessage: string | null = null;
  isError: boolean = false;
  constructor(private router: Router, private fb: FormBuilder, private authRequestService: AuthRequestService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Must be a valid email
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(Constants.PASSWORD_PATTERN)]] // At least 8 chars, alphanumeric
    });
  }


  loginWithEmailAndPassword() {
    if (this.loginForm.invalid) {
      this.errorMessage = "Invalid email or password. Please check and try again.";
      return;
    }

    const { email, password } = this.loginForm.value;

  this.authRequestService.signIn({ email, password }).subscribe({
    next: (response) => {
      console.log('Login successful:', response);
      this.errorMessage = null;
      this.isError = false;
      // Go to Dashboard
      if (response["role"] === 'INDIVIDUAL') {
        this.router.navigate(["/" + DashboardIComponent.pathRoute]);
        localStorage.setItem("role", response["role"])
      } else if (response["role"] === 'ORGANIZATION') {
        this.router.navigate(["/" + DashboardOComponent.pathRoute]);
        localStorage.setItem("role", response["role"])
      }
    },
    error: (err) => {
      console.error('Login error:', err);
      if (err.status === 401) {
        this.errorMessage = err.error?.detail || "Invalid email or password.";
        this.isError = true;
      } else {
        this.errorMessage = "Something went wrong. Please try again later.";
        this.isError = true;
      }
    }
  });
  }

  goToSignUp() {
    this.router.navigate([SignupComponent.pathRoute])
  }
}
