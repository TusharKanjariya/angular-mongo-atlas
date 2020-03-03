import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "../loader.service";

@Component({
  selector: "app-post-upload",
  templateUrl: "./post-upload.component.html",
  styleUrls: ["./post-upload.component.css"]
})
export class PostUploadComponent implements OnInit {
  constructor(private http: HttpClient, public loader: LoaderService) {}
  showLoader: boolean = false;
  showStatus: any;
  controls: any;
  files: any;
  showAlert: boolean = false;
  showProgress: boolean = false;
  progressValue: any = 0;
  // Signup Form Object
  postUploadForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    desc: new FormControl("", [Validators.required]),
    tags: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required])
  });

  ngOnInit(): void {
    this.controls = this.postUploadForm.controls;
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

  submitData() {
    this.loader.display(true);
    let data = this.postUploadForm.value;
    // let tags = data.tags.split(",");
    let userId = localStorage.getItem("userid");
    let formData: FormData = new FormData();
    formData.append("image", this.files, this.files.name);
    formData.append("userId", userId);
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("tags", data.tags);
    formData.append("category", data.category);

    let info = this.http
      .post("http://localhost:3000/postUpload", formData)
      .toPromise();

    info
      .then(val => {
        if (val["status"]) {
          this.showStatus = val["status"];
        }
        this.loader.display(false);
        this.postUploadForm.reset();
      })
      .catch(err => {
        console.log("err");
        console.log(err);
        this.postUploadForm.reset();
        this.loader.display(false);
      });
  }
}
