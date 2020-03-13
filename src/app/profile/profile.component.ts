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
}
