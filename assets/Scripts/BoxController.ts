import { _decorator, Component, instantiate, Node, Prefab, randomRange, randomRangeInt } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BoxController')
export class BoxController extends Component {
    @property({
        type: Prefab
    })
    private boxLeft: Prefab = null;

    @property({
        type: Prefab
    })
    private boxRight: Prefab = null;

    @property({
        type: Node
    })
    private boxNode: Node = null;

    // private box: Node[] = [];
    private box: Node = null;
   

    private amoutToBox: number = 10;
    

    protected start(): void {
        
    }

    protected update(deltaTime: number): void {
        
    }

    public createBoxLeft(): void {
        this.box = instantiate(this.boxLeft);
        this.boxNode.addChild(this.box);

        var posX = this.box.position.x;           
        var posY = this.box.position.y;
        
        console.log(posX);
        console.log(posY);

        posX = 0;
        posY = 0;

        this.box.setPosition(posX, posY, 0);
    }

    public createBoxRight(): void {

        this.box = instantiate(this.boxRight);
        this.boxNode.addChild(this.box);

        var posX = this.box.position.x;           
        var posY = this.box.position.y;
        
        console.log(posX);
        console.log(posY);

        posX = 0;
        posY = 0;

        this.box.setPosition(posX, posY, 0);
    }



    // protected createBoxLeft(): void {
    //     for(let i = 0; i<this.amoutToBox-5; i++){
    //         this.box[i] = instantiate(this.boxLeft);
    //         this.boxNode.addChild(this.box[i]);

    //         var posX = this.box[i].position.x;           
    //         var posY = this.box[i].position.y;
            
    //         console.log(posX);
    //         console.log(posY);

    //         posX = 0;
    //         posY = 0;

    //         this.box[i].setPosition(posX, posY, 0);
    //     }
    // }

    // protected createBoxRight(): void {
    //     for(let i = 0; i<this.amoutToBox-5; i++){
    //         this.box[i] = instantiate(this.boxRight);
    //         this.boxNode.addChild(this.box[i]);

    //         var posX = this.box[i].position.x;           
    //         var posY = this.box[i].position.y;
            
    //         console.log(posX);
    //         console.log(posY);

    //         posX = 0;
    //         posY = 0;

    //         this.box[i].setPosition(posX, posY, 0);
    //     }
    // }
}

