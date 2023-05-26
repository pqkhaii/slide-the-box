import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    
    @property({type:CCInteger})
    public timer: number = 10;

    // public get Timer(): number {
    //     return this.timer;
    // }
    
    // public set Timer(timer : number) {
    //     this.timer = this.timer;
    // }
}

