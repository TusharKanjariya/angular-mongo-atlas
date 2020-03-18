import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "src/app/loader.service";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.css"]
})
export class TeamComponent implements OnInit {
  displayData: boolean;
  teamData: any;
  id: any;
  posts: any;
  noPost: boolean = false;
  currUser: any;
  isAdmin: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public loader: LoaderService
  ) {
    this.currUser = localStorage.getItem("userid");
    loader.display(true);
    loader.status.subscribe(state => {
      this.displayData = state;
      console.log(this.displayData);
    });
  }

  ngOnInit(): void {
    this.loader.display(true);
    this.route.params.subscribe(param => {
      this.id = param.tid;
      this.http
        .get("http://localhost:3000/teams/team/" + this.id)
        .subscribe(val => {
          console.log(val);
          this.teamData = val[0];
          let admin = this.teamData["teamMembers"].filter(
            val => val._id === this.currUser
          );
          this.isAdmin = admin.length;
        });
      this.http
        .get("http://localhost:3000/teams/getPosts/" + this.id)
        .subscribe((val: any[]) => {
          if (val.length > 0) {
            this.posts = val;
          } else {
            this.noPost = true;
          }
        });
      this.loader.display(false);
    });
  }
}
