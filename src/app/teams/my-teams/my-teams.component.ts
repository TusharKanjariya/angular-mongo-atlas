import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-my-teams",
  templateUrl: "./my-teams.component.html",
  styleUrls: ["./my-teams.component.css"]
})
export class MyTeamsComponent implements OnInit {
  constructor(private http: HttpClient) {}
  teams: any;
  ngOnInit(): void {
    this.http
      .get(
        "http://localhost:3000/teams/myteams/" + localStorage.getItem("userid")
      )
      .subscribe(val => {
        console.log(val);
        this.teams = val;
      });
  }
}
