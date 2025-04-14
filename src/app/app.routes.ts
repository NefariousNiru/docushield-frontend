import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from './login/signup/signup.component';
import { DashboardIComponent } from './dashboard-i/dashboard-i.component';
import { DashboardOComponent } from './dashboard-o/dashboard-o.component';
import { MyDocumentsComponent } from './dashboard-i/my-documents/my-documents.component';
import { SettingsIComponent } from './dashboard-i/settings-i/settings-i.component';
import { DocumentHashComponent } from './dashboard-i/my-documents/document-hash/document-hash.component';


export const routes: Routes = [
  // Default path redirects to dashboard (TODO to dashboard post auth guard)
  { path: "", redirectTo: LoginComponent.pathRoute, pathMatch: "full" },

  // Protected Dashboard route
  // { path: DashboardComponent.pathRoute, component: DashboardComponent, canActivate: [authGuard], title: "Dashboard" },
  { path: DashboardIComponent.pathRoute, component: DashboardIComponent, title: "Dashboard" },


  { path: DashboardOComponent.pathRoute, component: DashboardOComponent, title: "Dashboard" },

  // Public Login route
  { path: LoginComponent.pathRoute, component: LoginComponent, title: "Sign In" },

  // Create account route
  { path: SignupComponent.pathRoute, component: SignupComponent, title: "Sign Up" },


  { path: `${DashboardIComponent.pathRoute}/${MyDocumentsComponent.pathRoute}`, component: MyDocumentsComponent },
  { path: `${DashboardIComponent.pathRoute}/${SettingsIComponent.pathRoute}`, component: SettingsIComponent },
  { path: `${DashboardIComponent.pathRoute}/${DocumentHashComponent.pathRoute}:id`, component: DocumentHashComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {};
