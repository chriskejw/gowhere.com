import { Component, OnInit, Input } from '@angular/core';

import { Act } from '../../acts/act.model'
import { ActService } from '../../acts/act.service'

@Component({
    selector: 'act-thumbnail',
    templateUrl: './act-thumbnail.component.html',
    styleUrls: ['./act-thumbnail.component.css']
})
export class ActThumbnailComponent implements OnInit {
    acts: Act [] = []
    
    constructor(private actService: ActService) { }
    
    ngOnInit() {
        this.acts = this.actService.getActs();
    }
}