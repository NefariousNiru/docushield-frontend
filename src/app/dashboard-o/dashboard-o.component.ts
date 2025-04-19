import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UploadDocsComponent } from './upload-docs/upload-docs.component';
import { MyUploadsComponent } from './my-uploads/my-uploads.component';
import { SettingsOComponent } from './settings-o/settings-o.component';
import { RequestAccessComponent } from "./request-access/request-access.component";

@Component({
  selector: 'app-dashboard-o',
  templateUrl: './dashboard-o.component.html',
  styleUrls: ['./dashboard-o.component.css'],
  imports: [CommonModule, RouterModule, UploadDocsComponent, RequestAccessComponent]
})
export class DashboardOComponent implements OnInit {
  static pathRoute: string = "dashboard-o"
  constructor() { }

  uploadTile = { title: "Upload Docs", icon: "bi-upload", path: UploadDocsComponent.pathRoute };
  requestTile = { title: "Request Access", icon: "bi-person-plus", path: "request" };

  rightTiles = [
    { title: "My Uploads", icon: "bi-folder2-open", path: MyUploadsComponent.pathRoute },
    { title: "Access Status", icon: "bi-check-circle", path: "status" },
    { title: "Settings", icon: "bi-gear", path: SettingsOComponent.pathRoute }
  ];

  ngOnInit() {
  }

}
