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
    });
    this.http.get("http://localhost:3000/profile/" + this.id).subscribe(val => {
      this.profileData = val[0];
    });
  }
}
