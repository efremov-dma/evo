import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Employee} from '../../models/employee';
import {MessageService} from '../../../common/services/message.service';
import {EmployeeService} from '../../services/employee.service';
import {ResponseError} from '../../../common/models/errors';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';


@Component({
    templateUrl: 'employee-list.component.html',
    styleUrls: [
        'employee-list.component.scss'
    ]
})

export class EmployeeListComponent implements OnInit {

    params: {
        departmentId: string
    };

    employees: Employee[];
    sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private employeeSrv: EmployeeService,
        private msgSrv: MessageService,
    ) {}

    ngOnInit(): void {
        this.initParams();
        this.getEmployees();
    }

    private initParams() {
        this.sub = this.route.params.subscribe(params => {
            this.params = {
                departmentId: params['departmentId']
            };
        });
    }

    private getEmployees(): void {
        this.employeeSrv
            .list(this.params.departmentId)
            .then(employees => this.employees = employees)
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

    dismissEmployee(employee: Employee) {
        this.employeeSrv
            .dismiss(employee.id)
            .then(() => {
                this.msgSrv.success(`Employee successfully dismissed.`);
                let index = this.employees.indexOf(employee);
                if (index != -1) {
                    this.employees.splice(index, 1);
                }
            })
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }
}
