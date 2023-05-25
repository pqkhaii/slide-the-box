import { _decorator, Component, instantiate, Node, Prefab, randomRangeInt } from 'cc';
import { BoxController } from './BoxController';
const { ccclass, property } = _decorator;

@ccclass('ButtonController')
export class ButtonController extends Component {

    @property({type: BoxController})
    private BoxController : BoxController;

    protected onTouchLeft(event:Event , customEventData: String): void {

        if(this.BoxController.check[0] == 1){
            this.BoxController.box.shift();
            this.BoxController.box[0].destroy();

            this.BoxController.check.shift()

            this.BoxController.createNewBox();
        }
        else{
            console.log("You lost!")
        }
    }

    protected onTouchRight(): void {
        if(this.BoxController.check[0] == 0){
            this.BoxController.box.shift();
            this.BoxController.box[0].destroy();
            
            this.BoxController.check.shift()

            this.BoxController.createNewBox();
        }
        else{
            console.log("You lost!")
        }
    }
}


