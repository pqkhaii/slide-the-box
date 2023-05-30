import { _decorator, AudioSource, Component, Node, director, sys, game, find } from 'cc';
import { Constants } from '../Game/Constants';
import { AudioTrack } from './AudioTrack';

const { ccclass, property } = _decorator;

@ccclass('EntryController')
export class EntryController extends Component {

    @property({type: AudioTrack})
    private AudioTrack: AudioTrack;

    @property({type: Node})
    private btnOnAudio: Node;

    @property({type: Node})
    private btnOffAudio: Node;

    private variableVolume: number = null;
    private variableVolumeArray: number[] = [];
    private convertVolume: number;
    
    protected onLoad(): void {
        director.resume();
    }

    protected start(): void {
        //-----handle audio
        var getVolume = sys.localStorage.getItem(Constants.keyVolume);
        
        if(getVolume){
            this.variableVolumeArray = JSON.parse(getVolume);
            localStorage.setItem(Constants.keyVolume, JSON.stringify(this.variableVolumeArray))

            //-----handle load when clicked on/off audio
            this.convertVolume = this.variableVolumeArray[this.variableVolumeArray.length - 1];

            if(this.convertVolume === 1){
                this.btnOffAudio.active = false;
                this.btnOnAudio.active = true;
                this.AudioTrack.settingAudio(this.convertVolume);
            }
            else if(this.convertVolume === 0){
                this.btnOffAudio.active = true;
                this.btnOnAudio.active = false;
                this.AudioTrack.settingAudio(this.convertVolume);
            }
        }
        else {
            this.btnOffAudio.active = false;
            this.btnOnAudio.active = true;
            this.AudioTrack.settingAudio(1);
        }
    }

    protected onTouchOnAudio(): void {
        this.variableVolume = 1;
        this.variableVolumeArray.push(this.variableVolume);

        sys.localStorage.setItem(Constants.keyVolume, JSON.stringify(this.variableVolumeArray));
        // var getVolume = JSON.parse(sys.localStorage.getItem(Constants.keyVolume));
        // var Volume = getVolume.reverse()[0];

        this.AudioTrack.settingAudio(1);

        this.btnOffAudio.active = false;
        this.btnOnAudio.active = true;
    }

    protected onTouchOffAudio(): void {
        this.variableVolume = 0;
        this.variableVolumeArray.push(this.variableVolume);

        sys.localStorage.setItem(Constants.keyVolume, JSON.stringify(this.variableVolumeArray));
        // var getVolume = JSON.parse(sys.localStorage.getItem(Constants.keyVolume));
        // var Volume = getVolume.reverse()[0];

        this.AudioTrack.settingAudio(0);

        this.btnOffAudio.active = true;
        this.btnOnAudio.active = false;
    }

    protected onTouchPlay(): void{
        director.loadScene(Constants.sceneGame);
    }
}