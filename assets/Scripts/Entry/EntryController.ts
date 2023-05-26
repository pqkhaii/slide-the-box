import { _decorator, Component, director } from 'cc';
import { Constants } from '../Game/Constants';

const { ccclass, property } = _decorator;

@ccclass('EntryController')
export class EntryController extends Component {

    protected onTouchPlay(): void{
        director.loadScene(Constants.sceneGame);
    }

}