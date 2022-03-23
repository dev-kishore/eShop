import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProductApiService } from '../user-product-api.service';
import {product} from '../../../../data-types/product-type'

@Component({
  selector: 'app-card2',
  templateUrl: './card2.component.html',
  styleUrls: ['./card2.component.scss']
})
export class Card2Component implements OnInit {

  @Input() products: product[];
  itemsPerSlide = 1;

  constructor(private prodApi: UserProductApiService, private route: Router) { }

  ngOnInit(): void {
    if (window.innerWidth >= 1024) {
      this.itemsPerSlide = 4;
    }
    if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      this.itemsPerSlide = 2;
    }
  }
  productPage(item) {
    this.prodApi.productData.next(item)
    this.route.navigateByUrl('user/product-page')
  }
}
