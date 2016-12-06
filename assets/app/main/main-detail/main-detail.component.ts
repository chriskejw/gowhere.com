import { Component } from '@angular/core';

import { Act } from "../../acts/act.model";
import { ActService } from "../../acts/act.service";

// why actService in appcomponent! REFACTOR
@Component({
    selector: 'main-detail',
    templateUrl: './main-detail.component.html',
    styleUrls: ['./main-detail.component.css']
})
export class MainDetailComponent {

    constructor(private actService: ActService ) { }

    joinevent() {
        alert('test')
    }

}