import { _decorator, BoxCollider2D, CCInteger, Collider2D, Component, director, Node, RigidBody2D, Sprite } from 'cc';
import { BoxController } from './BoxController';
import { GameView } from './GameView';
import { ButtonController } from './ButtonController';
import { Constants } from './Constants';
import { GameModel } from './GameModel';
import { ResultController } from './ResultController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property({type: BoxController})
    private boxController: BoxController;

    @property({type: ResultController})
    private ResultController: ResultController

    @property({type: GameView})
    private GameView: GameView;

    @property({type: GameModel})
    private GameModel: GameModel;

    @property({type: ButtonController})
    private ButtonController: ButtonController;

    protected onLoad(): void {
        this.ButtonController.BtnLeft.active = false;
        this.ButtonController.BtnRight.active = false;
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
        director.pause();
        this.GameView.showGameOver();
    }
}


