import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(private route: Router) { }
  canActivate(): boolean {
    let token = localStorage.getItem('token')
    if (token) {
      return true
    }
    else {
      this.route.navigateByUrl('login')
      alert('Unauthorized Request..!!')
      return false
    }
  }

}
