import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PostUploadComponent } from "./post-upload/post-upload.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthService } from "./auth.service";
import { CreateComponent } from "./teams/create/create.component";

const routes: Routes = [
  { path: "", component: SignupComponent },
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthService]
  },
  { path: "post", component: PostUploadComponent, canActivate: [AuthService] },
  {
    path: "posts/:id",
    component: PostDetailComponent,
    canActivate: [AuthService]
  },
  {
    path: "profile/:id",
    component: ProfileComponent,
    canActivate: [AuthService]
  },
  {
    path: "teams/create",
    component: CreateComponent,
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
