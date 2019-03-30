// Liberapp 2019 - Tahiti Katagai
// ターゲットのマト

class Block extends GameObject{

    static blocks:Block[] = [];
    sizeW:number;
    sizeH:number;
    color:number;
    readonly animFrameMax = 8;
    animFrame:number = 0;

    constructor( x:number, y:number, w:number, h:number ) {
        super();

        Block.blocks.push(this);

        this.sizeW = w;
        this.sizeH = h;
        this.color = randBool() ? BLOCK_COLOR : BLOCK_COLOR2;
        this.setShape( x, y );
    }

    onDestroy(){
        Block.blocks = Block.blocks.filter( obj => obj != this );
    }

    setShape(x:number, y:number ){
        if( this.shape == null ){
            this.shape = new egret.Shape();
            GameObject.display.addChild(this.shape);
            GameObject.display.setChildIndex(this.shape, 2);
        }else{
            this.shape.graphics.clear();
        }
        
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill( this.color );
        this.shape.graphics.drawRect( 0, 0, this.sizeW, this.sizeH );
        this.shape.graphics.endFill();
    }

    update() {
        this.scaleAnim();
    }

    scaleAnim(){
        if( this.animFrame > 0 ) {
            this.animFrame--;
            let scale = 1 + 0.4 * this.animFrame / this.animFrameMax;
            this.shape.scaleX = this.shape.scaleY = scale;
        }
    }

    // ヒット
    hit(){
        this.animFrame = this.animFrameMax;
        this.scaleAnim();
    }
}
