import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { product } from '../../../../data-types/product-type'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  ordersData: product[] = [];

  constructor(private admin: AdminService) { }

  ngOnInit(): void {
    this.admin.adminObservable.subscribe({
      next: (res) => {
        for (let order of res.orders) {
          this.ordersData.push(order)
        }
        for (let order of res.cancelledOrders) {
          this.ordersData.push(order)
        }
        for (let order of res.processedOrders) {
          this.ordersData.push(order)
        }
      },
      error: (err) => {
      }
    })
  }

  processOrder(index: number) {
    let toProcessOrder = this.ordersData[index]
    let dataToProcessOrder = {
      shopName: toProcessOrder.shopName,
      _id: toProcessOrder._id,
      email: toProcessOrder.user.email
    }
    this.admin.processOrder(dataToProcessOrder).subscribe({
      next: (res) => {
      },
      error: (err) => {
      }
    })
    this.ordersData[index].status = "Processed"
  }
}
