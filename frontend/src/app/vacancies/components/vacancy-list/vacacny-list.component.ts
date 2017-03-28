import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Vacancy} from '../../models/vacancy';
import {Subscription} from 'rxjs';
import {VacancyService} from '../../services/vacancy.service';
import {MessageService} from '../../../common/services/message.service';
import {ResponseError} from '../../../common/models/errors';


@Component({
    templateUrl: 'vacancy-list.component.html',
    styleUrls: [
        'vacancy-list.component.scss'
    ]
})

export class VacancyListComponent implements OnInit {

    params: {
        departmentId: string
    };

    vacancies: Vacancy[];
    sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private vacancySrv: VacancyService,
        private msgSrv: MessageService,
    ) {}

    ngOnInit(): void {
        this.initParams();
        this.getVacancies();
    }

    private initParams() {
        this.sub = this.route.params.subscribe(params => {
            this.params = {
                departmentId: params['departmentId']
            };
        });
    }

    private getVacancies(): void {
        this.vacancySrv
            .list(this.params.departmentId)
            .then(vacancies => this.vacancies = vacancies)
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }
}
