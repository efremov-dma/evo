import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Department} from '../../models/department';
import {MessageService} from '../../../common/services/message.service';
import {DepartmentService} from '../../services/department.sevice';
import {ResponseError} from '../../../common/models/errors';


@Component({
    selector: 'department-list',
    templateUrl: 'department-list.component.html',
    styleUrls: [
        'department-list.component.scss'
    ]
})

export class DepartmentListComponent implements OnInit {

    departments: Department[];

    constructor(
        private departmentSrv: DepartmentService,
        private msgSrv: MessageService,
    ) {}

    ngOnInit(): void {
        this.getDepartments();
    }

    getDepartments(): void {
        this.departmentSrv
            .list()
            .then(departments => this.departments = departments)
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

}
