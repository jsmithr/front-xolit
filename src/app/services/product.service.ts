import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Service } from './service';
import { Invoice } from '../interface/invoice';
import { Product } from '../interface/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends Service {

    constructor(http: HttpClient) {
        super(http);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the stats by Editor and Title
     */
    get(): Observable<any> {
        return this.getApi('product');
    }
}
