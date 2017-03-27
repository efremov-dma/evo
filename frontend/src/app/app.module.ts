import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {ToastyModule} from 'ng2-toasty';
import {AppComponent} from './app.component';
import {DepartmentListComponent} from './departments/components/department-list/department-list.component';
import {DepartmentService} from './departments/services/department.sevice';
import {MessageService} from './common/services/message.service';
import {ResponseService} from './common/services/response.service';
import {RequestService} from './common/services/request.service';
import {HttpModule} from '@angular/http';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ToastyModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        DepartmentListComponent,
    ],
    providers: [
        DepartmentService,
        MessageService,
        RequestService,
        ResponseService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
