import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Department} from '../../models/department';
import {MessageService} from '../../../common/services/message.service';
import {DepartmentService} from '../../services/department.service';
import {ResponseError} from '../../../common/models/errors';


@Component({
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

    private getDepartments(): void {
        this.departmentSrv
            .list()
            .then(departments => this.departments = departments)
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

    deleteDepartment(department: Department) {
        this.departmentSrv
            .delete(department.id)
            .then(() => {
                this.msgSrv.success(`Department ${department.name} successfully deleted.`);
                let index = this.departments.indexOf(department);
                if (index != -1) {
                    this.departments.splice(index, 1);
                }
            })
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }
}
