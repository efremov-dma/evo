import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Position} from '../../models/position';
import {PositionService} from '../../services/position.service';
import {Router} from '@angular/router';
import {MessageService} from '../../../common/services/message.service';
import {ResponseError} from '../../../common/models/errors';


@Component({
    selector: 'position-edit-form',
    templateUrl: 'position-edit.form.html',
    styleUrls: [
        'position-edit.form.scss'
    ],
    providers: [
        FormBuilder
    ]
})

export class PositionEditForm implements OnInit {

    @Input()
    position: Position;

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
          name: [this.position.name],
          description: [this.position.description],
        });
    }

    onSubmit() {
        let values = this.form.value;
        this.positionSrv
            .put(this.position.id, values)
            .then(position => {
                this.msgSrv.success(`Position ${this.position.name} successfully updated.`);
                this.router.navigate(['/positions', this.position.id])
            })
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }
}