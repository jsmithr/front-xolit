import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Service } from './service';
import { Invoice } from '../interface/invoice';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService extends Service {

    constructor(http: HttpClient) {
        super(http);
    }

    add(invoice: Invoice): Observable<any> {
        return this.postApi('invoice', invoice);
    }

    get(): Observable<any> {
        return this.getApi('invoice');
    }

    find(invoiceNumber: number): Observable<any> {
        return this.getApi('invoice/' + invoiceNumber);
    }
}
