import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http: HttpClient) { }

  adminProductBehaviourSubject = new BehaviorSubject(null)
  adminProductObservable = this.adminProductBehaviourSubject.asObservable()
  adminBehaviourSubject = new BehaviorSubject(null)
  adminObservable = this.adminBehaviourSubject.asObservable()

  registerAdmin(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/admin/create-admin', data)
  }

  loginAdmin(credentials: any): Observable<any> {
    return this.http.post('http://localhost:5000/admin/admin-login', credentials)
  }

  addProductToDatabase(productData: any): Observable<any> {
    return this.http.post('http://localhost:5000/admin/add-product', productData)
  }

  getAdminProduct(shopName: any): Observable<any> {
    return this.http.get(`http://localhost:5000/admin/products/${shopName}`)
  }

  editAdminProduct(data): Observable<any> {
    return this.http.put('http://localhost:5000/admin/edit-product', data)
  }

  deleteAdminProduct(id): Observable<any> {
    return this.http.delete('http://localhost:5000/admin/delete-product', { body: id })
  }

  editAdmin(obj): Observable<any> {
    return this.http.put(' http://localhost:5000/admin/edit-account', obj)
  }

  deleteadmin(obj): Observable<any> {
    return this.http.delete(`http://localhost:5000/admin/delete-account/${obj}`)
  }

  changePassword(data: any): Observable<any> {
    return this.http.put('http://localhost:5000/admin/reset-password', data)
  }

  processOrder(data: any): Observable<any> {
    return this.http.put('http://localhost:5000/admin/process-order', data)
  }
}
