import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserRequestService } from '../../../requests/user-request.service';

@Component({
  selector: 'app-upload-docs',
  standalone: true,
  templateUrl: './upload-docs.component.html',
  styleUrls: ['./upload-docs.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class UploadDocsComponent {
  static pathRoute: string = "upload";

  uploadForm: FormGroup;
  selectedFile: File | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private userRequestService: UserRequestService) {
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      owner_id: ['', Validators.required],
      owner_public_key: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  onSubmit() {
    if (this.uploadForm.invalid || !this.selectedFile) {
      this.errorMessage = "All fields are required including the file.";
      return;
    }

    const payload = {
      title: this.uploadForm.value.title,
      owner_id: this.uploadForm.value.owner_id,
      owner_public_key: this.uploadForm.value.owner_public_key,
      file: this.selectedFile
    };

    this.userRequestService.uploadDocument(payload).subscribe({
      next: () => {
        this.successMessage = "Document uploaded successfully!";
        this.errorMessage = null;
        this.uploadForm.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || "Upload failed.";
      }
    });
  }
}
