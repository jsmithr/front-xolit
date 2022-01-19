import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/modules/material.module';
import { ProductsComponent } from './components/molecules/products/products.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './core/config/interceptor';
import { ProductService } from './services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './components/molecules/shopping-cart/shopping-cart.component';
import { TableComponent } from './components/atoms/table/table.component';
import { DialogDetailInvoice, InvoicesComponent } from './components/molecules/invoices/invoices.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ShoppingCartComponent,
    TableComponent,
    InvoicesComponent,
    DialogDetailInvoice
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    ProductService,
    {
        provide : HTTP_INTERCEPTORS,
        useClass: Interceptor,
        multi   : true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
