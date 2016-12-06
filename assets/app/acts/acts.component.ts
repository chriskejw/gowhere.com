import { Component, OnInit } from "@angular/core";

import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

// renders the act-input and act-list components when navigate to route
@Component({
    selector: 'app-acts',
    template: `
        <div class="row">
            <app-act-input></app-act-input>
        </div>
        
        <div class="row">
            <app-act-list></app-act-list>
        </div>
    `
})

export class ActsComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) {}
    
    ngOnInit () {
        // authService function isLoggedIn, checks for token in localstorage and returns boolean
        // if false, means not login, show route to homepage
        if (!this.authService.isHost()) {
            this.router.navigateByUrl('/');
        }
    }

}