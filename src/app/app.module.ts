import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductComponent } from './components/product/product.component';
import { CategoriesComponent } from './components/categories/categories.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductPreviewComponent } from './components/product-preview/product-preview.component'
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { CategoriesAdminComponent } from './components/admin/categories-admin/categories-admin.component';
import { ProductsAdminComponent } from './components/admin/products-admin/products-admin.component';
import { OrdersAdminComponent } from './components/admin/orders-admin/orders-admin.component';
import { TableComponent } from './components/admin/table/table.component';
import { AddModalComponent } from './components/admin/add-modal/add-modal.component';
import { EditModalComponent } from './components/admin/edit-modal/edit-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    ProductComponent,
    CategoriesComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    CartComponent,
    ProductPreviewComponent,
    ProductPageComponent,
    PaginationComponent,
    AdminPageComponent,
    CategoriesAdminComponent,
    ProductsAdminComponent,
    OrdersAdminComponent,
    TableComponent,
    AddModalComponent,
    EditModalComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
