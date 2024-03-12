class Type{
    constructor(nom, effectiveness){
        this._nom = nom;
        this._effectiveness;
    }

    get nom() {return this._nom}
    get type() {return this._nom}

    effectiveness(type){
        return this.effectiveness[type];
    }

    toString() {return `Type : ${this.nom}`}
}



let date = JSON.parse(type_effectiveness);

t1 = new Type("Bug",);

console.log(data);
