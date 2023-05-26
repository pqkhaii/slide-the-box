import { _decorator, ButtonComponent, Component, director, find, Node } from 'cc';
import { Constants } from '../Game/Constants';

const { ccclass, property } = _decorator;

@ccclass('EntryController')
export class EntryController extends Component {

    onTouchPlay(): void{
        director.loadScene(Constants.sceneGame);
    }

}