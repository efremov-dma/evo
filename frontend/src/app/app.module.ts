import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {ToastyModule} from 'ng2-toasty';
import {AppComponent} from './app.component';
import {DepartmentListComponent} from './departments/components/department-list/department-list.component';
import {DepartmentService} from './departments/services/department.service';
import {MessageService} from './common/services/message.service';
import {ResponseService} from './common/services/response.service';
import {RequestService} from './common/services/request.service';
import {HttpModule} from '@angular/http';
import {ROUTES} from './app.routes';
import {RouterModule} from '@angular/router';
import {DepartmentSingleComponent} from './departments/components/department-single/department-single.component';
import {EmployeeService} from './employees/services/employee.service';
import {EmployeeSingleComponent} from './employees/components/employee-single/employee-single.component';
import {EmploymentService} from './employments/services/employment.service';
import {EmploymentHistoryComponent} from './employments/employment-history/employment-history.component';
import {DepartmentCreateComponent} from './departments/components/department-create/department-create.component';
import {DepartmentCreateForm} from './departments/forms/department-create/department-create.form';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(ROUTES, {useHash: false}),
        ToastyModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        DepartmentCreateComponent,
        DepartmentCreateForm,
        DepartmentListComponent,
        DepartmentSingleComponent,
        EmployeeSingleComponent,
        EmploymentHistoryComponent,
    ],
    providers: [
        DepartmentService,
        EmployeeService,
        EmploymentService,
        MessageService,
        RequestService,
        ResponseService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
