// Liberapp 2019 Tahiti Katagai
// 物理エンジンp2オブジェクト

abstract class PhysicsObject extends GameObject {

    protected body: p2.Body;

    constructor() {
        super();
    }
/*
    init(){
        this.body = new p2.Body(this.options());
        this.addShapeToBody();
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    }

    abstract options() : any;

    addShapeToBody() {
        const shape = this.createShape();
        this.body.addShape(shape);
    }

    createShape() : p2.Shape {
        throw new Error("createShape or addShapeToBody must be implemented");
    }
*/
    onDestroy() {
        PhysicsObject.world.removeBody(this.body);
        this.body.displays = [];
        this.body = null;
    }

    update() {
        if( this.display ) {
            const body = this.body;
            const display = this.display;
            display.x = this.px;
            display.y = this.py;
            display.rotation = 360 - (body.angle + body.shapes[0].angle) * 180 / Math.PI;
        }
        this.fixedUpdate();
    }

    abstract fixedUpdate() : void;


    // system
    public  static world: p2.World;
    private static lastTime: number;

    private static pixelPerMeter: number;
    private static meterPerPixel: number;
    public  static width: number;    
    public  static height: number;

    static prepare( pixelPerMeter:number ){
        PhysicsObject.pixelPerMeter = pixelPerMeter;
        PhysicsObject.meterPerPixel = 1 / pixelPerMeter;
        PhysicsObject.width  = PhysicsObject.pixelToMeter(Util.width);
        PhysicsObject.height = PhysicsObject.pixelToMeter(Util.height);

        const world = new p2.World();
        world.sleepMode = p2.World.BODY_SLEEPING;
//      world.gravity = [0, -9.8];
        world.gravity = [0, Util.height * 0.03];
        PhysicsObject.world = world;
        PhysicsObject.lastTime = Date.now();
    }
    static progress(){
        const now = Date.now();
        const delta = now - this.lastTime;
        this.lastTime = now;
        PhysicsObject.world.step( 1/60, delta, 4 );
    }

    static pixelToMeter(pixel: number)  : number { return pixel * PhysicsObject.meterPerPixel; }
    static meterToPixel(meter: number)  : number { return meter * PhysicsObject.pixelPerMeter; }
    m2p(meter: number) : number { return PhysicsObject.meterToPixel(meter); }
    p2m(pixel: number) : number { return PhysicsObject.pixelToMeter(pixel); }
    get px():number { return this.m2p( this.mx ); }
    get py():number { return this.m2p( this.my ); }
    get mx():number { return this.body.position[0]; }
    get my():number { return this.body.position[1]; }
}
