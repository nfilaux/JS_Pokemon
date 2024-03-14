class Type{
    static all_types;

    constructor(nom, effectiveness){
        this._nom = nom;
        this._effectiveness = effectiveness;
    }

    get nom() {return this._nom}
    get type() {return this._nom}
    static get all_types(){return Type.all_types}
    static set all_types(all_t){Type.all_types = all_t}

    effectiveness(type){
        return this.effectiveness[type];
    }

    toString() {return `Type : ${this.nom}`}
}
