import { Routes, RouterModule } from "@angular/router";

import { ActsComponent } from "./acts/acts.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
import { MainComponent } from "./main/main.component"

// array of angular routes
const APP_ROUTES: Routes = [
    // redirect requires pathMatch 'full' because every path begins with an invisible ''
    { path: '', component: MainComponent, pathMatch: 'full' },
    { path: 'acts', component: ActsComponent },
    // auth route has children routes eg. auth/login or auth/signup
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);