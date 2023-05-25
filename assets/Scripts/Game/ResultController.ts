import { _decorator, Component, Label, Node, sys } from 'cc';
import { Constants } from './Constants';
const { ccclass, property } = _decorator;

@ccclass('ResultController')
export class ResultController extends Component {

    @property({type: Label})
    private labelScore: Label;

    @property({type: Label})
    public labelMaxScore: Label;

    private scoreArray: number[] = [0];
    
    maxScore: number = 0;
    currentScore: number = 0;

    protected start(): void {
        var getScore = sys.localStorage.getItem(Constants.keyScore);
        
        if(getScore){
            this.scoreArray = JSON.parse(getScore);
            localStorage.setItem(Constants.keyScore, JSON.stringify(this.scoreArray))
        }

        this.labelMaxScore.node.active = false;
    }

    protected updateScore(num: number): void {
        this.currentScore = num;
        this.labelScore.string = this.currentScore.toString();
    }
    
    public addScore(): void {
        this.updateScore(this.currentScore += 10)
    }

    public showResults(): void {
        this.scoreArray.push(this.currentScore);

        sys.localStorage.setItem(Constants.keyScore, JSON.stringify(this.scoreArray));
        var getScore = JSON.parse(sys.localStorage.getItem(Constants.keyScore));

        this.labelMaxScore.string =`MAX SCORE: ${Math.max(...getScore)}`;
        console.log('max score', Math.max(...getScore));
        
        this.labelMaxScore.node.active = true;
    }

    // public hideResults(): void {
    //     this.labelMaxScore.node.active = false;
    // }
}

