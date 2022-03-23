import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProductApiService } from '../user-product-api.service';
import { product } from '../../../../data-types/product-type'
@Component({
  selector: 'app-carousel1',
  templateUrl: './carousel1.component.html',
  styleUrls: ['./carousel1.component.scss']
})
export class Carousel1Component implements OnInit {

  products: product[];

  constructor(private prodApi: UserProductApiService, private route: Router) { }

  ngOnInit(): void {
    this.prodApi.getProducts().subscribe(res => this.products = res.payload)
  }
  electronicsCarousel() {
    let result = this.products.filter(product => product.category == 'Electronics')
    this.prodApi.categoryProducts.next(result)
    this.route.navigateByUrl('user/products/Electronics')
  }
  footwearCarousel() {
    let result = this.products.filter(product => product.category == 'Footwear')
    this.prodApi.categoryProducts.next(result)
    this.route.navigateByUrl('user/products/Footwear')
  }
  mobileCarousel() {
    let result = this.products.filter(product => product.category == 'Mobile')
    this.prodApi.categoryProducts.next(result)
    this.route.navigateByUrl('user/products/Mobile')
  }
}
