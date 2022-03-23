import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../user-api.service';
import { UserProductApiService } from '../user-product-api.service';
import { product } from '../../../../data-types/product-type'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  categoryList: string[] = ['All', 'Mobile', 'Fashion', 'Electronics', 'Books', 'Groceries', 'Footwear']
  products: product[];
  searchTerm: string

  constructor(private route: Router, public userApi: UserApiService, private prodApi: UserProductApiService) { }

  ngOnInit(): void {
    this.prodApi.getProducts().subscribe({
      next: (res) => {
        this.products = res.payload
      },
      error: (err) => console.log(err)
    })
  }
  // choose category wise products
  chooseCategory(category) {
    // for showing list of all products
    this.prodApi.searchTerm.next(null)
    if (category == 'All') {
      this.prodApi.categoryProducts.next(this.products)
    }
    else {
      let categoryProducts = this.products.filter(prodObj => prodObj.category == category)
      this.prodApi.categoryProducts.next(categoryProducts)
    }
    // navigate to category page
    this.route.navigateByUrl(`user/products/${category}`)
  }
  // search product
  search() {
    this.prodApi.searchTerm.next(this.searchTerm)
  }
  // logout Operation
  logout() {
    this.userApi.logoutUser()
    // route to login page
    this.route.navigateByUrl('login')
  }
}
