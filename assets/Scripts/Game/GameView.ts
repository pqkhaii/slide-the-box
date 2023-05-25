import { _decorator, CCInteger, Component, Label, Node, Sprite } from 'cc';
import { GameController } from './GameController';
import { GameModel } from './GameModel';
import { ResultController } from './ResultController';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {

    @property({type: Label})
    private labelTimer: Label;

    @property({type: Node})
    public btnTryAgain: Node;

    @property({type: Sprite})
    public bgGameOver: Sprite = null;
    
    @property({type: ResultController})
    private ResultController: ResultController;
   
    @property({type: GameModel})
    private GameModel: GameModel;

    public isGameOver: boolean = false;

    protected start(): void {
        
    }

    update(deltaTime: number) {
        this.checkOverTime();
    }

    public countDown(): void {
        this.schedule(() =>{
            this.GameModel.timer--;
        },1)
    }

    protected checkOverTime(): void {
        if(this.GameModel.timer == 0){
            this.isGameOver = true;
        }
        
        this.labelTimer.string = `TIME: ${this.GameModel.timer}`;
    }

    public showGameOver():void {
        this.btnTryAgain.active = true;
        this.bgGameOver.node.active = true;
        this.ResultController.showResults();
    }
}

