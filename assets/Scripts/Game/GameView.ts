import { _decorator, Component, Label, Node } from 'cc';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {

    @property({type: Label})
    private labelTimer: Label;

    @property({type: Node})
    public btnTryAgain: Node;

    // @property({type: GameController})
    // private GameController: GameController;
   
    private Timer: number = 5;

    public isGameOver: boolean = false;

    update(deltaTime: number) {
        this.checkOverTime();
    }

    public countDown(): void {
        this.schedule(() =>{
            this.Timer--;
        },1)
    }

    protected checkOverTime(): void {
        if(this.Timer <= 0){
            this.isGameOver = true;
            console.log('over', this.isGameOver);
        }
        
        this.labelTimer.string = `TIME: ${this.Timer}`;
    }

    public showGameOver():void {
        this.btnTryAgain.active = true;
    }
}

