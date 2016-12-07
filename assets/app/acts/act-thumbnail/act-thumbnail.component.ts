import { Component, OnInit, Input } from '@angular/core';

import { Act } from '../../acts/act.model'

@Component({
    selector: 'act-thumbnail',
    templateUrl: './act-thumbnail.component.html',
    styleUrls: ['./act-thumbnail.component.css']
})
export class ActThumbnailComponent {
    @Input() act: Act;

    joinAct() {
        alert('joining');
    }
}