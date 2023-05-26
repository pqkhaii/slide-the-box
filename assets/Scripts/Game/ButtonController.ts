import { _decorator, Component, director, instantiate, Node, Prefab, randomRangeInt, sys } from 'cc';
import { BoxController } from './BoxController';
import { ResultController } from './ResultController';
import { Constants } from './Constants';
import { GameController } from './GameController';
import { GameView } from './GameView';
import { GameModel } from './GameModel';
import { AudioController } from './AudioController';
const { ccclass, property } = _decorator;

@ccclass('ButtonController')
export class ButtonController extends Component {

    @property({type: BoxController})
    private BoxController : BoxController;

    @property({type: ResultController})
    private ResultController: ResultController;

    @property({type: AudioController})
    private AudioController: AudioController;

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

    @property({type: Node})
    public btnOnAudio: Node;

    @property({type: Node})
    public btnOffAudio: Node;

    public variableVolume: number;
    public variableVolumeArray: number[] = [];
  
    protected onLoad(): void {
        this.btnLeft.active = false;
        this.btnRight.active = false;
    }

    protected start(): void {
        this.btnOffAudio.active = false;
        this.btnOnAudio.active = true;

        //delay button right - left
        this.schedule(()=>{
            this.btnLeft.active = true;
            this.btnRight.active = true;
        },2.5,5)

        //-----handle audio
        var getVolume = sys.localStorage.getItem(Constants.keyVolume);
        
        if(getVolume){
            this.variableVolumeArray = JSON.parse(getVolume);
            localStorage.setItem(Constants.keyScore, JSON.stringify(Constants.keyVolume))
        }
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
            // console.log("You lost!")
            this.GameView.isGameOver = true;
        }

        this.AudioController.onAudio(1);
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
            // console.log("You lost!")
            this.GameView.isGameOver = true;
        }

        this.AudioController.onAudio(1);
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
        this.variableVolume = 1;
        this.variableVolumeArray.push(this.variableVolume);

        sys.localStorage.setItem(Constants.keyVolume, JSON.stringify(this.variableVolumeArray));
        var getVolume = JSON.parse(sys.localStorage.getItem(Constants.keyVolume));
        var Volume = getVolume.reverse()[0]

        this.AudioController.settingAudio(Volume);

        this.btnOffAudio.active = false;
        this.btnOnAudio.active = true;
    }

    protected onTouchOffAudio(): void {
        this.variableVolume = 0;

        this.variableVolumeArray.push(this.variableVolume);

        sys.localStorage.setItem(Constants.keyVolume, JSON.stringify(this.variableVolumeArray));
        var getVolume = JSON.parse(sys.localStorage.getItem(Constants.keyVolume));
        var Volume = getVolume.reverse()[0]

        this.AudioController.settingAudio(Volume);
        console.log(getVolume.reverse()[0])

        this.btnOffAudio.active = true;
        this.btnOnAudio.active = false;
    }
}


