import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private fb: FormBuilder, private modalService: BsModalService, public adminService: AdminService, private router:Router) { }

  addProduct: FormGroup
  fileName: string;
  file: File;
  imageURL: string | ArrayBuffer = "https://bulma.io/images/placeholders/480x480.png"
  shopName: string
  numberOfOrders: Number;

  ngOnInit(): void {
    this.addProduct = this.fb.group({
      image: ['', Validators.required],
      productName: ['', Validators.required],
      price: ['', Validators.required],
      category:['', Validators.required],
      description:['', Validators.required]
    })

    this.adminService.adminObservable.subscribe((data) => {
      this.shopName = data.shopName
      this.numberOfOrders = data.orders.length
    })
  }

  addData(template: TemplateRef<any>) {
    this.openModal(template)
  }

  modalRef?: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  formSubmit(): void {
    let productFormData = new FormData()
    let productData = this.addProduct.value
    productData.shopName = this.shopName
    productFormData.append('product', JSON.stringify(productData))
    productFormData.append('image', this.file)
    this.adminService.addProductToDatabase(productFormData).subscribe({
      next: (res) => {
        this.adminService.adminProductBehaviourSubject.next(res.payload)
        console.log("Payload:",res.payload);
      },
      error: (err) => {
      console.log(err)
      }
    })
    this.modalRef?.hide();
    this.addProduct.reset()
  }

  onFileSelected(file: File) {
    this.file = file
    this.fileName = file.name
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.imageURL = reader.result
    }
  }
  logOut(){
    localStorage.removeItem("token")
    this.router.navigateByUrl('/login')
  }

  get Image(){
    return this.addProduct.get('image')
  }
  get productname(){
    return this.addProduct.get('productName')
  }
  get Price(){
    return this.addProduct.get('price')
  }
  get Category(){
    return this.addProduct.get('category')
  }
  get Description(){
    return this.addProduct.get('description')
  }

}
