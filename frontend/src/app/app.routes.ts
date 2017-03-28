import {Routes} from '@angular/router';
import {DepartmentListComponent} from './departments/components/department-list/department-list.component';
import {DepartmentSingleComponent} from './departments/components/department-single/department-single.component';
import {EmployeeSingleComponent} from './employees/components/employee-single/employee-single.component';
import {DepartmentCreateComponent} from './departments/components/department-create/department-create.component';
import {DepartmentEditComponent} from './departments/components/department-edit/department-edit.component';
import {EmployeeListComponent} from './employees/components/employee-list/employee-list.component';
import {VacancyListComponent} from './vacancies/components/vacancy-list/vacancy-list.component';
import {VacancyCreateComponent} from './vacancies/components/vacancy-create/vacancy-create.component';
import {VacancyEditComponent} from './vacancies/components/vacancy-edit/vacancy-edit.component';
import {VacancySingleComponent} from './vacancies/components/vacancy-single/vacancy-single.component';
import {VacancyCloseComponent} from './vacancies/components/vacancy-close/vacancy-close.component';
import {EmployeeEditComponent} from './employees/components/employee-edit/employee-edit.component';
import {PositionListComponent} from './positions/components/position-list/position-list.component';

export const ROUTES: Routes = [
    {path: '', component: DepartmentListComponent},

    // Departments
    {path: 'departments', children: [
        {path: '', component: DepartmentListComponent},
        {path: 'new', component: DepartmentCreateComponent},
        {path: ':departmentId', children: [
            {path: '', component: DepartmentSingleComponent},
            {path: 'edit', component: DepartmentEditComponent},
            {path: 'employees', component: EmployeeListComponent},
            {path: 'vacancies', children: [
                {path: '', component: VacancyListComponent},
                {path: 'new', component: VacancyCreateComponent},
                {path: ':vacancyId', children: [
                    {path: 'edit', component: VacancyEditComponent},
                ]},
            ]},
        ]}
    ]},

    // Employees
    {path: 'employees', children: [
        {path: ':employeeId', children: [
            {path: '', component: EmployeeSingleComponent},
            {path: 'edit', component: EmployeeEditComponent}
        ]}
    ]},

    // Vacancies
    {path: 'vacancies', children: [
        {path: ':vacancyId', children: [
            {path: '', component: VacancySingleComponent},
            {path: 'edit', component: VacancyEditComponent},
            {path: 'close', component: VacancyCloseComponent},
        ]},
    ]},

    // Positions
    {path: 'positions', children: [
        {path: '', component: PositionListComponent},
        {path: ':positionId', children: [
            // {path: 'edit', component: EmployeeEditComponent}
        ]}
    ]},

    {path: '**', redirectTo: ''}
];
