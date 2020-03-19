import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.css"]
})
export class PostDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    this.getData();
    this.getComments(this.id);
  }
  comment = "";
  comments: any;
  id: any;
  postDetail: any;
  tags = [];
  followed: boolean = false;
  teamData: any;
  ngOnInit(): void {}

  getComments(postid) {
    this.http.get("http://localhost:3000/comment/" + postid).subscribe(val => {
      console.log(val);

      this.comments = val;
    });
  }

  getData() {
    this.http
      .get("http://localhost:3000/singlePost/" + this.id)
      .subscribe(val => {
        this.postDetail = val[0];
        this.tags = val[0]["tags"].split(",");
        if (val[0].teamid) {
          this.http
            .get("http://localhost:3000/teams/team/" + val[0].teamid)
            .subscribe(team => {
              this.teamData = team[0];
            });
        }
        this.http
          .get(
            "http://localhost:3000/profile/" + localStorage.getItem("userid")
          )
          .subscribe(val => {
            let currUser = this.postDetail.userData;
            val[0].followers.map(value => {
              if (value === currUser[0]._id) {
                this.followed = true;
              }
            });
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
    let currUser = this.postDetail.userData;
    let notify = {
      uid: currUser[0]._id,
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
    this.http.post("http://localhost:3000/unfollow", data).subscribe(val => {
      console.log(val);
    });
    this.followed = false;
  }

  postComment(postId) {
    if (this.comment !== "") {
      let data = {
        uid: localStorage.getItem("userid"),
        postid: postId,
        comment: this.comment
      };
      this.http.post("http://localhost:3000/comment", data).subscribe(val => {
        console.log(val);
        this.comment = "";
        this.getComments(this.id);
      });
    } else {
      alert("Cant Upload Post");
    }
  }
}
