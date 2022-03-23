import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {HttpClientModule} from '@angular/common/http'
import { UserComponent } from './user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Carousel1Component } from './carousel1/carousel1.component';
import { Card1Component } from './card1/card1.component';
import { Card2Component } from './card2/card2.component';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { CategoryComponent } from './category/category.component';
import { SearchPipe } from './search.pipe';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { CelebrityComponent } from './celebrity/celebrity.component';


@NgModule({
  declarations: [
    UserComponent,
    NavbarComponent,
    FooterComponent,
    UserDashboardComponent,
    OrderComponent,
    CartComponent,
    ProductsComponent,
    ProductPageComponent,
    FormComponent,
    Carousel1Component,
    Card1Component,
    Card2Component,
    EmptyCartComponent,
    CategoryComponent,
    SearchPipe,
    TestimonialComponent,
    CelebrityComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot()
  ]
})
export class UserModule { }
