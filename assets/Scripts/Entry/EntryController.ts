import { _decorator, AudioSource, Component, Node, director, sys, game } from 'cc';
import { Constants } from '../Game/Constants';

const { ccclass, property } = _decorator;

@ccclass('EntryController')
export class EntryController extends Component {

    @property({type: AudioSource})
    private audioSource: AudioSource = null;

    @property({type: Node})
    private btnOnAudio: Node;

    @property({type: Node})
    private btnOffAudio: Node;

    private variableVolume: number;
    private variableVolumeArray: number[] = [1];
    private convertVolume: number;
    
    protected onLoad(): void {
        // game.resume();
        // this.audioSource.playOnAwake = true;    
    }

    protected start(): void {
        //-----handle audio
        var getVolume = sys.localStorage.getItem(Constants.keyVolume);
        
        if(getVolume){
            this.variableVolumeArray = JSON.parse(getVolume);
            localStorage.setItem(Constants.keyVolume, JSON.stringify(this.variableVolumeArray))
        }

        //-----handle load when clicked on/off audio
        // this.convertVolume = parseInt([...getVolume].reverse()[1]);
        this.convertVolume = this.variableVolumeArray.reverse()[0];
        console.log(this.convertVolume);
        if(this.convertVolume === 1){
            this.btnOffAudio.active = false;
            this.btnOnAudio.active = true;
            this.settingAudio(this.convertVolume);
        }
        if(this.convertVolume === 0){
            this.btnOffAudio.active = true;
            this.btnOnAudio.active = false;
            this.settingAudio(this.convertVolume);
        }
    }

    protected onTouchOnAudio(): void {
        this.variableVolume = 1;
        this.variableVolumeArray.push(this.variableVolume);

        sys.localStorage.setItem(Constants.keyVolume, JSON.stringify(this.variableVolumeArray));
        var getVolume = JSON.parse(sys.localStorage.getItem(Constants.keyVolume));
        var Volume = getVolume.reverse()[0];

        this.settingAudio(Volume);

        this.btnOffAudio.active = false;
        this.btnOnAudio.active = true;
    }

    protected onTouchOffAudio(): void {
        this.variableVolume = 0;
        this.variableVolumeArray.push(this.variableVolume);

        sys.localStorage.setItem(Constants.keyVolume, JSON.stringify(this.variableVolumeArray));
        var getVolume = JSON.parse(sys.localStorage.getItem(Constants.keyVolume));
        var Volume = getVolume.reverse()[0];

        this.settingAudio(Volume);

        this.btnOffAudio.active = true;
        this.btnOnAudio.active = false;
    }

    protected settingAudio(number: number): void {
        this.audioSource.volume = number;
    }

    protected onTouchPlay(): void{
        director.loadScene(Constants.sceneGame);
    }
}