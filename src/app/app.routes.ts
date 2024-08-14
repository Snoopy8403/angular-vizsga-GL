import { Routes } from '@angular/router';
import { CasesComponent } from './covid/cases/cases.component';
import { VaccinesComponent } from './covid/vaccines/vaccines.component';

export const routes: Routes = [
    {
        path: 'cases',
        component: CasesComponent
    }
    ,
    {
        path: 'vaccines',
        component: VaccinesComponent
    }
];
