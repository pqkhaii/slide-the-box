import { _decorator, Component, director, instantiate, Node, Prefab, randomRangeInt } from 'cc';
import { BoxController } from './BoxController';
import { ResultController } from './ResultController';
import { Constants } from './Constants';
import { GameController } from './GameController';
import { GameView } from './GameView';
import { GameModel } from './GameModel';
import { SoundController } from './SoundController';
const { ccclass, property } = _decorator;

@ccclass('ButtonController')
export class ButtonController extends Component {

    @property({type: BoxController})
    private BoxController : BoxController;

    @property({type: ResultController})
    private ResultController: ResultController;

    @property({type:SoundController})
    private SoundController: SoundController;

    // @property({type: GameController})
    // private GameController: GameController;

    @property({type: GameView})
    private GameView: GameView;

    @property({type: GameModel})
    private GameModel: GameModel;

    @property({type: Node})
    private btnLeft: Node;

    @property({type: Node})
    private btnRight: Node;
  
    protected onLoad(): void {
        this.btnLeft.active = false;
        this.btnRight.active = false;
    }

    protected start(): void {

        //delay button right - left
        this.schedule(()=>{
            this.btnLeft.active = true;
            this.btnRight.active = true;
        },2.5,5)
    }

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
            this.GameView.isGameOver = true;
        }

        this.SoundController.onAudio(1);
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
            this.GameView.isGameOver = true;
        }

        this.SoundController.onAudio(1);
    }

    protected onTouchTryAgain(): void {
        director.resume();
        this.GameModel.timer = 10;
        director.loadScene(Constants.sceneGame);
        this.GameView.isGameOver = false;
        this.GameView.btnTryAgain.active = false;
        this.GameView.bgGameOver.node.active = false;
    }

    protected onTouchOnAudio(): void {
        this.SoundController.settingAudio(1);
    }

    protected onTouchOffAudio(): void {
        this.SoundController.settingAudio(0);
    }
}


