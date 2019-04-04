// Liberapp 2019 - Tahiti Katagai
// 汎用ボタン　１つ

class Button extends GameObject{

    text:egret.TextField = null;
    onTap:()=>void = null;

    press:boolean = false;
    release:boolean = false;
    prevTouch:boolean = false;
    touch:boolean = false;
    x:number = 0;
    y:number = 0;

    _touchBegin:(e:egret.TouchEvent)=>void  = (e: egret.TouchEvent) => { this.touchBegin(e) };
    _touchMove:(e:egret.TouchEvent)=>void   = (e: egret.TouchEvent) => { this.touchMove(e) };
    _touchEnd:(e:egret.TouchEvent)=>void    = (e: egret.TouchEvent) => { this.touchEnd(e) };

    constructor( text:string, fontsize:number, fontRGB:number, xRatio:number, yRatio:number, wRatio:number, hRatio:number, rgb:number, alpha:number, onTap:()=>void ) {
        super();

        if( text != null ){
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
        this.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchBegin, this);
        this.display.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchMove, this);
        this.display.addEventListener(egret.TouchEvent.TOUCH_END, this._touchEnd, this);
    }

    onDestroy(){
        if( this.onTap ) this.display.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchBegin, this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchMove, this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this._touchEnd, this);

        if( this.text ) GameObject.display.removeChild( this.text );
    }

    update() {
        this.press = false;
        this.release = false;

        if( this.touch ){
            this.display.scaleX = this.display.scaleY = ( this.display.scaleX + (1.1 - this.display.scaleX) * 0.25 );
            if( this.prevTouch == false ){
                this.press = true;
            }
        }
        else{
            this.display.scaleX = this.display.scaleY = ( this.display.scaleX + (1.0 - this.display.scaleX) * 0.25 );
            if( this.prevTouch ){
                this.release = true;
            }
        }

        this.prevTouch = this.touch;
        // this.touch = false;
    }

    // touch
    touchBegin(e:egret.TouchEvent){
        this.x = e.stageX;
        this.y = e.stageY;
        this.touch = true;
    }
    touchMove(e:egret.TouchEvent){
        this.x = e.stageX;
        this.y = e.stageY;
        this.touch =
            ( (this.display.width *0.5)**2 >= (e.stageX - this.display.x)**2 ) &&
            ( (this.display.height*0.5)**2 >= (e.stageY - this.display.y)**2 );
    }
    touchEnd(e:egret.TouchEvent){
        this.touch = false;
    }
}

