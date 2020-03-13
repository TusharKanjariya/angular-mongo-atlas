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
      .post("http://localhost:3000/login", this.loginForm.value)
      .toPromise()
      .then(data => {
        console.log(data[0]["fname"]);
        console.log(data);
        localStorage.setItem("userName", data[0]["fname"] + data[0]["lname"]);
        localStorage.setItem("userid", data[0]["_id"]);
        localStorage.setItem("userEmail", data[0]["email"]);
        localStorage.setItem("userPassword", data[0]["password"]);
        console.log(localStorage.getItem("userid"));

        if (Object.keys(data).length <= 0) {
          this.showMessage = false;
          this.loader.display(false);
        } else {
          this.showMessage = true;
          this.route.navigate(["dashboard"]);
        }
        this.loginForm.reset();
        this.loader.display(false);
      })
      .catch(err => {
        console.log(err);

        this.loader.display(false);
      });
  }
}
