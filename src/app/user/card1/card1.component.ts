import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProductApiService } from '../user-product-api.service';

@Component({
  selector: 'app-card1',
  templateUrl: './card1.component.html',
  styleUrls: ['./card1.component.scss']
})
export class Card1Component implements OnInit {

  constructor(private prodApi: UserProductApiService, private route: Router) { }

  ngOnInit(): void {
  }

  gotoMobiles() {
    this.prodApi.getProducts().subscribe({
      next: (res) => {
        let result = res.payload.filter(product => product.category == 'Mobile')
        this.prodApi.categoryProducts.next(result)
        this.route.navigateByUrl('user/products/Mobile')
      }
    })
  }
}
