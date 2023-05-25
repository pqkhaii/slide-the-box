import { _decorator, BoxCollider2D, CCInteger, Collider2D, Component, director, Node, RigidBody2D, Sprite } from 'cc';
import { BoxController } from './BoxController';
import { GameView } from './GameView';
import { ButtonController } from './ButtonController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property({type: BoxController})
    private boxController: BoxController;

    @property({type: GameView})
    private GameView: GameView;

    // @property({type: ButtonController})
    // private ButtonController: ButtonController;

    public isGameOver: boolean = false;

    protected onLoad(): void {
        this.gameStart();
    }

    protected update(dt: number): void {
        if(this.isGameOver == true){
            this.GameOver();
        }
    }

    public gameStart(): void {
        this.boxController.createBox();
        this.GameView.countDown();

        this.GameView.btnTryAgain.active = false;
    }

    protected GameOver(): void {
        director.pause();
        this.GameView.showGameOver();
    }

}


