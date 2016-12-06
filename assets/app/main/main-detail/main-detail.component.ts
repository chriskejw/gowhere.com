import { Component, OnInit, Input } from '@angular/core';

import { Act } from '../../acts/act.model';

// why actService in appcomponent! REFACTOR
@Component({
    selector: 'main-detail',
    templateUrl: './main-detail.component.html',
    styleUrls: ['./main-detail.component.css']
})
export class MainDetailComponent implements OnInit {
    @Input() selectedAct: Act;
    
    @Input() act: Act;
  

    ngOnInit () {

    }
}