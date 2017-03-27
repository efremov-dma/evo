import {Injectable} from '@angular/core';
import {RequestService} from '../../common/services/request.service';
import {Employee} from '../models/employee';

@Injectable()
export class DepartmentService {

    private baseUrl = '/employees';

    constructor(
        private requestSrv: RequestService
    ) {}

    list(): Promise<Employee[]> {
        const url = `${this.baseUrl}/`;

        return new Promise((resolve, reject) => {
            this.requestSrv
                .get(url)
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

}