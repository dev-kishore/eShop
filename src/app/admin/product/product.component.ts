import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { product } from '../../../../data-types/product-type';
import { AdminService } from 'src/app/admin.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private fb: FormBuilder, private modalService: BsModalService, public adminService: AdminService) { }


  shopName: string
  products: product[] = []
  editForm: FormGroup
  selectedProduct: product
  id: any = {}

  ngOnInit(): void {
    this.adminService.adminObservable.subscribe((res) => { this.shopName = res.shopName })
    this.adminService.getAdminProduct(this.shopName).subscribe({
      next: (res) => {
        if (res.message == 'Product data fetched successfully!') {
          this.products = res.payload
        }
      },
      error: (err) => { }
    })
    this.adminService.adminProductObservable.subscribe({
      next: (res) => {
        if (res != null) {
          this.products.push(res)
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editData(id, template: TemplateRef<any>) {
    this.openModal(template)
    this.selectedProduct = this.products.find((res) => res._id == id)
    this.editForm = this.fb.group({
      productName: [this.selectedProduct.productName, Validators.required],
      price: [this.selectedProduct.price, Validators.required]
    })
  }

  modalRef?: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  saveData() {
    this.selectedProduct.productName = this.editForm.value.productName
    this.selectedProduct.price = this.editForm.value.price
    this.adminService.editAdminProduct(this.selectedProduct).subscribe({
      next: (res) => { }
    })
    this.modalRef?.hide();
  }

  deleteData(i, ind) {
    this.id = {
      _id: i
    }
    this.adminService.deleteAdminProduct(this.id).subscribe({
      next: (res) => {
      }
    })
    this.products.splice(ind, 1)
  }

  get productname() {
    return this.editForm.get('productName')
  }
  get price() {
    return this.editForm.get('price')
  }
}
