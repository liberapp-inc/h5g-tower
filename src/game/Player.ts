// Liberapp 2019 - Tahiti Katagai
// プレイヤー　ブロック生成〜スワイプ移動

class Player extends GameObject{

    static I:Player = null;

    x:number;
    y:number;
    state:()=>void = this.stateNone;
    step:number = 0;
    block:Block = null;
    blockAngle:number = 0;
    rotateButton:Button = null;
    swipeButton:Button = null;

    constructor() {
        super();

        Player.I = this;
        this.x = 0.5*Util.width;
        this.y = 0.2*Util.height;
        this.block = new Block( this.x, this.y, randI(0, 3) );
    }

    onDestroy(){
        Player.I = null;
    }

    update() {
        this.state();
        const camScale = Util.clamp( Util.height / (Util.height - (this.y - BLOCK_SIZE_PER_H*Util.height*2)), 0, 1 );
        Camera2D.scale += (camScale - Camera2D.scale) * 0.1;
        Camera2D.x = (1 - 1/Camera2D.scale) * Util.width  * 0.5;
        Camera2D.y = (1 - 1/Camera2D.scale) * Util.height;
    }

    setStateNone(){
        this.state = this.stateNone;
        this.step = 0;
        if( this.block ){
            this.block.destroy();
            this.block = null;
        }
        if( this.swipeButton ){
            this.swipeButton.destroy();
            this.swipeButton = null;
        }
        if( this.rotateButton ){
            this.rotateButton.destroy();
            this.rotateButton = null;
        }
    }
    stateNone(){}

    setStateHold(){
        this.state = this.stateHold;
        this.y -= BLOCK_SIZE_PER_H * Util.height * 0.5;
        if( !this.block ) this.block = new Block( this.x, this.y, randI(0, 3) );
        this.blockAngle = this.block.body.angle;
        this.swipeButton  = new Button(null, 0, 0, 0.5, 0.3, 1, 0.6, 0x0, 0.0, this.onSwipeRelease );
        this.rotateButton = new Button("↻", Util.height/16, BACK_COLOR, 0.10, 0.10, 0.2, 0.1, FONT_COLOR, 1.0, this.onTapRotate );
    }
    stateHold(){
        this.block.body.angle += (this.blockAngle - this.block.body.angle) * 0.2;

        if( this.swipeButton.touch ){
            this.block.px = Util.clamp( this.swipeButton.x, 0, Util.width );
        }
    }
    onSwipeRelease = ()=>{
        this.setStateRelease();
    }
    onTapRotate = ()=>{
        this.blockAngle += Math.PI / 2;
    }
    
    setStateRelease(){
        this.state = this.stateRelease;
        this.step = 0;
        this.block.drop();
        this.block = null;
        this.swipeButton.destroy();
        this.swipeButton = null;
        this.rotateButton.destroy();
        this.rotateButton = null;
        Score.I.addPoint(1);
    }
    stateRelease() {
        this.step++;
        if( this.step >= 60 * 2 ){
            this.setStateHold();
        }
    }
}
