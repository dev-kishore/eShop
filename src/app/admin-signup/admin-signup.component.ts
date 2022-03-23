import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss']
})
export class AdminSignupComponent implements OnInit {

  constructor(private router: Router, public adminService: AdminService) { }
  registeerError={
    error:false,
    errormessage:" "
  }

  ngOnInit(): void { }

  loginAdmin() {
    this.router.navigateByUrl('admin-login')
  }

  adminSignupProcess(data: NgForm) {
    this.adminService.registerAdmin(data).subscribe({
      next: (res) => {
        if (res.message == "Shop name already exists!") {
          this.registeerError.error=true,
          this.registeerError.errormessage=res.message
          setTimeout(() => { this.registeerError.error = false; this.registeerError.errormessage = '' }, 3000)
        }
        else {
          this.router.navigateByUrl('admin-login')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}