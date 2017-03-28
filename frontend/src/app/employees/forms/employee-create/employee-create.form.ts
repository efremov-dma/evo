import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router'
import {MessageService} from '../../../common/services/message.service';
import {Position} from '../../../positions/models/position';
import {ResponseError} from '../../../common/models/errors';
import {Vacancy} from '../../../vacancies/models/vacancy';
import {EmployeeService} from '../../services/employee.service';


@Component({
    selector: 'employee-create-form',
    templateUrl: 'employee-create.form.html',
    styleUrls: [
        'employee-create.form.scss'
    ],
    providers: [
        FormBuilder
    ]
})

export class EmployeeCreateForm implements OnInit {

    @Input()
    vacancy: Vacancy;

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
            first_name: [''],
            last_name: [''],
            email: [''],
            phone: [''],
            birth_date: [new Date()],
            position_id: [this.vacancy.position.id],
        });
    }

    onSubmit() {
        let values = this.form.value;

        values.vacancy_id = this.vacancy.id;
        values.birth_date = values.birth_date.toISOString();

        this.employeeSrv
            .post(values)
            .then(() => {
                this.msgSrv.success(`Vacancy successfully closed.`);
                this.router.navigate(['/department', this.vacancy.department.id, 'vacancies']);
            })
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

}