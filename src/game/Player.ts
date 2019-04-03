// Liberapp 2019 - Tahiti Katagai
// プレイヤーボール　重力落下

class Player extends GameObject{

    static I:Player = null;

    state:()=>void = this.stateNone;
    step:number = 0;
    block:Block = null;
    x:number;
    y:number;
    touchOffsetX:number = 0;

    _touchBegin:(e:egret.TouchEvent)=>void = (e: egret.TouchEvent) => { this.touchBegin(e) };
    _touchMove:(e:egret.TouchEvent)=>void = (e: egret.TouchEvent) => { this.touchMove(e) };
    _touchEnd:(e:egret.TouchEvent)=>void = (e: egret.TouchEvent) => { this.touchEnd(e) };


    constructor() {
        super();

        Player.I = this;
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchBegin, this);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchMove, this);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_END, this._touchEnd, this);
    }

    onDestroy(){
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchBegin, this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchMove, this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this._touchEnd, this);
        Player.I = null;
    }

    update() {
        this.state();

        Camera2D.y -= 0.1;
        Camera2D.scale *= 0.9999;
    }

    stateNone(){}

    setStateHold(){
        this.state = this.stateHold;
        this.x = 0.5*Util.width;
        this.y = 0.2*Util.height;
        this.block = new Block( this.x, this.y, 0.2*Util.height, 0.1*Util.height );
    }
    stateHold(){
        this.block.px = this.x;
        this.block.py = this.y;
    }
    
    setStateRelease(){
        this.state = this.stateRelease;
        this.step = 0;
        this.block.drop();
        this.block = null;
    }
    stateRelease() {
        this.step++;
        if( this.step >= 60 * 2 ){
            this.setStateHold();
        }
    }

    // touch
    touchBegin(e:egret.TouchEvent){
        console.log( "touchBegine" );
        if( this.state != this.stateHold )
            return;
        this.touchOffsetX = this.x - e.localX;
    }
    touchMove(e:egret.TouchEvent){
        if( this.state != this.stateHold )
            return;
        this.x = e.localX + this.touchOffsetX;
        this.x = Util.clamp( this.x, 0, Util.width );
        this.touchOffsetX = this.x - e.localX;
    }
    touchEnd(e:egret.TouchEvent){
        if( this.state != this.stateHold )
            return;
        
        this.setStateRelease();
    }
}
