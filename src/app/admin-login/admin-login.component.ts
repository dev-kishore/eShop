import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(private router: Router, public adminService: AdminService) { }

  registeerError = {
    error: false,
    errormessage: " "
  }

  ngOnInit(): void {
  }
  userLogin() {
    this.router.navigateByUrl('login')
  }
  userLoginProcess(data: NgForm) {
    this.adminService.loginAdmin(data).subscribe({
      next: (res) => {
        if (res.message != "Admin login successfull!") {
          this.registeerError.error = true,
            this.registeerError.errormessage = res.message
          setTimeout(() => { this.registeerError.error = false; this.registeerError.errormessage = '' }, 3000)
        }
        else {
          localStorage.setItem('token', res.token)
          this.adminService.adminBehaviourSubject.next(res.admin)
          this.router.navigateByUrl('admin')
        }
      }
    })
  }
}
