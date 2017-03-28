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
import {DepartmentEditComponent} from './departments/components/department-edit/department-edit.component';
import {DepartmentEditForm} from './departments/forms/department-edit/department-edit.form';
import {EmployeeListComponent} from './employees/components/employee-list/employee-list.component';
import {VacancyListComponent} from './vacancies/components/vacancy-list/vacancy-list.component';
import {VacancyService} from './vacancies/services/vacancy.service';
import {VacancyCreateComponent} from './vacancies/components/vacancy-create/vacancy-create.component';
import {VacancyCreateForm} from './vacancies/forms/vacancy-create/vacancy-create.form';
import {PositionService} from './positions/services/position.service';
import {DatepickerModule} from 'ng2-bootstrap';
import {VacancyEditComponent} from './vacancies/components/vacancy-edit/vacancy-edit.component';
import {VacancyEditForm} from './vacancies/forms/vacancy-edit/vacancy-edit.form';
import {VacancySingleComponent} from './vacancies/components/vacancy-single/vacancy-single.component';
import {VacancyCloseComponent} from './vacancies/components/vacancy-close/vacancy-close.component';
import {EmployeeCreateForm} from './employees/forms/employee-create/employee-create.form';
import {EmployeeEditComponent} from './employees/components/employee-edit/employee-edit.component';
import {EmployeeEditForm} from './employees/forms/employee-edit/employee-edit.form';
import {PositionListComponent} from './positions/components/position-list/position-list.component';
import {PositionCreateComponent} from './positions/components/position-create/position-create.component';
import {PositionCreateForm} from './positions/forms/position-create/position-create.form';

@NgModule({
    imports: [
        BrowserModule,
        DatepickerModule.forRoot(),
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
        DepartmentEditComponent,
        DepartmentEditForm,
        DepartmentListComponent,
        DepartmentSingleComponent,
        EmployeeCreateForm,
        EmployeeEditComponent,
        EmployeeEditForm,
        EmployeeListComponent,
        EmployeeSingleComponent,
        EmploymentHistoryComponent,
        PositionCreateComponent,
        PositionCreateForm,
        PositionListComponent,
        VacancyListComponent,
        VacancyCreateComponent,
        VacancyCreateForm,
        VacancyEditComponent,
        VacancyEditForm,
        VacancyCloseComponent,
        VacancySingleComponent,
    ],
    providers: [
        DepartmentService,
        EmployeeService,
        EmploymentService,
        MessageService,
        PositionService,
        RequestService,
        ResponseService,
        VacancyService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
