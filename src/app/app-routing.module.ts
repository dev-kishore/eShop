import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { LoginComponent } from './login/login.component';
import { NopageComponent } from './nopage/nopage.component';
import { RouteGuard } from './route.guard';
import { UserSignupComponent } from './user-signup/user-signup.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'user-signup', component: UserSignupComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'admin-signup', component: AdminSignupComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate:[RouteGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate:[RouteGuard] },
  {path: '**', component:NopageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
