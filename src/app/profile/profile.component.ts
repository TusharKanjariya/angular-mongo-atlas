import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  id: any;
  profileData: any;
  followed: boolean = false;
  editOptions = false;
  title = "";
  description = "";
  category = "";
  files: any;
  postID: any;

  ISOtoRegularDate(date) {
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return dt + "-" + month + "-" + year;
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.id = param["id"];
      if (this.id === localStorage.getItem("userid")) {
        this.editOptions = true;
      }
    });

    this.getAllData();
  }

  getAllData() {
    this.http.get("http://localhost:3000/profile/" + this.id).subscribe(val => {
      console.log(val);
      this.profileData = val[0];
    });

    this.http
      .get("http://localhost:3000/profile/" + localStorage.getItem("userid"))
      .subscribe(val => {
        val[0].followers.map(value => {
          if (value === this.id) {
            this.followed = true;
          }
        });
      });
  }

  followUser(uid) {
    let data = {
      uid: uid,
      id: localStorage.getItem("userid")
    };
    this.http.post("http://localhost:3000/follow", data).subscribe(val => {
      console.log(val);
    });
    // let currUser = this.postDetail.userData;
    let notify = {
      uid: uid,
      message: localStorage.getItem("userName") + " Started Follows You",
      read: false
    };
    this.http
      .post("http://localhost:3000/notification/add", notify)
      .subscribe(val => {
        console.log(val);
      });
    this.followed = true;
  }

  unfollowUser(uid) {
    let data = {
      uid: uid,
      id: localStorage.getItem("userid")
    };
    console.log(data);

    this.http.post("http://localhost:3000/unfollow", data).subscribe(val => {
      console.log(val);
    });
    this.followed = false;
  }

  removePost(id) {
    this.http
      .delete("http://localhost:3000/deletePost/" + id)
      .subscribe(val => {
        this.getAllData();
        console.log(val);
      });
  }

  getFiles(e) {
    let f = e.target.files;
    this.files = f[0];
    console.log(this.files);
  }

  sendData(post) {
    this.title = post.title;
    this.description = post.description;
    this.category = post.category;
    this.postID = post._id;
  }

  editPost() {
    if (this.files) {
      console.log("if");
      let formData: FormData = new FormData();
      formData.append("image", this.files, this.files.name);
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("category", this.category);
      formData.append("pid", this.postID);

      this.http
        .post("http://localhost:3000/editPost", formData)
        .subscribe(val => {
          console.log(val);
          this.getAllData();
        });
    } else {
      console.log("Else");
      let data = {
        pid: this.postID,
        title: this.title,
        description: this.description,
        category: this.category,
        upload: true
      };
      this.http.post("http://localhost:3000/editPost", data).subscribe(val => {
        console.log(val);
        this.getAllData();
      });
    }
  }
}
