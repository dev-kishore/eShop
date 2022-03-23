import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let controller:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule], providers:[AdminService]});
    service = TestBed.inject(AdminService);
    controller=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  let prod=[
    {
      "image": "Image path needs to be here",
      "productName": "Iphone",
      "shopName": "Shop",
      "price": 50000,
      "category": "Mobiles",
      "description": "The fastest phone ever!",
      "quantity": 100
  }
  ]
  let shopName = "estore"
  it('should get product',()=>{
    service.getAdminProduct(shopName).subscribe((val)=>prod=val)
    const request = controller.expectOne(`http://localhost:5000/admin/products/${shopName}`)
    request.flush({val:{products:prod}})
    controller.verify()
    expect(prod).toEqual(prod)
  })
});
