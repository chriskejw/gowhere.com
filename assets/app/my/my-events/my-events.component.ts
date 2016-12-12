import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../auth/auth.service";
import { ActService } from "../../acts/act.service";
import { Act } from '../../acts/act.model';

@Component({
    selector: 'my-events',
    templateUrl: './my-events.component.html',
    styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
    acts: Act[];
    
    constructor(
        private authService: AuthService,
        private actService: ActService,
        private router: Router) {}

    isAHost() {
        return this.authService.isHost();
    }

    ngOnInit() {
        // authService function isLoggedIn, checks for token in localstorage and returns boolean
        // if false, means not login, show route to homepage
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/');
        }

        this.actService.getUserActs()// actService getActs function returns an array of all acts and stores in the local database
                .subscribe(
                    (acts: Act[]) => {
                        this.acts = acts;
                    }
                );

    }
}