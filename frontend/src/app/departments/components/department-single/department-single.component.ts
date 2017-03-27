import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";
import {MessageService} from '../../../common/services/message.service';
import {DepartmentService} from '../../services/department.service';
import {Department} from '../../models/department';
import {ResponseError} from '../../../common/models/errors';
import {Employee} from '../../../employees/models/employee';
import {EmployeeService} from '../../../employees/services/employee.service';


@Component({
    templateUrl: 'department-single.component.html',
    styleUrls: [
        'department-single.component.scss'
    ],
})

export class DepartmentSingleComponent implements OnInit, OnDestroy {

    params: {
        departmentId: string
    };

    department: Department;
    head: Employee;
    sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private departmentSrv: DepartmentService,
        private employeeSrv: EmployeeService,
        private msgSrv: MessageService
    ) {}

    ngOnInit() {
        this.initParams();
        this.initDepartment().then(() => this.initDepartmentHead());
    }

    private initParams() {
        this.sub = this.route.params.subscribe(params => {
            this.params = {
                departmentId: params['departmentId']
            };
        });
    }

    private initDepartment() {
        return new Promise((resolve, reject) => {
            this.departmentSrv
                .get(this.params.departmentId)
                .then((department: Department) => {
                    this.department = department;
                    resolve();
                })
                .catch((errors: ResponseError[]) => {
                    errors.forEach(error => this.msgSrv.error(error.detail));
                    reject();
                });
        });
    }

    private initDepartmentHead() {
        if (this.department.headId) {
            this.employeeSrv
                .get(this.department.headId)
                .then((employee: Employee) => this.head = employee)
                .catch((errors: ResponseError[]) => {
                    errors.forEach(error => this.msgSrv.error(error.detail));
                });
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
