import { _decorator, Component, director, instantiate, Node, Prefab, randomRangeInt } from 'cc';
import { BoxController } from './BoxController';
import { ResultController } from './ResultController';
import { Constants } from './Constants';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

@ccclass('ButtonController')
export class ButtonController extends Component {

    @property({type: BoxController})
    private BoxController : BoxController;

    @property({type: ResultController})
    private ResultController: ResultController;

    // @property({type: GameController})
    // private GameController: GameController;

    protected onTouchLeft(event:Event , customEventData: String): void {
        if(this.BoxController.check[0] == 1){
            this.BoxController.box.shift();
            this.BoxController.box[0].destroy();

            this.BoxController.check.shift()
            
            this.BoxController.createNewBox();

            this.ResultController.addScore();
        }
        else{
            console.log("You lost!")
        }
    }

    protected onTouchRight(): void {
        if(this.BoxController.check[0] == 0){
            this.BoxController.box.shift();
            this.BoxController.box[0].destroy();

            this.BoxController.check.shift()
            
            this.BoxController.createNewBox();

            this.ResultController.addScore();
        }
        else{
            console.log("You lost!")
        }
    }

    // public onTouchTryAgain(): void {
    //     director.loadScene(Constants.sceneGame);
    //     this.GameController.gameStart();
    //     this.GameController.isGameOver = false;
    // }
}


