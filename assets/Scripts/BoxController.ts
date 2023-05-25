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

    // public boxPool: Node[] = [];
    
    private boxNew: Node;

    public amoutToBox: number = 6;

    public check: number[] = [];

    // private isCreateBox: boolean = false
    
    protected onLoad(): void {
        
    }

    protected start(): void {
        this.createBox();
    }

    protected update(deltaTime: number): void {

    }


    protected createBox(): void {
        let i = 0;
        this.schedule(() => {
            ++i;
            console.log('countI',i)
            let random = randomRangeInt(1,5);
            if(random === 1 || random === 3 || random === 5){ // 
                this.box[i] = instantiate(this.boxLeft);
                this.boxNode.addChild(this.box[i]);
                this.check.push(1);
            }
            
            else{ // || random === 4
                this.box[i] = instantiate(this.boxRight);
                this.boxNode.addChild(this.box[i]);
                this.check.push(0);
            }
        }, 0.5, this.amoutToBox);

        
        // for(let i = 0; i<this.amoutToBox; i++){

        //     let random = randomRangeInt(1,3);
        //     if(random === 1 || random === 3){
        //         this.box[i] = instantiate(this.boxLeft);
        //         this.boxNode.addChild(this.box[i]);
        //         // this.boxNode.setSiblingIndex(i);
        //     }
            
        //     if(random === 2){
        //         this.box[i] = instantiate(this.boxRight);
        //         this.boxNode.addChild(this.box[i]);
        //         // this.boxNode.setSiblingIndex(i);
        //     }

        //     var posX = 0          
        //     var posY = 200

        //     this.box[i].setPosition(posX, posY, 0);
        //     // this.boxPool.push(this.box[i]);
        // }
        

        console.log(this.box)
        console.log(this.check)
    }

    public createNewBox(): void{
        let random = randomRangeInt(1,5)
            if(random === 1 || random === 3 || random === 5){
                this.boxNew = instantiate(this.boxLeft);
                this.boxNode.addChild(this.boxNew);
                this.check.push(1);
            }
            else{
                this.boxNew = instantiate(this.boxRight);
                this.boxNode.addChild(this.boxNew);
                this.check.push(0);
            }
            
            var posX = this.boxNew.position.x;           
            var posY = this.boxNew.position.y;
            
            posX = 0;
            posY = 450;
            
            this.boxNew.setPosition(posX, posY, 0);
            this.box.push(this.boxNew);
    }
}


