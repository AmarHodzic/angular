import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddModalComponent } from './components/admin/add-modal/add-modal.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { CategoriesAdminComponent } from './components/admin/categories-admin/categories-admin.component';
import { OrdersAdminComponent } from './components/admin/orders-admin/orders-admin.component';
import { ProductsAdminComponent } from './components/admin/products-admin/products-admin.component';
import { TableComponent } from './components/admin/table/table.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductPreviewComponent } from './components/product-preview/product-preview.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'admin/addModal',
    component:AddModalComponent
  },
  {
    path:'admin/orders',
    component:OrdersAdminComponent
  },
  {
    path:'admin/products',
    component:ProductsAdminComponent
  },
  {
    path:'admin/categories',
    component:CategoriesAdminComponent
  },
  {
    path:'admin/table',
    component:TableComponent
  },
  {
    path:'admin/adminPage',
    component:AdminPageComponent
  },
  {
    path:'products/:id',
    component:ProductPreviewComponent
  },
  {
    path:'allproducts',
    component:ProductPageComponent
  },
  {
    path:'categories/:id/products',
    component:ProductPageComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'categories',
    component:CategoriesComponent
  },
  {
    path:'orders',
    component:OrdersComponent
  },
  {
    path:'cart',
    component:CartComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'',
    component:LandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
