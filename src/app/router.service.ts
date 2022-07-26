import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router, private location: Location) {}

  toHome(username: string) {
    this.router.navigate(['employees', { userid: username }], {
      queryParams: { 'loginTime ': new Date().toTimeString() },
    });
  }

  toLogin() {
    this.router.navigate(['login']);
  }

  toPrevious() {
    this.location.back();
  }
}
