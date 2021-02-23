import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {map, tap} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate{

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: {requiredlogin: true}
      })
      return false
    } else {
      return true
    }
  }
}
