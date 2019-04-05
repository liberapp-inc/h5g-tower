// Liberapp 2019 - Tahiti Katagai
// つみきブロック

class Block extends PhysicsObject{

    static blocks:Block[] = [];
    sizeW:number;
    sizeH:number;
    color:number;

    constructor( px:number, py:number, type:number ) {
        super();

        Block.blocks.push(this);
        this.sizeW = 0.1 * Util.height;
        this.sizeH = this.sizeW;
        this.color = randBool() ? BLOCK_COLOR : BLOCK_COLOR2;
        this.setDisplay( px, py, type );
        this.setBody( px, py, type );
        this.body.angle = randI(0,3) * Math.PI/2;
        this.display.rotation = this.body.angle * 180 / Math.PI;
        Camera2D.transform( this.display );
    }

    onDestroy(){
        super.onDestroy();
        Block.blocks = Block.blocks.filter( obj => obj != this );
    }

    setDisplay( px:number, py:number, type:number ){
        if( this.display )
            GameObject.display.removeChild( this.display );

        const display = new egret.Shape();
        this.display = display;
        GameObject.display.addChild(this.display);
        GameObject.display.setChildIndex(this.display, 2);        
        display.x = px;
        display.y = py;
        display.graphics.beginFill( this.color );
        switch( type ){
            case 0:
            display.graphics.drawRect( -0.5*this.sizeW, -0.5*this.sizeH, this.sizeW, this.sizeH );
            break;
            case 1:
            display.graphics.drawRect( -1.0*this.sizeW, -0.5*this.sizeH, this.sizeW, this.sizeH );
            display.graphics.drawRect( +0.0*this.sizeW, -0.5*this.sizeH, this.sizeW, this.sizeH );
            break;
            case 2:
            display.graphics.drawRect( -1.0*this.sizeW, -1.0*this.sizeH, this.sizeW, this.sizeH );
            display.graphics.drawRect( +0.0*this.sizeW, -1.0*this.sizeH, this.sizeW, this.sizeH );
            display.graphics.drawRect( +0.0*this.sizeW, +0.0*this.sizeH, this.sizeW, this.sizeH );
            break;
        }
        display.graphics.endFill();
    }

    setBody( px:number, py:number, type:number ){
        switch( type ){
            case 0:
            this.body = new p2.Body( {gravityScale:0, mass:1, position:[this.p2m(px), this.p2m(py)]} );
            this.body.addShape(new p2.Box( { width:this.sizeW, height:this.sizeH } ), [0, 0], 0);
            break;
            case 1:
            this.body = new p2.Body( {gravityScale:0, mass:2, position:[this.p2m(px), this.p2m(py)]} );
            this.body.addShape(new p2.Box( { width:this.sizeW, height:this.sizeH } ), [-0.5*this.sizeW, 0], 0);
            this.body.addShape(new p2.Box( { width:this.sizeW, height:this.sizeH } ), [+0.5*this.sizeW, 0], 0);
            break;
            case 2:
            this.body = new p2.Body( {gravityScale:0, mass:3, position:[this.p2m(px), this.p2m(py)]} );
            this.body.addShape(new p2.Box( { width:this.sizeW, height:this.sizeH } ), [-0.5*this.sizeW, -0.5*this.sizeH], 0);
            this.body.addShape(new p2.Box( { width:this.sizeW, height:this.sizeH } ), [+0.5*this.sizeW, -0.5*this.sizeH], 0);
            this.body.addShape(new p2.Box( { width:this.sizeW, height:this.sizeH } ), [+0.5*this.sizeW, +0.5*this.sizeH], 0);
            break;
        }
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    }

    fixedUpdate() {
        if( this.display.y >= Util.height ){
            new GameOver();
            Player.I.setStateNone();
            PhysicsObject.deltaScale = 0.05;
            this.destroy();
        }
        Camera2D.transform( this.display );
    }

    drop(){
        this.body.setZeroForce();
        this.body.gravityScale = 1.0;
    }
}
