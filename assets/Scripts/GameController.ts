import { _decorator, BoxCollider2D, CCInteger, Collider2D, Component, Node, RigidBody2D, Sprite } from 'cc';
import { BoxController } from './BoxController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    private amoutNode: number = 10
    private _Node: Node[] = [];

    @property({
        type: BoxController
    })
    private boxController: BoxController;

    start() {
        // for(let i = 0; i<this.amoutNode; i++){
        //     this._Node[i] = new Node('Box');
        //     this._Node[i].addComponent(BoxCollider2D);
        //     this._Node[i].addComponent(RigidBody2D);
        //     this._Node[i].addComponent(Sprite);

        //     var posX = this._Node[i].position.x;
        //     var posY = this._Node[i].position.y;

        //     posY = 70

        //     this._Node[i].setPosition(posX, posY, 0.0)
        //     console.log(this._Node[i].position.y)
        // }
    }

    update(deltaTime: number) {
        
    }
}


