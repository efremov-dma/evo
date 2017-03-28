import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from 'rxjs';
import {MessageService} from '../../../common/services/message.service';
import {Position} from '../../../positions/models/position';
import {PositionService} from '../../../positions/services/position.service';
import {ResponseError} from '../../../common/models/errors';
import {Vacancy} from '../../models/vacancy';
import {VacancyService} from '../../services/vacancy.service';

@Component({
    selector: 'vacancy-edit',
    templateUrl: 'vacancy-edit.component.html',
    styleUrls: [
        'vacancy-edit.component.scss'
    ],
})

export class VacancyEditComponent implements OnInit, OnDestroy {

    params: {
        vacancyId: string,
    };

    vacancy: Vacancy;
    positions: Position[];
    sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private vacancySrv: VacancyService,
        private positionSrv: PositionService,
        private msgSrv: MessageService
    ) {}

    ngOnInit() {
        this.initParams();
        this.initVacancy();
        this.initPositions();
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

    private initPositions() {
        this.positionSrv
            .list()
            .then(positions => this.positions = positions)
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
