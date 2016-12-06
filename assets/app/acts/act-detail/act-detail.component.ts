import { Component, OnInit, Input } from '@angular/core';

import { Act } from '../../acts/act.model';

import { ActService } from "../../acts/act.service";

// why actService in appcomponent! REFACTOR
@Component({
    selector: 'act-detail',
    templateUrl: './act-detail.component.html',
    styleUrls: ['./act-detail.component.css']
})

export class ActDetailComponent implements OnInit {

    constructor(private actService: ActService ) { }

    joinevent() {
        alert('test')
    }

    // @Input() selectedAct: Act;
    
    // @Input() act: Act;
  

    ngOnInit () {

    }

}