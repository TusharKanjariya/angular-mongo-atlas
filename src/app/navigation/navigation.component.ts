import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: "navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  constructor(private http: HttpClient, private route: Router) {}

  name = "";
  id = "";
  notifications: any;
  totalNot: any;
  ngOnInit(): void {
    this.name = localStorage.getItem("userName");
    this.id = localStorage.getItem("userid");
    this.getNotifications();
  }

  getNotifications() {
    this.http
      .get("http://localhost:3000/notification/" + this.id)
      .subscribe(val => {
        this.notifications = val;
        let count = this.notifications.filter(val => val.read === false);
        this.totalNot = count.length;
      });
  }

  readNotification(id) {
    this.http
      .post("http://localhost:3000/notification/read", { id })
      .subscribe(val => {
        this.getNotifications();
      });
  }

  acceptInvite(notid, id, uid) {
    console.log(id, uid);
    let data = {
      notid,
      id,
      uid
    };
    this.http
      .post("http://localhost:3000/teams/acceptInvite", data)
      .subscribe(val => {
        console.log(val);
      });
  }

  rejectInvite(notid, id, uid) {
    console.log(id, uid);
    let data = {
      notid,
      id,
      uid
    };
    this.http
      .post("http://localhost:3000/teams/rejectInvite", data)
      .subscribe(val => {
        console.log(val);
      });
  }

  logout() {
    localStorage.clear();
    this.route.navigate(["login"]);
  }
}
