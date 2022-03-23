import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserApiService } from '../user-api.service';
import { user } from '../../../../data-types/user-type'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  userdata: user;
  updatedUser: user
  constructor(public fb: FormBuilder, private userApi: UserApiService) { }

  ngOnInit(): void {
    this.userdata = this.userApi.user.getValue()
  }
  userform = this.fb.group({
    username: [''],
    phone: [''],
    address: ['']
  })

  onSubmit() {
    this.updatedUser = this.userform.value
    this.userdata.username = this.updatedUser.username
    this.userdata.phone = this.updatedUser.phone
    this.userdata.address = this.updatedUser.address
    this.userApi.editAccount(this.userdata).subscribe({
      next: () => { },
      error: (err) => console.log(err)
    })
  }

}
