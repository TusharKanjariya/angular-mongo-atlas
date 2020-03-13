import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SignupComponent } from "./signup/signup.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoaderService } from "./loader.service";
import { NavigationComponent } from "./navigation/navigation.component";
import { PostUploadComponent } from "./post-upload/post-upload.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { FileDragDirective } from "./file-drag.directive";
import { ProfileComponent } from "./profile/profile.component";
import { CreateComponent } from './teams/create/create.component';
import { SearchUsersPipe } from './teams/search-users.pipe';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    NavigationComponent,
    PostUploadComponent,
    PostDetailComponent,
    FileDragDirective,
    ProfileComponent,
    CreateComponent,
    SearchUsersPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
