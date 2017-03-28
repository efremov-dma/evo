import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router'
import {MessageService} from '../../../common/services/message.service';
import {Position} from '../../../positions/models/position';
import {ResponseError} from '../../../common/models/errors';
import {EmployeeService} from '../../services/employee.service';
import {Department} from '../../../departments/models/department';
import {Employee} from '../../models/employee';
import {Employment} from '../../../employments/models/employment';


@Component({
    selector: 'employee-edit-form',
    templateUrl: 'employee-edit.form.html',
    styleUrls: [
        'employee-edit.form.scss'
    ],
    providers: [
        FormBuilder
    ]
})

export class EmployeeEditForm implements OnInit {

    @Input()
    employee: Employee;

    @Input()
    currentEmployment: Employment;

    @Input()
    departments: Department[];

    @Input()
    positions: Position[];

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private employeeSrv: EmployeeService,
        private router: Router,
        private msgSrv: MessageService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            first_name: [this.employee.firstName],
            last_name: [this.employee.lastName],
            email: [this.employee.email],
            phone: [this.employee.phone],
            birth_date: [new Date(this.employee.birthDate)],
            position_id: [this.currentEmployment ? this.currentEmployment.position.id : this.positions[0].id],
            department_id: [this.currentEmployment ? this.currentEmployment.department.id : this.departments[0].id],
        });
    }

    onSubmit() {
        let values = this.form.value;

        values.birth_date = values.birth_date.toISOString();

        this.employeeSrv
            .put(this.employee.id, values)
            .then(() => {
                this.msgSrv.success(`Employee successfully updated.`);
                this.router.navigate(['/employees', this.employee.id]);
            })
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

}