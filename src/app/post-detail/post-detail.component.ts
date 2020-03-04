import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.css"]
})
export class PostDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  id: any;
  postDetail: any;
  tags = [];
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    this.getData();
  }

  getData() {
    let pid = this.id;
    this.http
      .get("http://localhost:3000/singlePost/" + this.id)
      .subscribe(val => {
        console.log(val);
        this.postDetail = val[0];
        this.tags = val[0]["tags"].split(",");
      });
  }
}
