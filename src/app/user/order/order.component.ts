import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { UserProductApiService } from '../user-product-api.service';
import { user } from '../../../../data-types/user-type'
import { product } from '../../../../data-types/product-type'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  user: user
  orders: product[] = [];

  constructor(private userApi: UserApiService, private prodApi: UserProductApiService) { }
  ngOnInit(): void {
    this.user = this.userApi.user.getValue()
    this.updateOrders()
  }
  
  cancelOrder(product) {
    let cancelObj = {
      email: this.user.email,
      _id: product._id,
      shopName: product.shopName
    }
    this.prodApi.cancelOrder(cancelObj).subscribe(res => {
      this.userApi.getUser(cancelObj.email).subscribe(res => {
        this.user = res.payload
        this.userApi.user.next(this.user)
        this.orders.length = 0
        this.updateOrders()
      })
    })
  }

  updateOrders() {
    for (let order of this.user.orders) {
      this.orders.push(order)
    }
    for (let order of this.user.cancelledOrders) {
      this.orders.push(order)
    }
    for (let order of this.user.processedOrders) {
      this.orders.push(order)
    }
  }
}
