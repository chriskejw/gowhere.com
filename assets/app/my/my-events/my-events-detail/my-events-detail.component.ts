import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../../auth/auth.service";
import { ActService } from "../../../acts/act.service";
import { Act } from '../../../acts/act.model';

@Component({
    selector: 'my-events-detail',
    templateUrl: './my-events-detail.component.html',
    styleUrls: ['./my-events-detail.component.css']
})

export class MyEventsDetailComponent {

    @Input() act;
    editboolean: boolean = false;
    
    constructor(
        private authService: AuthService,
        private actService: ActService,
        private router: Router) {}

    isAHost() {
        return this.authService.isHost();
    }

    editEvent () {
        // this.actService.editAct(this.act)
        this.router.navigate(['/', 'myevents', `${this.act._id}`, 'edit']);
    }
}