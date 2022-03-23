import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProductApiService } from '../user-product-api.service';
import { product } from '../../../../data-types/product-type'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private prodApi: UserProductApiService, private route: Router) { }

  products: product[]
  fashion: product[]
  grocery: product[]
  mobiles: product[]
  electronics: product[]
  footwear: product[]
  books: product[]

  ngOnInit(): void {
    this.filterProducts();
  }
  productPage(item:product) {
    this.prodApi.productData.next(item)
    this.route.navigateByUrl('user/product-page')
  }
  filterProducts() {
    this.prodApi.getProducts().subscribe({
      next: (res) => {
        this.fashion = res.payload.filter(product => product.category == 'Fashion')
        this.grocery = res.payload.filter(product => product.category == 'Groceries')
        this.mobiles = res.payload.filter(product => product.category == 'Mobile')
        this.electronics = res.payload.filter(product => product.category == 'Electronics')
        this.footwear = res.payload.filter(product => product.category == 'Footwear')
        this.books = res.payload.filter(product => product.category == 'Books')
      }
    })
  }
}
