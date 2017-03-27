import {Routes} from '@angular/router';
import {HomeComponent} from './home/components/home-page/home.component';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: '**', redirectTo: ''},
];
