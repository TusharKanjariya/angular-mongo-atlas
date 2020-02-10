import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoaderService } from "../loader.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: Router,
    public loader: LoaderService
  ) {}
  proxy = "https://cors-anywhere.herokuapp.com/";
  showMessage: any;
  controls: any;
  showLoader: boolean = false;
  // Login Form Object
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  // Component Intialize
  ngOnInit() {
    this.controls = this.loginForm.controls;
    this.loader.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }

  submitData() {
    this.loader.display(true);
    this.http
      .post(
        this.proxy + "https://design-backend.herokuapp.com/login",
        this.loginForm.value
      )
      .toPromise()
      .then(data => {
        if (Object.keys(data).length <= 0) {
          this.showMessage = false;
        } else {
          this.showMessage = true;
          this.route.navigate(["dashboard"]);
        }
        this.loginForm.reset();
        this.loader.display(false);
      });
  }
}
