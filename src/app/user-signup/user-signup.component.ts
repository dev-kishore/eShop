import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from '../user/user-api.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {

  constructor(private userApi: UserApiService, private route: Router) { }

  ngOnInit(): void {
  }
  userSignupProcess(data: NgForm) {
    this.userApi.userRegistration(data).subscribe({
      next: (res) => {
        if (res.message == 'User created successfully!') {
          this.route.navigateByUrl('login')
        }
      },
      error: (err) => { console.log(err) }
    })

  }

}
