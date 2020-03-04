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
  files: any;
  showAlert: boolean = false;
  showProgress: boolean = false;
  progressValue: any = 0;
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

  onFileDropped($event) {
    if (
      $event[0].type === "image/png" ||
      $event[0].type === "image/jpg" ||
      $event[0].type === "image/jpeg"
    ) {
      console.log($event);

      this.showAlert = false;
      let fileCollection = [];
      for (const item of $event) {
        fileCollection.push(item);
      }
      this.files = fileCollection[0];
    } else {
      this.files = false;
      this.showAlert = true;
    }
  }

  // Form Submit Function
  submitData() {
    this.loader.display(true);
    let data = this.signupForm.value;
    let formData: FormData = new FormData();
    formData.append("profile", this.files, this.files.name);
    formData.append("fname", data.fname);
    formData.append("lname", data.lname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("passion", data.passion);

    let info = this.http
      .post("http://localhost:3000/signup", formData)
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
