// Liberapp 2019 - Tahiti Katagai
// プレイヤーボール　重力落下

class Player extends GameObject{

    static I:Player = null;
    state:()=>void = this.stateNone;

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
    }
    stateHold(){

    }
    
    setStateRelease(){
        this.state = this.stateHold;
    }
    stateRelease() {

    }
}
