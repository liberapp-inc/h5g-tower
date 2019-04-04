// Liberapp 2019 - Tahiti Katagai
// プレイヤーボール　重力落下

class Player extends GameObject{

    static I:Player = null;

    state:()=>void = this.stateNone;
    step:number = 0;
    x:number;
    y:number;
    swipeButton:Button;
    block:Block = null;
    rotateButton:Button = null;

    constructor() {
        super();

        Player.I = this;
        this.swipeButton = new Button(null, 0, 0, 0.5, 0.3, 1, 0.6, 0x0, 0.0, null );
    }

    onDestroy(){
        Player.I = null;
    }

    update() {
        this.state();

        Camera2D.y -= 0.1;
        Camera2D.scale *= 0.9999;
    }

    setStateNone(){
        this.state = this.stateNone;
        this.step = 0;
        if( this.block ){
            this.block.destroy();
            this.block = null;
        }
        if( this.rotateButton ){
            this.rotateButton.destroy();
            this.rotateButton = null;
        }
    }
    stateNone(){}

    setStateHold(){
        this.state = this.stateHold;
        this.x = 0.5*Util.width;
        this.y = 0.2*Util.height;
        this.block = new Block( this.x, this.y, 0.2*Util.height, 0.1*Util.height );
        this.rotateButton = new Button("↻", Util.height/16, BACK_COLOR, 0.9, 0.9, 0.2, 0.1, FONT_COLOR, 1.0, Player.callbackRotate );
    }
    stateHold(){
        if( this.swipeButton.touch ){
            this.x = this.swipeButton.x;
            this.x = Util.clamp( this.x, 0, Util.width );
        }
        this.block.px = this.x;
        this.block.py = this.y;

        if( this.swipeButton.release ){
            this.setStateRelease();
        }
    }
    static callbackRotate(){
        Player.I.block.body.angle += Math.PI / 8;
    }
    
    setStateRelease(){
        this.state = this.stateRelease;
        this.step = 0;
        this.block.drop();
        this.block = null;
        this.rotateButton.destroy();
        this.rotateButton = null;
    }
    stateRelease() {
        this.step++;
        if( this.step >= 60 * 2 ){
            this.setStateHold();
        }
    }
}
