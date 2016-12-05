import {SignupComponent} from './auth/signup.component';
import {SigninComponent} from './auth/signin.component';
import {MyEventsComponent} from './my/my-events/my-events.component';
import {Routes, RouterModule} from '@angular/router';

import {ActsComponent} from './acts/acts.component';
import {AuthenticationComponent} from './auth/authentication.component';
import {AUTH_ROUTES} from './auth/auth.routes';
import {MainComponent} from './main/main.component';

// array of angular routes
const APP_ROUTES: Routes = [
    // redirect requires pathMatch 'full' because every path begins with an invisible ''
    { path: '', component: MainComponent, pathMatch: 'full' },
    { path: 'acts', component: ActsComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'myevents', component: MyEventsComponent },
    // auth route has children routes eg. auth/login or auth/signup
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
    
];

export const routing = RouterModule.forRoot(APP_ROUTES);