import {Injectable} from '@angular/core';
import {RequestService} from '../../common/services/request.service';
import {Department} from '../models/department';

@Injectable()
export class DepartmentService {

    private baseUrl = '/departments';

    constructor(
        private requestSrv: RequestService
    ) {}

    list(): Promise<Department[]> {
        const url = `${this.baseUrl}/`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .get(url)
                .then(response => resolve(response.map((data: any) => Department.newFromResponse(data))))
                .catch(errors => reject(errors));
        });
    }

    get(id: string): Promise<Department> {
        const url = `${this.baseUrl}/${id}`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .get(url)
                .then(response => resolve(Department.newFromResponse(response)))
                .catch(errors => reject(errors));
        });
    }

    post(data: any): Promise<Department> {
        const url = `${this.baseUrl}/`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .post(url, data)
                .then(response => resolve(Department.newFromResponse(response)))
                .catch(errors => reject(errors));
        });
    }

    put(id: string, data: any): Promise<Department> {
        const url = `${this.baseUrl}/${id}`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .put(url, data)
                .then(response => resolve(Department.newFromResponse(response)))
                .catch(errors => reject(errors));
        });
    }

    delete(id: string): Promise<Department> {
        const url = `${this.baseUrl}/${id}`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .delete(url)
                .then(response => resolve(response))
                .catch(errors => reject(errors));
        });
    }
}