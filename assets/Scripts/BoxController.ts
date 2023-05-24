import { _decorator, Component, instantiate, Node, Prefab, randomRange, randomRangeInt } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BoxController')
export class BoxController extends Component {
    @property({type: Prefab})
    private boxLeft: Prefab = null;

    @property({type: Prefab})
    private boxRight: Prefab = null;

    @property({type: Node})
    public boxNode: Node = null;

    public box: Node[] = [];
    // private box: Node = null;

    public boxPool: Node[] = [];
   

    public amoutToBox: number = 6;

    private check: string;

    // private isCreateBox: boolean = false
    

    protected start(): void {
       this.createBox();
       this.boxPool[0].destroy();
    }

    protected update(deltaTime: number): void {
        // this.resetBox();
    }

    // protected resetBox(): void {
    //     for(let i = 0; i<this.amoutToBox; i++){
    //         var posX = this.box[i].position.x;           
    //         var posY = this.box[i].position.y;
    //         if(posX < -550 ){
    //             posX = 0
    //             posY = 380;
    //         }
    //         this.box[i].setPosition(posX, posY, 0);
    //     }
    // }

    protected createBox(): void {
        let i = 0;
        this.schedule(() => {
            ++i;
            let random = randomRangeInt(1,5);
            if(random === 1 || random === 3 || random === 5){
                this.box[i] = instantiate(this.boxLeft);
                this.boxNode.addChild(this.box[i]);
                // this.boxNode.setSiblingIndex(i);
            }
            
            if(random === 2){
                this.box[i] = instantiate(this.boxRight);
                this.boxNode.addChild(this.box[i]);
                // this.boxNode.setSiblingIndex(i);
            }

            // var posX = this.box[i].position.x;           
            // var posY = this.box[i].position.y;

            // this.box[i].setPosition(0.0, 230, 0.0);
            this.boxPool.push(this.box[i]);
        }, 0.1, this.amoutToBox);

        /*
        for(let i = 0; i<this.amoutToBox; i++){

            let random = randomRangeInt(1,3);
            if(random === 1 || random === 3){
                this.box[i] = instantiate(this.boxLeft);
                this.boxNode.addChild(this.box[i]);
                // this.boxNode.setSiblingIndex(i);
            }
            
            if(random === 2){
                this.box[i] = instantiate(this.boxRight);
                this.boxNode.addChild(this.box[i]);
                // this.boxNode.setSiblingIndex(i);
            }

            var posX = this.box[i].position.x;           
            var posY = this.box[i].position.y;

            this.box[i].setPosition(posX, posY, 0);
            this.boxPool.push(this.box[i]);
        }
        */

        console.log(this.boxPool)
    }
}


