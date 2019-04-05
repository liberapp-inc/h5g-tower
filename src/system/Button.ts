// Liberapp 2019 - Tahiti Katagai
// 汎用ボタン　１つ

class Button extends GameObject{

    text:egret.TextField = null;
    onTap:()=>void = null;

    touch:boolean = false;
    x:number = 0;
    y:number = 0;

    constructor( text:string, fontsize:number, fontRGB:number, xRatio:number, yRatio:number, wRatio:number, hRatio:number, rgb:number, alpha:number, onTap:()=>void ) {
        super();

        if( text ){
            this.text = Util.newTextField(text, fontsize, fontRGB, xRatio, yRatio, true, false);
            GameObject.display.addChild( this.text );
        }

        let shape = new egret.Shape();
        GameObject.display.addChild(shape);
        GameObject.display.setChildIndex(shape, 1);
        shape.graphics.beginFill( rgb, alpha );
        let w = wRatio * Util.width;
        let h = hRatio * Util.height;
        shape.graphics.drawRoundRect(-0.5*w, -0.5*h, w, h, w*0.2);
        shape.graphics.endFill();
        shape.touchEnabled = true;
        shape.x = xRatio * Util.width;
        shape.y = yRatio * Util.height;
        this.display = shape;

        this.onTap = onTap;
        if( this.onTap ) this.display.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.display.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.display.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    }

    onDestroy(){
        if( this.onTap ) this.display.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);

        if( this.text ) GameObject.display.removeChild( this.text );
    }

    update() {
        let scale = this.touch ? 1.1 : 1.0;

        this.display.scaleX = this.display.scaleY = ( this.display.scaleX + (scale - this.display.scaleX) * 0.25 );
    }

    // touch
    touchBegin = (e:egret.TouchEvent)=>{
        this.x = e.stageX;
        this.y = e.stageY;
        this.touch = true;
    }
    touchMove = (e:egret.TouchEvent) => {
        this.x = e.stageX;
        this.y = e.stageY;
        this.touch = true;
    }
    touchEnd = (e:egret.TouchEvent)=>{
        this.touch = false;
    }
}

