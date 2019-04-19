// Liberapp 2019 - Tahiti Katagai
// 2Dカメラ

class Camera2D {

    static x:number = 0;
    static y:number = 0;
    static scale:number = 1;

    static initial(){
        Camera2D.x = 0;
        Camera2D.y = 0;
        Camera2D.scale = 1;
    }

    static transform( display:egret.DisplayObject, objScale:number=1 ){
        display.x = (display.x - Camera2D.x) * Camera2D.scale;
        display.y = (display.y - Camera2D.y) * Camera2D.scale;
        display.scaleX = display.scaleY = Camera2D.scale * objScale;
    }
}

