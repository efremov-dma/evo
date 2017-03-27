import {Injectable} from '@angular/core';
import {RequestService} from '../../common/services/request.service';
import {Employment} from '../models/employment';

@Injectable()
export class EmploymentService {

    private baseUrl = '/employments';

    constructor(
        private requestSrv: RequestService
    ) {}

    list(): Promise<Employment[]> {
        const url = `${this.baseUrl}/`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .get(url)
                .then(response => resolve(response.map((data: any) => Employment.newFromResponse(data))))
                .catch(errors => reject(errors));
        });
    }

    get(id: string): Promise<Employment> {
        const url = `${this.baseUrl}/${id}`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .get(url)
                .then(response => resolve(Employment.newFromResponse(response)))
                .catch(errors => reject(errors));
        });
    }

}