import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router'
import {MessageService} from '../../../common/services/message.service';
import {VacancyService} from '../../services/vacancy.service';
import {Position} from '../../../positions/models/position';
import {ResponseError} from '../../../common/models/errors';
import {Department} from '../../../departments/models/department';


@Component({
    selector: 'vacancy-create-form',
    templateUrl: 'vacancy-create.form.html',
    styleUrls: [
        'vacancy-create.form.scss'
    ],
    providers: [
        FormBuilder
    ]
})

export class VacancyCreateForm implements OnInit {

    @Input()
    department: Department;

    @Input()
    positions: Position[];

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private vacancySrv: VacancyService,
        private router: Router,
        private msgSrv: MessageService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
          position_id: [this.positions[0].id],
          opening_date: [new Date()],
        });
    }

    onSubmit() {
        let values = this.form.value;

        values.department_id = this.department.id;
        values.opening_date = values.opening_date.toISOString();
        values.closing_date = null;

        this.vacancySrv
            .post(values)
            .then(() => {
                this.msgSrv.success(`Vacancy successfully created.`);
                this.router.navigate(['/departments', this.department.id, 'vacancies']);
            })
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

}