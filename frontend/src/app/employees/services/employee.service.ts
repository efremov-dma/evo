import {Injectable} from '@angular/core';
import {RequestService} from '../../common/services/request.service';
import {Employee} from '../models/employee';
import {URLSearchParams} from '@angular/http';

@Injectable()
export class EmployeeService {

    private baseUrl = '/employees';

    constructor(
        private requestSrv: RequestService
    ) {}

    list(departmentId?: string): Promise<Employee[]> {
        const url = `${this.baseUrl}/`;

        let params = new URLSearchParams();

        if (departmentId) {
            params.append('department_id', departmentId);
        }

        return new Promise((resolve, reject) => {
            this.requestSrv
                .get(url, params)
                .then(response => resolve(response.map((data: any) => Employee.newFromResponse(data))))
                .catch(errors => reject(errors));
        });
    }

    get(id: string): Promise<Employee> {
        const url = `${this.baseUrl}/${id}`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .get(url)
                .then(response => resolve(Employee.newFromResponse(response)))
                .catch(errors => reject(errors));
        });
    }

    dismiss(id: string): Promise<Employee> {
        const url = `${this.baseUrl}/${id}/dismiss`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .post(url, {})
                .then(response => resolve(Employee.newFromResponse(response)))
                .catch(errors => reject(errors));
        });
    }

}