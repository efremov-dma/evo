import {Injectable} from '@angular/core';
import {RequestService} from '../../common/services/request.service';
import {URLSearchParams} from '@angular/http';
import {Vacancy} from '../models/vacancy';

@Injectable()
export class VacancyService {

    private baseUrl = '/vacancies';

    constructor(
        private requestSrv: RequestService
    ) {}

    list(departmentId?: string): Promise<Vacancy[]> {
        const url = `${this.baseUrl}/`;

        let params = new URLSearchParams();

        if (departmentId) {
            params.append('department_id', departmentId);
        }

        return new Promise((resolve, reject) => {
            this.requestSrv
                .get(url, params)
                .then(response => resolve(response.map((data: any) => Vacancy.newFromResponse(data))))
                .catch(errors => reject(errors));
        });
    }

    get(id: string): Promise<Vacancy> {
        const url = `${this.baseUrl}/${id}`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .get(url)
                .then(response => resolve(Vacancy.newFromResponse(response)))
                .catch(errors => reject(errors));
        });
    }

    post(data: any): Promise<Vacancy> {
        const url = `${this.baseUrl}/`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .post(url, data)
                .then(response => resolve(Vacancy.newFromResponse(response)))
                .catch(errors => reject(errors));
        });
    }

}