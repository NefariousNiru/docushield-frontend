import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Constants } from '../../constants';
import { AuthRequestService } from '../../../requests/auth-request.service';
import { DashboardIComponent } from '../../dashboard-i/dashboard-i.component';
import { DashboardOComponent } from '../../dashboard-o/dashboard-o.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  static pathRoute: string = "register";

  signupForm: FormGroup;
  errorMessage: string | null = null;
  isOrganizationRole: boolean = false;
  constructor(private router: Router, private fb: FormBuilder, private authRequestService: AuthRequestService) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Name is required & at least 3 characters
      email: ['', [Validators.required, Validators.email]], // Email validation
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(Constants.PASSWORD_PATTERN)
        ]
      ], // Password must be strong
      confirmPassword: [''], // Will be validated manually
      role: ['', Validators.required] // Role selection is required
    }, { validator: this.passwordsMatchValidator });

    this.signupForm.get('role')?.valueChanges.subscribe(value => {
      this.isOrganizationRole = value === 'ORGANIZATION';
    });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  registerUserWithEmailAndPassword() {
    if (this.signupForm.invalid) {
      this.errorMessage = "Please correct the errors in the form before submitting.";
      return;
    }

    const { name, email, password, role } = this.signupForm.value;

    this.authRequestService.signUp({ name, email, password, account_type: role }).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        localStorage.setItem("role", role)
        if (role === 'INDIVIDUAL') {
          this.router.navigate(["/" + DashboardIComponent.pathRoute]);
        } else if (role=== 'ORGANIZATION') {
          this.router.navigate(["/" + DashboardOComponent.pathRoute]);
        }
      },
      error: (err) => {
        console.error('Signup error:', err);
        this.errorMessage = err?.error?.detail || 'Registration failed. Try again.';
      }
    });
  }

  goToSignIn() {
    this.router.navigate([LoginComponent.pathRoute]);
  }

  ngOnInit() {
  }
}
