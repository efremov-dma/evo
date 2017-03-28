import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router'
import {MessageService} from '../../../common/services/message.service';
import {VacancyService} from '../../services/vacancy.service';
import {Position} from '../../../positions/models/position';
import {ResponseError} from '../../../common/models/errors';
import {Vacancy} from '../../models/vacancy';


@Component({
    selector: 'vacancy-edit-form',
    templateUrl: 'vacancy-edit.form.html',
    styleUrls: [
        'vacancy-edit.form.scss'
    ],
    providers: [
        FormBuilder
    ]
})

export class VacancyEditForm implements OnInit {

    @Input()
    vacancy: Vacancy;

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
          position_id: [this.vacancy.position.id],
          opening_date: [new Date(this.vacancy.openingDate)],
        });
    }

    onSubmit() {
        let values = this.form.value;

        values.opening_date = values.opening_date.toISOString();

        this.vacancySrv
            .put(this.vacancy.id, values)
            .then(() => {
                this.msgSrv.success(`Vacancy successfully edited.`);
                this.router.navigate(['/vacancies', this.vacancy.id]);
            })
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

}