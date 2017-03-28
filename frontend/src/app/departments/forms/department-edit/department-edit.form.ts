import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Department} from '../../models/department';
import {DepartmentService} from '../../services/department.service';
import {Router} from '@angular/router';
import {MessageService} from '../../../common/services/message.service';
import {ResponseError} from '../../../common/models/errors';
import {Employee} from '../../../employees/models/employee';


@Component({
    selector: 'department-edit-form',
    templateUrl: 'department-edit.form.html',
    styleUrls: [
        'department-edit.form.scss'
    ],
    providers: [
        FormBuilder
    ]
})

export class DepartmentEditForm implements OnInit {

    @Input()
    department: Department;

    @Input()
    employees: Employee[];

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private departmentSrv: DepartmentService,
        private router: Router,
        private msgSrv: MessageService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
          name: [this.department.name],
          description: [this.department.description],
          head_id: [this.department.headId],
        });
    }

    onSubmit() {
        let values = this.form.value;
        this.departmentSrv
            .put(this.department.id, values)
            .then(department => {
                this.msgSrv.success(`Department ${this.department.name} successfully updated.`);
                this.router.navigate(['/departments'])
            })
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

}