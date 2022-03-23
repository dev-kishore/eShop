import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../user-api.service';
import { UserProductApiService } from '../user-product-api.service';
import { product } from '../../../../data-types/product-type'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartData: product[];
  sum: number = 0;
  discount: number = 150;
  shippingFee: number = 150;

  constructor(private userApi: UserApiService, private prodApi: UserProductApiService, private route: Router) { }

  ngOnInit(): void {
    this.cartData = this.userApi.user.getValue().cart
    for (let object of this.cartData) {
      this.sum += object.price
    }
  }
  // remove product from cart
  removeFromCart(product) {
    let removeProdObj = {
      email: this.userApi.user.getValue().email,
      _id: product._id
    }
    this.prodApi.removeProductFromCart(removeProdObj).subscribe({
      next: (res) => {
        if (res.message == 'Product removed from cart successfully!') {
          this.updateUser(removeProdObj.email)
        }
      },
      error: (err) => { console.log(err) }
    })
  }
  // placeOrder
  placeOrder() {
    let emailObj = {
      email: this.userApi.user.getValue().email
    }
    this.prodApi.buyProduct(emailObj).subscribe({
      next: (res) => {
        if (res.message == 'Orders placed successfully!') {
          this.updateUser(emailObj.email)
        }
      },
      error: (err) => { console.log(err) }
    })
  }
  // update cart data with latest user
  updateUser(email) {
    this.userApi.getUser(email).subscribe({
      next: (res) => {
        this.userApi.user.next(res.payload)
        this.cartData = res.payload.cart
        this.sum = 0;
        for (let object of this.cartData) {
          this.sum += object.price
        }
      },
      error: (err) => { console.log(err) }
    })
  }
  gotoProductPage(product) {
    this.prodApi.productData.next(product)
    this.route.navigateByUrl('user/product-page')
  }
}
