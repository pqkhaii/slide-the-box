import { _decorator, AudioClip, AudioSource, BoxCollider2D, CCInteger, Collider2D, Component, director, Node, RigidBody2D, Sprite, sys } from 'cc';
import { BoxController } from './BoxController';
import { GameView } from './GameView';
import { Constants } from './Constants';
import { GameModel } from './GameModel';
// import { ButtonController } from './ButtonController';
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
        this.boxController.createBox();
        this.GameView.countDown();

        this.GameModel.btnTryAgain.active = false;
        this.GameModel.bgGameOver.node.active = false;
    }

    protected gameOver(): void {
        this.AudioController.onAudio(0);
        director.pause();
        this.GameView.showGameOver();
    }
}


