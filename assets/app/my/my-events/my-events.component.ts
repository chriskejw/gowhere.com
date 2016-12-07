import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../auth/auth.service";
import { Act } from '../../acts/act.model';

@Component({
    selector: 'my-events',
    templateUrl: './my-events.component.html',
    styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

    @Input() act: Act;

    editboolean: boolean = false;
    
    constructor(private authService: AuthService, private router: Router) {}

    isAHost() {
        return this.authService.isHost();
    }

    editClick (boolean: boolean) {
        this.editboolean = boolean;
    }

    ngOnInit() {
        // authService function isLoggedIn, checks for token in localstorage and returns boolean
        // if false, means not login, show route to homepage
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/');
        }
    }
}