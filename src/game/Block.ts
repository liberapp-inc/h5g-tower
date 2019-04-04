// Liberapp 2019 - Tahiti Katagai
// つみきブロック

class Block extends PhysicsObject{

    static blocks:Block[] = [];
    sizeW:number;
    sizeH:number;
    color:number;

    constructor( px:number, py:number, w:number, h:number ) {
        super();

        Block.blocks.push(this);

        this.sizeW = w;
        this.sizeH = h;
        this.color = randBool() ? BLOCK_COLOR : BLOCK_COLOR2;
        this.setDisplay( px, py );
        this.setBody( px, py );
        Camera2D.transform( this.display );
    }

    setDisplay( px:number, py:number ){
        if( this.display )
            GameObject.display.removeChild( this.display );

        const display = new egret.Shape();
        this.display = display;
        GameObject.display.addChild(this.display);
        GameObject.display.setChildIndex(this.display, 2);
        
        display.x = px;
        display.y = py;
        display.graphics.beginFill( this.color );
        display.graphics.drawRect( -0.5*this.sizeW, -0.5*this.sizeH, this.sizeW, this.sizeH );
        display.graphics.endFill();
    }

    setBody( px:number, py:number ){
        this.body = new p2.Body( {gravityScale:0, mass:1, force:[0,-300], position:[this.p2m(px), this.p2m(py)]} );
        const shape = new p2.Box( { width:this.sizeW, height:this.sizeH } );
        this.body.addShape(shape);
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    }

    onDestroy(){
        Block.blocks = Block.blocks.filter( obj => obj != this );

        PhysicsObject.world.removeBody(this.body);
        this.body.displays = [];
        this.body = null;
    }

    fixedUpdate() {
        if( this.display.y >= Util.height ){
            new GameOver();
            Player.I.setStateNone();
            this.destroy();
        }
        Camera2D.transform( this.display );
    }

    drop(){
        this.body.gravityScale = 1.0;
    }
}
