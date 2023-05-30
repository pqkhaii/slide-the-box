import { _decorator, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioTrack')
export class AudioTrack extends Component {

    @property({type: AudioSource})
    private audioSource: AudioSource = null;

    public settingAudio(number: number): void {
        this.audioSource.volume = number;
    }
}

