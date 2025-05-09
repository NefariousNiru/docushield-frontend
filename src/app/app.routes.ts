import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from './login/signup/signup.component';
import { DashboardIComponent } from './dashboard-i/dashboard-i.component';
import { DashboardOComponent } from './dashboard-o/dashboard-o.component';
import { MyDocumentsComponent } from './dashboard-i/my-documents/my-documents.component';
import { SettingsIComponent } from './dashboard-i/settings-i/settings-i.component';
import { DocumentHashComponent } from './dashboard-i/my-documents/document-hash/document-hash.component';
import { UploadDocsComponent } from './dashboard-o/upload-docs/upload-docs.component';
import { MyUploadsComponent } from './dashboard-o/my-uploads/my-uploads.component';
import { SettingsOComponent } from './dashboard-o/settings-o/settings-o.component';
import { AccessHistoryComponent } from './dashboard-i/access-history/access-history.component';
import { AccessStatusComponent } from './dashboard-o/access-status/access-status.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardRedirectGuard } from './auth/dashboard-redirect.guard';
import { NotFoundComponent } from './not-found/not-found.component';


export const routes: Routes = [
  {
    path: "",
    canActivate: [DashboardRedirectGuard],
    pathMatch: "full",
    children: []
  },

  // Public Login route
  { path: LoginComponent.pathRoute, component: LoginComponent, title: "Sign In" },

  // Public Create account route
  { path: SignupComponent.pathRoute, component: SignupComponent, title: "Sign Up" },

  // Protected Routes
  // Individual Dashboard Routes
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      // Individual
      { path: DashboardIComponent.pathRoute, component: DashboardIComponent, title: 'Dashboard' },
      { path: `${DashboardIComponent.pathRoute}/${MyDocumentsComponent.pathRoute}`, component: MyDocumentsComponent },
      { path: `${DashboardIComponent.pathRoute}/${SettingsIComponent.pathRoute}`, component: SettingsIComponent },
      { path: `${DashboardIComponent.pathRoute}/${DocumentHashComponent.pathRoute}/:id`, component: DocumentHashComponent },
      { path: `${DashboardIComponent.pathRoute}/${AccessHistoryComponent.pathRoute}`, component: AccessHistoryComponent },

      // Organization
      { path: DashboardOComponent.pathRoute, component: DashboardOComponent, title: 'Dashboard' },
      { path: `${DashboardOComponent.pathRoute}/${UploadDocsComponent.pathRoute}`, component: UploadDocsComponent },
      { path: `${DashboardOComponent.pathRoute}/${MyUploadsComponent.pathRoute}`, component: MyUploadsComponent },
      { path: `${DashboardOComponent.pathRoute}/${SettingsOComponent.pathRoute}`, component: SettingsOComponent },
      { path: `${DashboardOComponent.pathRoute}/${AccessStatusComponent.pathRoute}`, component: AccessStatusComponent },
    ]
  },

  { path: '**', component: NotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {};
