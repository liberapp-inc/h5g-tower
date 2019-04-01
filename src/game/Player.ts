// Liberapp 2019 - Tahiti Katagai
// プレイヤーボール　重力落下

class Player extends GameObject{

    static I:Player = null;

    state:()=>void = this.stateNone;
    block:Block = null;

    constructor() {
        super();

        Player.I = this;
    }

    onDestroy(){
        Player.I = null;
    }

    update() {
        this.state();
    }

    stateNone(){}

    setStateHold(){
        this.state = this.stateHold;
        this.block = new Block( 0.5*Util.width, 0.2*Util.height, 0.2*Util.height, 0.1*Util.height );
    }
    stateHold(){
        
    }
    
    setStateRelease(){
        this.state = this.stateHold;
    }
    stateRelease() {

    }
}
