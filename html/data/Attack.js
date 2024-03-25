class Attack {
    // variable de classe contenant toutes les attaques
    static _all_attacks;

    constructor(id, nom, duration, energy_delta, power, stamina_loss_scaler, type, critical_chance, form) {
        this._id = id;
        this._nom = nom;
        this._duration = duration;
        this._energy_delta = energy_delta;
        this._power = power;
        this._stamina_loss_scaler = stamina_loss_scaler;
        this._type = type;
        // la chance critique est de 0 si non renseignée
        this._critical_chance = critical_chance
        // indique si il s'agit d'une attaque rapide ou chargée
        this._form = form
    }

    get id() { return this._id }
    get nom() { return this._nom }
    get duration() { return this._duration }
    get energy_delta() { return this._energy_delta }
    get power() { return this._power }
    get stamina_loss_scaler() { return this._stamina_loss_scaler }
    get type() { return this._type }
    get critical_chance() { return this._critical_chance }
    get form() { return this._form }

    static get all_attacks() { return Attack._all_attacks }
    static set all_attacks(all_at) { Attack._all_attacks = all_at }

    toString() {
        return `id : ${this.id}\n
                nom : ${this.nom}\n
                duration : ${this.duration}\n
                energy_delta : ${this.energy_delta}\n
                power : ${this.power}\n
                stamina_loss_scaler : ${this.stamina_loss_scaler}\n
                critical_chance : ${this.critical_chance}\n
                form : ${this.form}\n
                `
    }
}