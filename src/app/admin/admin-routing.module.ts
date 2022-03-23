import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { OrdersComponent } from './orders/orders.component';
import { PasswordComponent } from './password/password.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'product', component: ProductComponent },
      { path: 'orders', component: OrdersComponent },
      {path:'profile', component:ProfileComponent},
      {path:'password', component:PasswordComponent},
      { path: '', redirectTo: 'product', pathMatch: 'full' } 
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
