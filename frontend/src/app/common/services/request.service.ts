import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {ResponseService} from './response.service';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class RequestService {

    private headers = new Headers({'Content-Type': 'application/json'});

    private api_prefix = '/api';

    constructor(
        private http: Http,
        private responseSrv: ResponseService
    ) {}

    get(url: string, params?: URLSearchParams): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get(this._getFullUrl(url), {search: params})
                .toPromise()
                .then(response => resolve(this.responseSrv.parseData(response)))
                .catch(errors => reject(this.responseSrv.parseErrors(errors)));
        });
    }

    put(url: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(this._getFullUrl(url), data, {headers: this.headers})
                .toPromise()
                .then(response => resolve(this.responseSrv.parseData(response)))
                .catch(errors => reject(this.responseSrv.parseErrors(errors)));
        });
    }

    post(url: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(this._getFullUrl(url), data, {headers: this.headers})
                .toPromise()
                .then(response => resolve(this.responseSrv.parseData(response)))
                .catch(errors => reject(this.responseSrv.parseErrors(errors)));
        });
    }

    delete(url: string, params?: URLSearchParams): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(this._getFullUrl(url), {search: params})
                .toPromise()
                .then(response => resolve(this.responseSrv.parseData(response)))
                .catch(errors => reject(this.responseSrv.parseErrors(errors)));
        });
    }

    protected _getFullUrl(url: string) {
        return this.api_prefix + url;
    }

}