import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../../auth/auth.service";
import { Act } from '../../../acts/act.model';

@Component({
    selector: 'my-events-detail',
    templateUrl: './my-events-detail.component.html',
    styleUrls: ['./my-events-detail.component.css']
})
export class MyEventsDetailComponent implements OnInit {

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