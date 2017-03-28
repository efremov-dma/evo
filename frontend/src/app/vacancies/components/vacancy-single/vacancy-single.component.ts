import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from 'rxjs';
import {MessageService} from '../../../common/services/message.service';
import {Position} from '../../../positions/models/position';
import {PositionService} from '../../../positions/services/position.service';
import {ResponseError} from '../../../common/models/errors';
import {Vacancy} from '../../models/vacancy';
import {VacancyService} from '../../services/vacancy.service';

@Component({
    selector: 'vacancy-single',
    templateUrl: 'vacancy-single.component.html',
    styleUrls: [
        'vacancy-single.component.scss'
    ],
})

export class VacancySingleComponent implements OnInit, OnDestroy {

    params: {
        vacancyId: string,
    };

    vacancy: Vacancy;
    sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vacancySrv: VacancyService,
        private msgSrv: MessageService
    ) {}

    ngOnInit() {
        this.initParams();
        this.initVacancy();
    }

    private initParams() {
        this.sub = this.route.params.subscribe(params => {
            this.params = {
                vacancyId: params['vacancyId']
            }
        });
    }

    private initVacancy() {
        this.vacancySrv
            .get(this.params.vacancyId)
            .then(vacancy => this.vacancy = vacancy)
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

    deleteVacancy() {
        this.vacancySrv
            .delete(this.vacancy.id)
            .then(() => {
                this.msgSrv.success(`Vacancy successfully deleted.`);
                this.router.navigate(['/departments', this.vacancy.department.id, 'vacancies']);
            })
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
