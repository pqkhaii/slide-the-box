import { _decorator, Component, instantiate, Node, Prefab, randomRange, randomRangeInt, Sprite } from 'cc';
import { Constants } from './Constants';

const { ccclass, property } = _decorator;

@ccclass('BoxController')
export class BoxController extends Component {
    @property({type: Prefab})
    private boxLeft: Prefab = null;

    @property({type: Prefab})
    private boxRight: Prefab = null;

    @property({type: Node})
    private boxNode: Node = null;

    private Box: Node[] = [];

    
    public get box() : Node[] {
        return this.Box
    }
    
    
    public set value(value : Node[]) {
        this.Box = value;
    }

    private Check: number[] = [];
    
    public get check() : number[] {
        return this.Check;
    }
    
    
    public set check(value : number[]) {
        this.Check = value;
    }

    private boxNew: Node;

    public createBox(): void {
        let i = 0;

        this.schedule(() => {
            ++i;
            let random = randomRangeInt(1,5);

            if(random === 1 || random === 3 || random === 5){
                this.Box[i] = instantiate(this.boxLeft);
                this.boxNode.addChild(this.Box[i]);
                this.Check.push(1);
            }
            else{
                this.Box[i] = instantiate(this.boxRight);
                this.boxNode.addChild(this.Box[i]);
                this.Check.push(0);
            }
        }, 0.3, Constants.numberOfBox);
        
        /**
        for(let i = 0; i<Constants.numberOfBox; i++){

            let random = randomRangeInt(1,3);
            if(random === 1 || random === 3){
                this.box[i] = instantiate(this.boxLeft);
                this.boxNode.addChild(this.box[i]);
                // this.boxNode.setSiblingIndex(i);
            }
            
            else{
                this.box[i] = instantiate(this.boxRight);
                this.boxNode.addChild(this.box[i]);
                // this.boxNode.setSiblingIndex(i);
            }

            var posX = this.box[i].position.x;          
            var posY = this.box[i].position.y;
            
            posX = 0
            posY = 0;

            this.box[i].setPosition(posX, posY, 0);
            // this.boxPool.push(this.box[i]);
        }
        **/
    }

    public createNewBox(): void{
        let random = randomRangeInt(1,5)

        if(random === 1 || random === 3 || random === 5){
            this.boxNew = instantiate(this.boxLeft);
            this.boxNode.addChild(this.boxNew);
            this.Check.push(1);
        }
        else{
            this.boxNew = instantiate(this.boxRight);
            this.boxNode.addChild(this.boxNew);
            this.Check.push(0);
        }
        
        var posX = this.boxNew.position.x;           
        var posY = this.boxNew.position.y;
        
        posX = 0;
        posY = 350;
        
        this.boxNew.setPosition(posX, posY, 0);
        this.box.push(this.boxNew);
    }
}


