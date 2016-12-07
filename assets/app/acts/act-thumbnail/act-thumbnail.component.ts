import { Component, Input } from '@angular/core';

import { ActService } from "../act.service";
import { AuthService } from "../../auth/auth.service";
import { Act } from '../../acts/act.model'

@Component({
    selector: 'act-thumbnail',
    templateUrl: './act-thumbnail.component.html',
    styleUrls: ['./act-thumbnail.component.css']
})
export class ActThumbnailComponent {
    @Input() act: Act;

    constructor(private actService: ActService, private authService: AuthService) { }
    
    joinAct(act: Act) {
        this.actService.joinAct(act.actId)
                .subscribe(
                    user => {
                        console.log(user)
                    }
                );
    }

    loggedIn() {
        return this.authService.isLoggedIn();
    }

    isAHost() {
        return this.authService.isHost();
    }
}