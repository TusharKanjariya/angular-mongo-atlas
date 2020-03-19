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
  isLike: boolean;
  posts: any;
  noPost: boolean = false;
  currUser: any;
  isAdmin: any;
  usersList: any;
  userSearch = "";
  addedusers: any = [];
  name = "";
  profile = "";
  files: any;
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
    this.getUserData();
  }

  ngOnInit(): void {
    this.loader.display(true);
    this.route.params.subscribe(param => {
      this.id = param.tid;
      this.getData();
      this.loader.display(false);
    });
  }

  getUserData() {
    this.http.get("http://localhost:3000/teams/users").subscribe(val => {
      this.usersList = val;
    });
  }

  addUser(user) {
    this.addedusers.push(user);
    console.log(this.addedusers);
    this.userSearch = "";
  }

  getData() {
    this.http
      .get("http://localhost:3000/teams/team/" + this.id)
      .subscribe(val => {
        console.log(val);
        this.teamData = val[0];
        let admin = this.teamData["teamMembers"].filter(
          val => this.currUser === val["_id"]
        );

        if (admin.length > 0) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }

        console.log("isAdmin", this.isAdmin);
      });
    this.http
      .get("http://localhost:3000/teams/getPosts/" + this.id)
      .subscribe((val: any[]) => {
        console.log(val);
        if (val.length > 0) {
          this.posts = val;
          this.posts.map(val => {
            let liked = val.likes.filter(l => l === this.currUser);
            if (liked.length !== 0) {
              val.liked = true;
            } else {
              val.liked = false;
            }
          });
        } else {
          this.noPost = true;
        }
      });
  }

  deleteUser(index) {
    this.addedusers.splice(index, 1);
  }

  likePost(id, index) {
    let userid = localStorage.getItem("userid");
    let info = this.http
      .post("http://localhost:3000/like", { id, userid })
      .subscribe(val => {
        this.posts[index].liked = true;
      });
  }

  saveData() {
    let data = {
      tid: this.teamData["_id"],
      users: this.addedusers,
      username: localStorage.getItem("userName")
    };
    this.http
      .post("http://localhost:3000/teams/addMembers", data)
      .subscribe(val => {
        console.log(val);
        this.getData();
      });
  }

  getFiles(e) {
    let d = e.target.files;
    this.files = d[0];
  }

  teamSetting() {
    console.log(this.files);

    if (this.files) {
      let formData: FormData = new FormData();
      formData.append("teamProfile", this.files, this.files.name);
      formData.append("teamname", this.name);
      formData.append("teamID", this.teamData["_id"]);
      formData.append("fileupload", "true");
      this.http
        .post("http://localhost:3000/teams/teamSettings", formData)
        .subscribe(val => {
          this.getData();
        });
    } else {
      let data;
      data = {
        fileupload: true,
        teamname: this.name,
        teamID: this.teamData["_id"]
      };
      this.http
        .post("http://localhost:3000/teams/teamSettings", data)
        .subscribe(val => {
          this.getData();
        });
    }
  }

  removeMember(uid, teamid) {
    let data = {
      uid,
      teamid
    };
    this.http
      .post("http://localhost:3000/teams/deleteMember", data)
      .subscribe(val => {
        console.log(val);
        this.getData();
      });
  }
}
