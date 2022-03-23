import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProductApiService } from '../user-product-api.service';
import { product } from '../../../../data-types/product-type'


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  products: product[]
  constructor(public prodApi: UserProductApiService, private route: Router) { }

  ngOnInit(): void {
    this.products = this.prodApi.categoryProducts.getValue()
  }
  gotoProductPage(product) {
    this.prodApi.productData.next(product)
    this.route.navigateByUrl('user/product-page')
  }
}
