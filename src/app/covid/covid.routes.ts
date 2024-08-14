import { Route } from "@angular/router";
import { CasesComponent } from "./cases/cases.component";
import { VaccinesComponent } from "./vaccines/vaccines.component";

export const routes: Route[] = [
    {
        path: 'cases',
        component: CasesComponent
    },
    {
        path: 'vaccines',
        component: VaccinesComponent
    }
]