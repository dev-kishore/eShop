import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from '../user-api.service';
import { user } from '../../../../data-types/user-type'

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  constructor(private userApi: UserApiService, private route: Router) { }

  userData: user
  registeerError = {
    error: false,
    errormessage: " "
  }
  ngOnInit(): void {
    this.userData = this.userApi.user.getValue()
  }
  // delete profile
  deleteProfile() {
    let email = this.userData.email
    this.userApi.deleteAccount(email).subscribe({
      next: (res) => {
        if (res.message == 'User deleted successfully!') {
          this.userApi.logoutUser()
          this.route.navigateByUrl('login')
        }
      },
      error: (err) => { console.log(err) }
    })
  }
  updatePassword(formref: NgForm) {
    let updatedPasswordObj = formref.value
    updatedPasswordObj.email = this.userData.email
    this.userApi.changePassword(updatedPasswordObj).subscribe({
      next: (res) => {
        if (res.message !== "User password updated successfully!") {
          this.registeerError.error = true,
            this.registeerError.errormessage = res.message
          setTimeout(() => { this.registeerError.error = false; this.registeerError.errormessage = '' }, 3000)
        }
        else {
          this.userApi.logoutUser()
          this.route.navigateByUrl('login')
        }
      },
      error: (err) => { console.log(err) }
    })
    formref.reset()
  }

}
