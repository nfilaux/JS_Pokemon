class Type{
    static _all_types;

    constructor(nom, effectiveness){
        this._nom = nom;
        this._effectiveness = effectiveness;
    }

    get nom() {return this._nom}
    get type() {return this._nom}
    get effectiveness() {return this._effectiveness}

    static get all_types(){return Type._all_types}
    static set all_types(all_t){Type._all_types = all_t}

    effectiveness(type){
        return this._effectiveness[type];
    }

    toString() {return `Type : ${this.nom}`}
}
