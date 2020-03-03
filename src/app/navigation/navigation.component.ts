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
  ngOnInit(): void {
    console.log(localStorage.getItem("userName"));
    this.name = localStorage.getItem("userName");
  }

  logout() {
    localStorage.clear();
    this.route.navigate(["login"]);
  }
}
