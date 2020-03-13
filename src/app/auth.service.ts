import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService implements CanActivate {
  constructor(private route: Router) {}
  canActivate(): boolean {
    if (!localStorage.getItem("userid")) {
      this.route.navigate(["/login"]);
      return false;
    } else {
      return true;
    }
  }
}
