import { _decorator, Component, Label} from 'cc';
import { GameModel } from './GameModel';
import { ResultController } from './ResultController';

const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {

    @property({type: Label})
    private labelTimer: Label;
    
    @property({type: ResultController})
    private ResultController: ResultController;
   
    @property({ type: GameModel })
    private GameModel: GameModel;

    protected onLoad(): void {
        this.GameModel.btnLeft.active = false;
        this.GameModel.btnRight.active = false;
        
        this.GameModel.btnOffAudio.active = false;

        this.ResultController.labelHighScore.node.active = false;
        this.ResultController.labelGameOver.node.active = false;
    }

    protected start(): void {
        this.labelTimer.node.active = false;

        // delay button right - left
        this.schedule(()=>{
            this.GameModel.btnLeft.active = true;
            this.GameModel.btnRight.active = true;
        },2.5)
    }

    protected update(deltaTime: number): void {
        this.checkOverTime();
    }

    public countDown(): void {
        this.schedule(() =>{
            this.GameModel.timer--;
        },1)
    }

    protected checkOverTime(): void {
        if(this.GameModel.timer <= 30){ //time: 33 is good
            this.labelTimer.node.active = true;
            this.labelTimer.string = `TIME: ${this.GameModel.timer}`;
        }
        
        if(this.GameModel.timer == 0){
            this.GameModel.isGameOVer = true;
        }
    }

    //Show: result, button TryAgain, background OverGame
    public showGameOver(): void {
        this.GameModel.btnTryAgain.active = true;
        this.GameModel.bgGameOver.node.active = true;

        this.ResultController.labelHighScore.node.active = true;
        this.ResultController.labelGameOver.node.active = true;
        this.ResultController.showResults();
    }

    //hide results
    public hideResults(): void {
        this.GameModel.btnTryAgain.active = false;
        this.GameModel.bgGameOver.node.active = false;
    }
}

