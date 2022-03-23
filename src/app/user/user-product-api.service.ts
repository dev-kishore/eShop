import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProductApiService {

  constructor(private hc: HttpClient) { }
  // productData
  productData = new BehaviorSubject(null)
  // category
  categoryProducts = new BehaviorSubject(null)
  // Product search
  searchTerm = new BehaviorSubject(null)
  // getProducts
  getProducts(): Observable<any> {
    return this.hc.get('http://localhost:5000/user/products')
  }
  // add to cart
  addProductToCart(prodDescObj): Observable<any> {
    return this.hc.put('http://localhost:5000/user/product/add-to-cart', prodDescObj)
  }
  // remove from cart
  removeProductFromCart(prodObj): Observable<any> {
    return this.hc.put('http://localhost:5000/user/product/remove-from-cart', prodObj)
  }
  // buy product
  buyProduct(emailObj): Observable<any> {
    return this.hc.post('http://localhost:5000/user/product/buy', emailObj)
  }
  // cancel Order
  cancelOrder(cancelObj): Observable<any> {
    return this.hc.put('http://localhost:5000/user/product/cancel-order', cancelObj)
  }
}
