import { _decorator, Button, CCInteger, Component, director, find, game, Node, Sprite, sys } from 'cc';
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

    @property({type: Button})
    private BtnOnAudio: Button;

    public get btnOnAudio() : Button {
        return this.BtnOnAudio;
    }

    public set btnOnAudio(value : Button) {
        this.BtnOnAudio = value;
    }

    @property({type: Button})
    private BtnOffAudio: Button;

    public get btnOffAudio() : Button {
        return this.BtnOffAudio;
    }

    public set btnOffAudio(value : Button) {
        this.BtnOffAudio = value;
    }

    @property({type: Button})
    private BtnTryAgain: Button;
    
    public get btnTryAgain() : Button {
        return this.BtnTryAgain;
    }

    public set btnTryAgain(value : Button) {
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
    private variableVolumeArray: number[] = [];

    private IsGameOver: boolean = false;

    private convertVolume: number;
    
    public get isGameOVer(): boolean {
        return this.IsGameOver;
    }
    
    public set isGameOVer(value : boolean) {
        this.IsGameOver = value;
    }

    protected onLoad(): void {
        director.resume();
        this.IsGameOver = false;
    }
    
    protected start(): void {
        //-----handle audio
        var getVolume = sys.localStorage.getItem(Constants.keyVolume);
        
        if(getVolume){
            this.variableVolumeArray = JSON.parse(getVolume);
            localStorage.setItem(Constants.keyVolume, JSON.stringify(this.variableVolumeArray))
        }
        else {
            this.BtnOffAudio.node.active = false;
            this.BtnOnAudio.node.active = true;
            this.AudioController.settingAudio(1);
        }

        //-----handle load when clicked on/off audio
        this.convertVolume = this.variableVolumeArray[this.variableVolumeArray.length - 1];

        if(this.convertVolume === 1){
            this.BtnOffAudio.node.active = false;
            this.BtnOnAudio.node.active = true;
            this.AudioController.settingAudio(this.convertVolume);
        }
        else if(this.convertVolume === 0){
            this.BtnOffAudio.node.active = true;
            this.BtnOnAudio.node.active = false;
            this.AudioController.settingAudio(this.convertVolume);
        }
    }

    protected onTouchLeft(): void {
        if(this.BoxController.check[0] == 1){
            this.BoxController.box.shift();
            this.BoxController.box[0].destroy();

            this.BoxController.check.shift()
            
            this.BoxController.createNewBox();

            this.ResultController.addScore();
        }
        else{
            // console.log("You lost!")
            this.IsGameOver = true;
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
            this.IsGameOver = true;
        }

        this.AudioController.onAudio(1);
    }

    protected onTouchTryAgain(): void {
        director.resume();
        this.timer = 33;
        director.loadScene(Constants.sceneGame);
        this.IsGameOver = false;
        this.BtnTryAgain.node.active = false;
        this.BgGameOver.node.active = false;
        
    }

    protected onTouchOnAudio(): void {
        this.variableVolume = 1;
        this.variableVolumeArray.push(this.variableVolume);

        sys.localStorage.setItem(Constants.keyVolume, JSON.stringify(this.variableVolumeArray));
        // var getVolume = JSON.parse(sys.localStorage.getItem(Constants.keyVolume));
        // var Volume = getVolume.reverse()[0];

        this.AudioController.settingAudio(1);

        this.BtnOffAudio.node.active = false;
        this.BtnOnAudio.node.active = true;
    }

    protected onTouchOffAudio(): void {
        this.variableVolume = 0;
        this.variableVolumeArray.push(this.variableVolume);

        sys.localStorage.setItem(Constants.keyVolume, JSON.stringify(this.variableVolumeArray));
        // var getVolume = JSON.parse(sys.localStorage.getItem(Constants.keyVolume));
        // var Volume = getVolume.reverse()[0];

        this.AudioController.settingAudio(0);

        this.BtnOffAudio.node.active = true;
        this.BtnOnAudio.node.active = false;
    }

    protected onTouchHome(): void {
        
        director.loadScene(Constants.sceneEntry);

    }
}

