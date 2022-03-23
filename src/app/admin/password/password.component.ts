import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) { }
  changePasswordForm: FormGroup
  email: string
  registeerError = {
    error: false,
    errormessage: " "
  }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  formSubmit() {
    this.adminService.adminObservable.subscribe((res) => this.email = res.email)
    let passwordData = this.changePasswordForm.value
    passwordData.email = this.email
    this.adminService.changePassword(passwordData).subscribe(
      {
        next: (res) => {
          console.log(res)
          if (res.message !== "Admin password updated successfully!") {
            this.registeerError.error = true,
              this.registeerError.errormessage = res.message
            setTimeout(() => { this.registeerError.error = false; this.registeerError.errormessage = '' }, 3000)
          }
          else {
            alert('changing password')
            localStorage.removeItem('token')
            this.router.navigateByUrl('admin-login')
          }
        }
      }
    )
  }
  get oldpassword() {
    return this.changePasswordForm.get('oldPassword')
  }
  get newpassword() {
    return this.changePasswordForm.get('newPassword')
  }
  get confirmpassword() {
    return this.changePasswordForm.get('confirmPassword')
  }
}
