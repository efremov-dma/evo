import {Injectable} from '@angular/core';
import {RequestService} from '../../common/services/request.service';
import {Position} from '../models/position';

@Injectable()
export class PositionService {

    private baseUrl = '/positions';

    constructor(
        private requestSrv: RequestService
    ) {}

    list(): Promise<Position[]> {
        const url = `${this.baseUrl}/`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .get(url)
                .then(response => resolve(response.map((data: any) => Position.newFromResponse(data))))
                .catch(errors => reject(errors));
        });
    }

    get(id: string): Promise<Position> {
        const url = `${this.baseUrl}/${id}`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .get(url)
                .then(response => resolve(Position.newFromResponse(response)))
                .catch(errors => reject(errors));
        });
    }
    
    post(data: any): Promise<Position> {
        const url = `${this.baseUrl}/`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .post(url, data)
                .then(response => resolve(Position.newFromResponse(response)))
                .catch(errors => reject(errors));
        });
    }

    put(id: string, data: any): Promise<Position> {
        const url = `${this.baseUrl}/${id}`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .put(url, data)
                .then(response => resolve(Position.newFromResponse(response)))
                .catch(errors => reject(errors));
        });
    }

    delete(id: string): Promise<Position> {
        const url = `${this.baseUrl}/${id}`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .delete(url)
                .then(response => resolve(response))
                .catch(errors => reject(errors));
        });
    }

}