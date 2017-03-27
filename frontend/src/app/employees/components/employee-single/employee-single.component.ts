import {Component, OnInit, OnDestroy} from '@angular/core';
import {Employee} from '../../models/employee';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';
import {MessageService} from '../../../common/services/message.service';
import {ResponseError} from '../../../common/models/errors';
import {Employment} from '../../../employments/models/employment';
import {EmploymentService} from '../../../employments/services/employment.service';


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
    currentEmployment: Employment;
    sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private employeeSrv: EmployeeService,
        private employmentSrv: EmploymentService,
        private msgSrv: MessageService
    ) {}

    ngOnInit() {
        this.initParams();
        this.initEmployee()
            .then(() => this.initCurrentEmployment())
            .catch(() => this.router.navigate(['/']));
    }

    private initParams() {
        this.sub = this.route.params.subscribe(params => {
            this.params = {
                employeeId: params['employeeId']
            };
        });
    }

    private initEmployee() {
        return new Promise((resolve, reject) => {
            this.employeeSrv
                .get(this.params.employeeId)
                .then((employee: Employee) => {
                    this.employee = employee;
                    resolve();
                })
                .catch((errors: ResponseError[]) => {
                    errors.forEach(error => this.msgSrv.error(error.detail));
                    reject();
                });
        });
    }

    private initCurrentEmployment() {
        if (this.employee.currentEmploymentID) {
            this.employmentSrv
                .get(this.employee.currentEmploymentID)
                .then((employment: Employment) => this.currentEmployment = employment)
                .catch((errors: ResponseError[]) => {
                    errors.forEach(error => this.msgSrv.error(error.detail));
                });
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
