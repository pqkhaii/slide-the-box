import { _decorator, Component, director, instantiate, Node, Prefab, randomRangeInt } from 'cc';
import { BoxController } from './BoxController';
import { ResultController } from './ResultController';
import { Constants } from './Constants';
import { GameController } from './GameController';
import { GameView } from './GameView';
import { GameModel } from './GameModel';
const { ccclass, property } = _decorator;

@ccclass('ButtonController')
export class ButtonController extends Component {

    @property({type: BoxController})
    private BoxController : BoxController;

    @property({type: ResultController})
    private ResultController: ResultController;

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
    
    public get BtnLeft() : Node {
        return this.btnLeft
    }

    public set BtnLeft(v : Node) {
        this.btnLeft = v;
    }
    
    public get BtnRight() : Node {
        return this.BtnRight;
    }

    public set BtnRight(x : Node) {
        this.btnRight = x;
    }

    //test//////////////////
    protected onLoad(): void {
        // this.btnLeft.active = false;
        // this.btnRight.active = false;
    }

    protected start(): void {
        this.schedule(()=>{
            this.btnLeft.active = true;
            this.btnRight.active = true;
        },2,5)
    }
    ///////////////////////

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
    }

    public onTouchTryAgain(): void {
        director.resume();
        this.GameModel.timer = 10;
        director.loadScene(Constants.sceneGame);
        this.GameView.isGameOver = false;
        this.GameView.btnTryAgain.active = false;
        this.GameView.bgGameOver.node.active = false;
        // this.GameController.gameStart();
        // this.GameView.isGameOver = false;
    }
}


