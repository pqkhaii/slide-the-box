import { _decorator, Component, director, find} from 'cc';
import { BoxController } from './BoxController';
import { GameView } from './GameView';
import { GameModel } from './GameModel';
import { AudioController } from './AudioController';

const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property({type: BoxController})
    private boxController: BoxController;

    @property({type: GameModel})
    private GameModel: GameModel;

    @property({type: AudioController})
    private AudioController: AudioController;

    @property({type: GameView})
    private GameView: GameView;

    protected start(): void {
        this.gameStart();
    }

    protected update(dt: number): void {
        if(this.GameModel.isGameOVer == true){
            this.gameOver();
            this.GameModel.isGameOVer = false;
        }
    }

    protected gameStart(): void {
        this.GameModel.btnOffAudio.interactable = true;
        this.GameModel.btnOnAudio.interactable = true;
        this.boxController.createBox();
        this.GameView.countDown();
        this.GameView.hideResults();
    }

    protected gameOver(): void {
        this.GameModel.btnOffAudio.interactable = false;
        this.GameModel.btnOnAudio.interactable = false;
        this.AudioController.onAudio(0);
        director.pause();
        this.GameView.showGameOver();
        this.GameModel.btnLeft.active = false;
        this.GameModel.btnRight.active = false;
    }
}


