import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DepartmentService} from '../../services/department.service';
import {MessageService} from '../../../common/services/message.service';
import {Department} from '../../models/department';
import {Subscription} from 'rxjs';
import {Employee} from '../../../employees/models/employee';
import {ResponseError} from '../../../common/models/errors';

@Component({
    selector: 'department-edit',
    templateUrl: 'department-edit.component.html',
    styleUrls: [
        'department-edit.component.scss'
    ],
})

export class DepartmentEditComponent implements OnInit, OnDestroy {

    params: {
        departmentId: string
    };

    department: Department;
    head: Employee;
    sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private departmentSrv: DepartmentService,
        private msgSrv: MessageService,
    ) {}

    ngOnInit() {
        this.initParams();
        this.initDepartment();
    }

    private initParams() {
        this.sub = this.route.params.subscribe(params => {
            this.params = {
                departmentId: params['departmentId']
            }
        });
    }

    private initDepartment() {
        this.departmentSrv
            .get(this.params.departmentId)
            .then(department => this.department = department)
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
