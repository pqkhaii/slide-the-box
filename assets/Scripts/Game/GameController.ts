import { _decorator, BoxCollider2D, CCInteger, Collider2D, Component, director, Node, RigidBody2D, Sprite } from 'cc';
import { BoxController } from './BoxController';
import { GameView } from './GameView';
import { ButtonController } from './ButtonController';
import { AudioController } from './AudioController';

const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property({type: BoxController})
    private boxController: BoxController;

    @property({type:AudioController})
    private AudioController: AudioController;

    // @property({type: ResultController})
    // private ResultController: ResultController

    @property({type: GameView})
    private GameView: GameView;

    // @property({type: GameModel})
    // private GameModel: GameModel;

    @property({type: ButtonController})
    private ButtonController: ButtonController;

    protected onLoad(): void {
        
    }

    protected start(): void {
        this.gameStart();
    }

    protected update(dt: number): void {
        if(this.GameView.isGameOver == true){
            this.gameOver();
            this.GameView.isGameOver = false;
        }
    }

    public gameStart(): void {
        this.boxController.createBox();
        this.GameView.countDown();

        this.GameView.btnTryAgain.active = false;
        this.GameView.bgGameOver.node.active = false;
    }

    protected gameOver(): void {
        this.AudioController.onAudio(0);
        director.pause();
        this.GameView.showGameOver();
    }
}


