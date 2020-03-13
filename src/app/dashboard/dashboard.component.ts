import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient, private route: Router) {}
  userData: any;

  intex: any;
  ngOnInit() {
    this.getData().subscribe(val => {
      if (sessionStorage.getItem("id")) {
        this.route.navigate(["login"]);
      }
      this.userData = val;
      this.checkLikes();
    });
  }

  checkLikes() {
    let uid = localStorage.getItem("userid");
    this.userData.map(val => {
      let exist = val.likes.filter(ids => uid === ids);
      if (exist.length !== 0) {
        val.liked = true;
      } else {
        val.liked = false;
      }
    });
  }

  getData() {
    return this.http.get("http://localhost:3000/data");
  }

  likePost(id, index) {
    let userid = localStorage.getItem("userid");
    let info = this.http
      .post("http://localhost:3000/like", { id, userid })
      .subscribe(val => {
        this.userData[index].liked = true;
      });
  }
}
