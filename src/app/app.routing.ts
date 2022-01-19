import {  Routes } from '@angular/router';
import { InvoicesComponent } from './components/molecules/invoices/invoices.component';
import { ProductsComponent } from './components/molecules/products/products.component';
import { ShoppingCartComponent } from './components/molecules/shopping-cart/shopping-cart.component';

export const appRoutes: Routes = [
    {
        path: 'product',
        component: ProductsComponent,
    },
    {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
    },
    {
        path: 'invoice',
        component: InvoicesComponent,
    },
];