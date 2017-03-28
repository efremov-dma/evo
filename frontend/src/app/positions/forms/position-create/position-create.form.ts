import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router'
import {MessageService} from '../../../common/services/message.service';
import {PositionService} from '../../services/position.service';
import {ResponseError} from '../../../common/models/errors';

@Component({
    selector: 'position-create-form',
    templateUrl: 'position-create.form.html',
    styleUrls: [
        'position-create.form.scss'
    ],
    providers: [
        FormBuilder
    ]
})

export class PositionCreateForm implements OnInit {

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private positionSrv: PositionService,
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
        this.positionSrv
            .post(values)
            .then(position => {
                this.msgSrv.success(`Position ${position.name} successfully created.`);
                this.router.navigate(['/positions']);
            })
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

}