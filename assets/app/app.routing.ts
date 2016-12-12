import {SignupComponent} from './auth/signup.component';
import {SigninComponent} from './auth/signin.component';
import {MyEventsComponent} from './my/my-events/my-events.component';
import {Routes, RouterModule} from '@angular/router';

import {ActInputComponent} from './acts/act-input.component';
import {ActEditComponent} from './acts/act-edit.component';
import {AuthenticationComponent} from './auth/authentication.component';
import {AUTH_ROUTES} from './auth/auth.routes';
import {MainComponent} from './acts/main.component';

// array of angular routes
const APP_ROUTES: Routes = [
    // redirect requires pathMatch 'full' because every path begins with an invisible ''
    { path: '', component: MainComponent, pathMatch: 'full' },
    { path: 'new', component: ActInputComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'myevents', component: MyEventsComponent },
    { path: 'myevents/:id/edit', component: ActEditComponent },
    // auth route has children routes eg. auth/login or auth/signup
    { path: 'auth', component: AuthenticationComponent }
    
];

export const routing = RouterModule.forRoot(APP_ROUTES);