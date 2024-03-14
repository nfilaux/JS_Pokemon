class Attack{

    static all_attack;

    constructor(id ,nom,duration,energy_delta,power,stamina_loss_scaler,type){
        this._id = id;
        this._nom =nom;
        this._duration =duration;
        this._energy_delta =energy_delta;
        this._power =power;
        this._stamina_loss_scaler =stamina_loss_scaler;
        this._type =type;

    }

    get id() {return this._id}
    get nom() {return this._nom}
    get duration() {return this._duration}
    get energy_delta() {return this._energy_delta}
    get power() {return this._power}
    get stamina_loss_scaler() {return this._stamina_loss_scaler}
    get type() {return this._type}

    static get all_attack(){return Attack.this.all_attack}

    static set all_attack(all_at){ Attack.all_attack = all_at}

    toString(){
        return `id : ${this.id}\n
                nom : ${this.nom}\n
                duration : ${this.duration}\n
                energy_delta : ${this.energy_delta}\n
                power : ${this.power}\n
                stamina_loss_scaler : ${this.stamina_loss_scaler}\n
                type : ${this.type}\n
                `
    }
}