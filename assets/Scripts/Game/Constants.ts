import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Constants')
export class Constants extends Component {
    public static readonly numberOfBox: number = 6;

    public static readonly keyScore: string = 'score';
    public static readonly keyVolume: string = 'volume';

    public static readonly sceneEntry: string = 'Entry';

    public static readonly sceneGame: string = 'Game';

    public static readonly MyNode: string = 'MyNode';

    // public static readonly Timer: number = 5;
}

