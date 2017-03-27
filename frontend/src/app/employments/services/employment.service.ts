import {Injectable} from '@angular/core';
import {RequestService} from '../../common/services/request.service';
import {Employment} from '../models/employment';
import {URLSearchParams} from '@angular/http';

@Injectable()
export class EmploymentService {

    private baseUrl = '/employments';

    constructor(
        private requestSrv: RequestService
    ) {}

    list(employeeId?: string): Promise<Employment[]> {
        const url = `${this.baseUrl}/`;

        let params = new URLSearchParams();

        if (employeeId) {
            params.append('employee_id', employeeId);
        }

        return new Promise((resolve, reject) => {
            this.requestSrv
                .get(url, params)
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