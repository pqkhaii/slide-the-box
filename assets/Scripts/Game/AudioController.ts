import { _decorator, AudioClip, AudioSource, Component, Node, sys } from 'cc';
import { ButtonController } from './ButtonController';
import { Constants } from './Constants';
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

    @property({type:ButtonController})
    private ButtonController: ButtonController

    protected onLoad(): void {
        const _audioSource = this.audioSource.node.getComponent(AudioSource!);
        this.audioSource = _audioSource;
    }

    protected start(): void {
        //-----handle audio
        var getVolume = sys.localStorage.getItem(Constants.keyVolume);
        
        if(getVolume){
            this.ButtonController.variableVolumeArray = JSON.parse(getVolume);
            localStorage.setItem(Constants.keyScore, JSON.stringify(Constants.keyVolume))
        }

        var convertVolume = parseInt([...getVolume].reverse()[1]);
        this.settingAudio(convertVolume);

        if(convertVolume === 1){
            this.ButtonController.btnOffAudio.active = false;
            this.ButtonController.btnOnAudio.active = true;
        }
        else{
            this.ButtonController.btnOffAudio.active = true;
            this.ButtonController.btnOnAudio.active = false;
        }
    }

    public onAudio(index: number): void {
        let clip: AudioClip = this.clips[index];
        this.audioSource.playOneShot(clip);
    }

    public settingAudio(n: number): void {
        this.audioSource.volume = n;
    }
}

