// Bound Ballz
// Liberapp 2019 - Tahiti Katagai

class Main extends eui.UILayer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private addToStage() {
        Util.init( this );
        GameObject.initial( this.stage );
        PhysicsObject.prepare( PIXEL_PER_METER );
        Game.loadSceneGamePlay();
        
        egret.startTick(this.tickLoop, this);
    }

    tickLoop(timeStamp:number):boolean{
        PhysicsObject.progress();
        GameObject.process();
        return false;
    }
}

