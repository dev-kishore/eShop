import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { admin } from '../../../../data-types/admin-type'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private adminService: AdminService, private fb: FormBuilder, private modalService: BsModalService, private route: Router) { }
  adminData: admin
  editProfileForm: FormGroup

  ngOnInit(): void {
    this.adminService.adminObservable.subscribe({
      next: (res) => {
        this.adminData = res
      }
    })
    this.editProfileForm = this.fb.group({
      email: [this.adminData.email, Validators.required],
      number: [this.adminData.phone, Validators.required]
    })
  }
  editProfile(template: TemplateRef<any>) {
    this.openModal(template)
  }

  modalRef?: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  saveProfile() {
    this.adminData.email = this.editProfileForm.value.email,
      this.adminData.phone = this.editProfileForm.value.number

    this.adminService.editAdmin(this.adminData).subscribe({
      next: (res) => {
      }
    })
    this.modalRef?.hide();
  }
  deleteProfile(data) {
    this.adminService.deleteadmin(data).subscribe({
      next: (res) => {
        alert('Shop account closed successfully!')
        this.route.navigateByUrl('/login')
      }
    })
  }
  get mail() {
    return this.editProfileForm.get('email')
  }
  get number() {
    return this.editProfileForm.get('number')
  }
}
