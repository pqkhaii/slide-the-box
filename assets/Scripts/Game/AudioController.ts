import { _decorator, AudioClip, AudioSource, Component, Node, sys } from 'cc';
// import { ButtonController } from './ButtonController';
import { Constants } from './Constants';
import { GameModel } from './GameModel';

const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
    @property({
        type: AudioSource
    })
    private audioSource: AudioSource = null;

    @property({
        type: [AudioClip]
    })
    private clips: AudioClip[] = [];

    // @property({type:GameModel})
    // private GameModel: GameModel

    protected onLoad(): void {
        const _audioSource = this.audioSource.node.getComponent(AudioSource!);
        this.audioSource = _audioSource;
    }

    protected start(): void {
        // //-----handle load audio
        // var getVolume = sys.localStorage.getItem(Constants.keyVolume);

        // var convertVolume = parseInt([...getVolume].reverse()[1]);
        // this.settingAudio(convertVolume);

        // if(convertVolume === 1){
        //     this.GameModel.btnOffAudio.active = false;
        //     this.GameModel.btnOnAudio.active = true;
        // }
        // else{
        //     this.GameModel.btnOffAudio.active = true;
        //     this.GameModel.btnOnAudio.active = false;
        // }
    }

    public onAudio(index: number): void {
        let clip: AudioClip = this.clips[index];
        this.audioSource.playOneShot(clip);
    }

    public settingAudio(n: number): void {
        this.audioSource.volume = n;
    }

    
}

