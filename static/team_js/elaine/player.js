//player portion of game

class Player {
    set name(n) {
        this._name = n;
    }
    set health(h) {
        this._health = h;
    }
    set weapon(w) {
        this._weapon = w;
    }
    set level(l) {
        this._level = l;
    }
    //putting this in if we have different player sprites
    set type(t) {
        this._type = t;
    }

    get name() {
        return this._name;
    }
    get health() {
        return this._health;
    }
    get weapon() {
        return this._weapon;
    }
    get level() {
        return this._level;
    }
    get type() {
        return this._type;
    }

    constructor(n) {
        this.reset();
        this._name = n;
    }

    reset() {
        this._level = "1";
        this._type = "dude";
        this._weapon = "shotgun";
        this._health = "20";
    }

    getInfo() {
        if(parseInt(this._health)==0) {
            this._health = this._name + "You Died!";
            return this._health;
        }else{
            return(
                "Name:" + 
                this.name +
                "\n" +
                "Type:" +
                this.type +
                "\n" +
                "Weapon" +
                this.weapon +
                "\n" +
                "Health:" +
                "\n" +
                this.health +
                "\n"
            );
        }
    }


}
    let player1 = new.target('Karl');
    console.log(p1.reset());
    console.log(p1.getInfo());


