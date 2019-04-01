// Liberapp 2019 - Tahiti Katagai
// 床

class Ground extends PhysicsObject{

    sizeW:number;
    sizeH:number;

    constructor() {
        super();

        const px = 0.50 * Util.width;
        const py = 0.95 * Util.height;
        this.sizeW = 0.6 * Util.width;
        this.sizeH = 0.1 * Util.height;

        this.setDisplay( px, py );
        this.setBody( px, py );
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
        display.graphics.beginFill( FONT_COLOR );
        display.graphics.drawRect( -0.5*this.sizeW, -0.5*this.sizeH, this.sizeW, this.sizeH );
        display.graphics.endFill();
    }

    setBody( px:number, py:number ){
        
        this.body = new p2.Body( {position:[this.p2m(px), this.p2m(py)],type: p2.Body.STATIC} );
        const shape = new p2.Box( { width:this.sizeW, height:this.sizeH } );
        this.body.addShape(shape);
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    }

    onDestroy(){
        PhysicsObject.world.removeBody(this.body);
        this.body.displays = [];
        this.body = null;
    }

    fixedUpdate() {}
}
