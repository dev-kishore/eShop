import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { OrderComponent } from './order/order.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsComponent } from './products/products.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: 'eshop', component: ProductsComponent },
      { path: 'user-dashboard', component: UserDashboardComponent },
      { path: 'order', component: OrderComponent },
      { path: 'cart', component: CartComponent },
      { path: 'product-page', component: ProductPageComponent },
      { path: 'products/:category', component: CategoryComponent },
      { path: '', redirectTo: 'eshop', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
