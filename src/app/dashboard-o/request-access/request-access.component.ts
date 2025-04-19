import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRequestService } from '../../../requests/user-request.service';
import { CommonModule } from '@angular/common';
import { uuidValidator } from '../../util/util';

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class RequestAccessComponent implements OnInit {

  requestForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userRequestService: UserRequestService
  ) {
    this.requestForm = this.fb.group({
      document_id: ['', [Validators.required, Validators.minLength(64)]],
      owner_id: ['', [Validators.required, uuidValidator]]
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log(this.requestForm.value["document_id"].length)
    if (this.requestForm.invalid) {
      this.errorMessage = "Please fill out all required fields correctly.";
      this.successMessage = null;
      return;
    }

    const payload = this.requestForm.value;

    this.userRequestService.requestAccess(payload).subscribe({
      next: () => {
        this.successMessage = "Access request submitted successfully!";
        this.errorMessage = null;
        this.requestForm.reset();
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || "Failed to submit access request.";
        this.successMessage = null;
      }
    });
  }
}
