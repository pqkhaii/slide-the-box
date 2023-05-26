import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundController')
export class SoundController extends Component {
    @property({
        type: AudioSource
    })
    private audioSource: AudioSource = null;

    @property({
        type: [AudioClip]
    })
    private clips: AudioClip[] = [];

    protected onLoad(): void {
        const _audioSource = this.audioSource.node.getComponent(AudioSource!);
        this.audioSource = _audioSource;

        // this.btnOffAudio.active = false;
    }

    public onAudio(index: number): void {
        let clip: AudioClip = this.clips[index];
        this.audioSource.playOneShot(clip);
    }

    public settingAudio(n: number): void {
        this.audioSource.volume = n;

        // this.btnOffAudio.active = false;
        // this.btnOnAudio.active = true;
    }

    // public pauseAudio(n: number): void {
    //     this.audioSource.volume = n;

    //     // this.btnOnAudio.active = false;
    //     // this.btnOffAudio.active = true;
    // }
}

