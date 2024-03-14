class List_pokemon{
    constructor (all_pokemon, all_types){
        this._all_pokemon = all_pokemon;
        this._all_types = all_types;
    }

    get all_pokemon(){return this._all_pokemon}
    toString() {return this.all_pokemon}
}

