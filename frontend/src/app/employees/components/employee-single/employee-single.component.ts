import {Component, OnInit, OnDestroy} from '@angular/core';
import {Employee} from '../../models/employee';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';
import {MessageService} from '../../../common/services/message.service';
import {ResponseError} from '../../../common/models/errors';


@Component({
    templateUrl: 'employee-single.component.html',
    styleUrls: [
        'employee-single.component.scss'
    ],
})

export class EmployeeSingleComponent implements OnInit, OnDestroy {

    params: {
        employeeId: string
    };

    employee: Employee;
    sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private employeeSrv: EmployeeService,
        private msgSrv: MessageService
    ) {}

    ngOnInit() {
        this.initParams();
        this.initEmployee();
    }

    private initParams() {
        this.sub = this.route.params.subscribe(params => {
            this.params = {
                employeeId: params['employeeId']
            };
        });
    }

    private initEmployee() {
        this.employeeSrv
            .get(this.params.employeeId)
            .then((employee: Employee) => this.employee = employee)
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail));
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
