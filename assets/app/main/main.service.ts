import { Injectable } from '@angular/core';

import { Main } from '../main';

@Injectable()
export class ActService {
private acts: Main[] = [

    new Main('Takshimaya Sale', 
    'http://sethlui.com/wp-content/uploads/2016/01/zion-road-char-kway-teow.jpg',
    'very good sale'),

    new Main('Takshimaya Sale',
    'http://sethlui.com/wp-content/uploads/2016/01/zion-road-char-kway-teow.jpg',
    'very bad sale'),

];

constructor() { }

getActs() {
    return this.acts;
}

getAct(id:number) {
    return this.acts[id];
}

}