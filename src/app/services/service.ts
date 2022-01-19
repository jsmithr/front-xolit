import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError, timeout, timeoutWith } from 'rxjs/operators';
import { environment as env, } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class Service {
    private id_sesion = 0;

    constructor(public http: HttpClient) {

    }

    protected postApi = (url: string, params: any = {}, headers = {}) => {
        return this.http.post(env.apiUrl + url, params, headers).pipe(timeoutWith(720000, 'timeout exceeded'), map(r => r), catchError(this.handleError));
    };

    protected getApi = (url: string, parameters: any = {}, headers = {}) => {
        return this.http.get(env.apiUrl + url, {
            params: { ...parameters },
            ...headers
        }).pipe(map(r => r), catchError(this.handleError));
    };

    protected handleError(error: HttpErrorResponse) {
        return throwError('Error! Algo salió mal.');
    }
}