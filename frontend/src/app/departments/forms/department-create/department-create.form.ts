import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router'
import {MessageService} from '../../../common/services/message.service';
import {DepartmentService} from '../../services/department.service';
import {ResponseError} from '../../../common/models/errors';

@Component({
    selector: 'department-create-form',
    templateUrl: 'department-create.form.html',
    styleUrls: [
        'department-create.form.scss'
    ],
    providers: [
        FormBuilder
    ]
})

export class DepartmentCreateForm implements OnInit {

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
          name: [''],
          description: [''],
        });
    }

    onSubmit() {
        let values = this.form.value;
        this.departmentSrv
            .post(values)
            .then(department => {
                this.msgSrv.success(`Department ${department.name} successfully created.`);
                this.router.navigate(['/departments']);
            })
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

}