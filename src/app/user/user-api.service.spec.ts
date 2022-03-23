import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserApiService } from './user-api.service';

describe('UserApiService', () => {
  let service: UserApiService;
  let controller:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule], providers:[UserApiService]});
    service = TestBed.inject(UserApiService);
    controller=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  let user=[
    {
        "email": "kishore@mail.com",
        "password": "kishore"
    }]
  let email = "store@mail.com"
  it('should get user details', ()=>{
    service.getUser(email).subscribe((val)=>user=val)
    const request = controller.expectOne(`http://localhost:5000/user/get-user/${email}`)
    request.flush({pro:{user:user}})
    controller.verify()
    expect(user).toEqual(user)
  })
});
