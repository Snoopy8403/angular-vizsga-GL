import { Routes } from '@angular/router';
import { CasesComponent } from './covid/cases/cases.component';
import { VaccinesComponent } from './covid/vaccines/vaccines.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'covid',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'covid',
        canActivate: [authGuard], 
        loadChildren: () => import('./covid/covid.routes').then(m => m.routes)
    }
];
