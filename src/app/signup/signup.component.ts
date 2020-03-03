import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "../loader.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private http: HttpClient, public loader: LoaderService) {}
  proxy = "https://cors-anywhere.herokuapp.com/";
  showLoader: boolean = false;
  showStatus: any;
  controls: any;
  // Signup Form Object
  signupForm = new FormGroup({
    fname: new FormControl("", [Validators.required]),
    lname: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ]),
    passion: new FormControl("", [Validators.required])
  });

  // Component Intialize
  ngOnInit() {
    this.controls = this.signupForm.controls;
    this.loader.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }

  // Form Submit Function
  submitData() {
    this.loader.display(true);
    let info = this.http
      .post("http://localhost:3000/signup", this.signupForm.value)
      .toPromise();

    info
      .then(res => {
        if (res["status"]) {
          this.showStatus = res["status"];
        }
        this.signupForm.reset();
        this.loader.display(false);
      })
      .catch(err => {
        console.log(err);
        this.loader.display(false);
      });
  }
}
