import {Routes} from '@angular/router';
import {DepartmentListComponent} from './departments/components/department-list/department-list.component';
import {DepartmentSingleComponent} from './departments/components/department-single/department-single.component';
import {EmployeeSingleComponent} from './employees/components/employee-single/employee-single.component';
import {DepartmentCreateComponent} from './departments/components/department-create/department-create.component';
import {DepartmentEditComponent} from './departments/components/department-edit/department-edit.component';

export const ROUTES: Routes = [
    {path: '', component: DepartmentListComponent},

    // Departments
    {path: 'departments', children: [
        {path: '', component: DepartmentListComponent},
        {path: 'new', component: DepartmentCreateComponent},
        {path: ':departmentId', children: [
            {path: '', component: DepartmentSingleComponent},
            {path: 'edit', component: DepartmentEditComponent},
        ]}
    ]},

    // Employees
    {path: 'employees', children: [
        {path: ':employeeId', children: [
            {path: '', component: EmployeeSingleComponent}
        ]}
    ]},
    {path: '**', redirectTo: ''}
];
