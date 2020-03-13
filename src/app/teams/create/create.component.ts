import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoaderService } from "src/app/loader.service";
@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  usersList: any;
  constructor(private http: HttpClient, public loader: LoaderService) {}
  userSearch = "";
  showLoader: boolean = false;
  showStatus: any;
  controls: any;
  files: any;
  showAlert: boolean = false;
  showProgress: boolean = false;
  progressValue: any = 0;
  // Signup Form Object
  postUploadForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    userSearch: new FormControl("")
  });

  addedusers = [];

  ngOnInit(): void {
    this.http.get("http://localhost:3000/teams/users").subscribe(val => {
      this.usersList = val;
    });
    this.controls = this.postUploadForm.controls;
    this.loader.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }

  addUser(user) {
    this.addedusers.push(user);
    console.log(this.addedusers);
    this.userSearch = "";
  }

  deleteUser(index) {
    this.addedusers.splice(index, 1);
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

  submitData() {
    this.loader.display(true);
    let Requestedmembers = this.addedusers.map(user => {
      return user._id;
    });
    let data = this.postUploadForm.value;
    let userId = localStorage.getItem("userid");

    if (this.files) {
      let formData: FormData = new FormData();
      formData.append("teamProfile", this.files, this.files.name);
      formData.append("name", data.name);
      formData.append("requestedMembers", Requestedmembers.join(","));
      formData.append("adminId", userId);
      this.http
        .post("http://localhost:3000/teams/create", formData)
        .subscribe(val => {
          if (val["created"]) {
            this.showAlert = true;
          }
          console.log(val);
          this.postUploadForm.reset();
          this.addedusers = [];
          this.loader.display(false);
        });
    } else {
      this.loader.display(false);
      alert("Select Profile Image");
    }
  }
}
