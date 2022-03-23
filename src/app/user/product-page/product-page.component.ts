import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { UserProductApiService } from '../user-product-api.service';
import { product } from '../../../../data-types/product-type'
import { user } from '../../../../data-types/user-type'




@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  chosenProduct: product;
  userProfile: user;
  relatedProducts: product[]
  status: string
  productPrice: number
  quantity: number = 1

  constructor(private userApi: UserApiService, private prodApi: UserProductApiService) { }

  ngOnInit(): void {
    this.chosenProduct = this.prodApi.productData.getValue()
    this.productPrice = this.prodApi.productData.getValue().price
    this.userProfile = this.userApi.user.getValue()
    this.getRelatedProducts()
  }

  addToCart() {
    // if user adds the same data into the cart
    let cart = this.userProfile.cart.find(product => product._id == this.chosenProduct._id)
    if (cart == undefined) {
      this.chosenProduct.quantity = this.quantity
      this.chosenProduct.price = this.productPrice * this.quantity
      let cartObj = {
        email: this.userApi.user.getValue().email,
        product: this.chosenProduct
      }
      // updateCart
      this.prodApi.addProductToCart(cartObj).subscribe({
        next: (res) => {
          if (res.message == 'Cart updated successfully!') {
            // update cart count
            this.userApi.getUser(cartObj.email).subscribe({
              next: (res) => {
                let user = res.payload
                this.userApi.user.next(user)
                this.userProfile.cart = user.cart
              },
              error: (err) => { alert('Something Went wrong!!') }
            })

          }
        },
        error: (err) => { alert('Something Went wrong!!') }
      })
      this.chosenProduct.price = this.productPrice
      this.status = 'item Added to cart successfully'
    }
    else {
      this.status = 'item is Already Added to cart!!'
    }

  }
  // quantity counter
  addQty() { this.quantity += 1 }
  delQty() { this.quantity -= 1 }

  // related products 
  getRelatedProducts() {
    this.prodApi.getProducts().subscribe({
      next: (res) => {
        this.relatedProducts = res.payload.filter(product => product.category == this.chosenProduct.category)
      }
    })
  }
}
