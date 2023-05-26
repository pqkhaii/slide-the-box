import { _decorator, CCInteger, Component, director, Node, Sprite, sys } from 'cc';
import { BoxController } from './BoxController';
import { ResultController } from './ResultController';
import { AudioController } from './AudioController';
import { Constants } from './Constants';

const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    
    @property({type:CCInteger})
    public timer: number = 10;

    @property({type: BoxController})
    private BoxController : BoxController;

    @property({type: ResultController})
    private ResultController: ResultController;

    @property({type: AudioController})
    private AudioController: AudioController;

    @property({type: Node})
    private BtnLeft: Node;

    public get btnLeft() : Node {
        return this.BtnLeft;
    }

    public set btnLeft(value : Node) {
        this.BtnLeft = value;
    }

    @property({type: Node})
    private BtnRight: Node;

    public get btnRight() : Node {
        return this.BtnRight;
    }

    public set btnRight(value : Node) {
        this.BtnRight = value;
    }

    @property({type: Node})
    private btnOnAudio: Node;

    @property({type: Node})
    private btnOffAudio: Node;

    @property({type: Node})
    private BtnTryAgain: Node;
    
    public get btnTryAgain() : Node {
        return this.BtnTryAgain;
    }

    public set btnTryAgain(value : Node) {
        this.BtnTryAgain = value;
    }

    @property({type: Sprite})
    private BgGameOver: Sprite = null;

    public get bgGameOver() : Sprite {
        return this.BgGameOver;
    }

    public set bgGameOver(value : Sprite) {
        this.BgGameOver = value;
    }

    private variableVolume: number;
    private variableVolumeArray: number[] = [1];

    private isGameOver: boolean = false;
    
    public get isGameOVer(): boolean {
        return this.isGameOver;
    }
    
    public set isGameOVer(value : boolean) {
        this.isGameOver = value;
    }
    
    protected start(): void {
        //-----handle audio
        var getVolume = sys.localStorage.getItem(Constants.keyVolume);
        
        if(getVolume){
            this.variableVolumeArray = JSON.parse(getVolume);
            localStorage.setItem(Constants.keyVolume, JSON.stringify(this.variableVolumeArray))
        }

        //-----handle load when clicked on/off audio
        var convertVolume = parseInt([...getVolume].reverse()[1]);
        this.AudioController.settingAudio(convertVolume);

        if(convertVolume === 1){
            this.btnOffAudio.active = false;
            this.btnOnAudio.active = true;
        }
        else{
            this.btnOffAudio.active = true;
            this.btnOnAudio.active = false;
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
            this.isGameOver = true;
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
            this.isGameOver = true;
        }

        this.AudioController.onAudio(1);
    }

    protected onTouchTryAgain(): void {
        director.resume();
        this.timer = 33;
        director.loadScene(Constants.sceneGame);
        this.isGameOver = false;
        this.BtnTryAgain.active = false;
        this.BgGameOver.node.active = false;
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

    protected onTouchHome(): void {
        director.loadScene(Constants.sceneEntry)
    }
}

