import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from '../user/user-api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userApi: UserApiService) { }

  registeerError = {
    error: false,
    errormessage: " "
  }
  ngOnInit(): void {
  }
  adminLogin() {
    this.router.navigateByUrl('admin-login')
  }
  userSignup() {
    this.router.navigateByUrl('user-signup')
  }
  adminSignup() {
    this.router.navigateByUrl('admin-signup')
  }
  loginProcess(data: NgForm) {
    this.userApi.loginUser(data).subscribe({
      next: (res) => {
        if (res.message !== 'User login successfull!') {

          this.registeerError.error = true,
            this.registeerError.errormessage = res.message
          setTimeout(() => { this.registeerError.error = false; this.registeerError.errormessage = '' }, 3000)
        } else {

          localStorage.setItem('token', res.token)
          this.userApi.user.next(res.user)
          this.router.navigateByUrl('user')
        }
      },
      error: (err) => { console.log(err) }
    })
  }

}
