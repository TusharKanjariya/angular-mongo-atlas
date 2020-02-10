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
  ngOnInit() {
    this.http
      .get("https://design-backend.herokuapp.com/data")
      .subscribe(val => {
        if (val["loggedIn"] === false) {
          this.route.navigate(["login"]);
        }
        this.userData = val;
      });
  }

  logout() {
    this.http
      .get("https://design-backend.herokuapp.com/logout")
      .subscribe(val => {});
    this.route.navigate(["login"]);
  }
}
