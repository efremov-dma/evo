import {Routes} from '@angular/router';
import {DepartmentListComponent} from './departments/components/department-list/department-list.component';
import {DepartmentSingleComponent} from './departments/components/department-single/department-single.component';

export const ROUTES: Routes = [
    {path: '', component: DepartmentListComponent},
    {path: 'departments', children: [
        {path: '', component: DepartmentListComponent},
        // {path: 'new', component: EventCreateComponent},
        {path: ':departmentId', children: [
            {path: '', component: DepartmentSingleComponent}
        ]}
    ]},
    {path: '**', redirectTo: ''}
];
