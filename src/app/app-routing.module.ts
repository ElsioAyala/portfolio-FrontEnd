import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { LoginPageComponent } from '@modules/auth/components/login-page/login-page.component';
import { HomeComponent } from '@modules/home/home.component';
import { ChecLoginGuard } from '@core/guards/chec-login.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [ChecLoginGuard],
  },
  {
    path: '**',
    redirectTo: '/'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
