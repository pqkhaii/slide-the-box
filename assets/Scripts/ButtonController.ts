import { _decorator, Component, instantiate, Node, Prefab, randomRangeInt } from 'cc';
import { BoxController } from './BoxController';
const { ccclass, property } = _decorator;

@ccclass('ButtonController')
export class ButtonController extends Component {

    @property({type: BoxController})
    private BoxController : BoxController;

    @property({type: Node})
    private Move: Node;

    private boxNew: Node;

    @property({type: Prefab})
    private boxLeft: Prefab = null;

    @property({type: Prefab})
    private boxRight: Prefab = null;

    protected update(dt: number): void {
        // console.log(this.BoxController.boxPool)

    }

    protected onTouchLeft(event:Event , customEventData: String): void {

        this.BoxController.boxPool.shift();
        this.BoxController.boxPool[0].destroy();
        if(this.BoxController.boxPool.length < 8){
            this.createNewBox();
            this.createNewBox();
        }

        console.log("check del 1st",  this.BoxController.boxPool.shift())
        console.log("check des", this.BoxController.boxPool[0].destroy())

        console.log(this.BoxController.boxPool);
        
    }

    protected onTouchRight(): void {
        
    }

    protected createNewBox(): void{
        let random = randomRangeInt(1,5)
            if(random === 1 || random === 3 || random === 5){
                this.boxNew = instantiate(this.boxLeft);
                this.BoxController.boxNode.addChild(this.boxNew);
            }
            else{
                this.boxNew = instantiate(this.boxRight);
                this.BoxController.boxNode.addChild(this.boxNew);
            }

            var posX = this.boxNew.position.x;           
            var posY = this.boxNew.position.y;
            
            console.log(posX);
            console.log(posY);

            posX = 0;
            posY = 380;

            this.boxNew.setPosition(posX, posY, 0);
            this.BoxController.boxPool.push(this.boxNew);
            console.log( this.BoxController.boxPool.push(this.boxNew))
    }
}


