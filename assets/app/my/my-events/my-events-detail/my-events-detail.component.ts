import { Component, Input } from '@angular/core';

import { AuthService } from "../../../auth/auth.service";
import { Act } from '../../../acts/act.model';

@Component({
    selector: 'my-events-detail',
    templateUrl: './my-events-detail.component.html',
    styleUrls: ['./my-events-detail.component.css']
})

export class MyEventsDetailComponent {

    @Input() act: Act;
    editboolean: boolean = false;
    
    constructor(private authService: AuthService) {}

    isAHost() {
        return this.authService.isHost();
    }

    editClick (boolean: boolean) {
        this.editboolean = boolean;
    }
}