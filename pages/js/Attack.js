class Attack{

    static all_attack;

    constructor(id ,nom , charged_moves,fast_moves,elite_charged_moves,elite_fast_moves){
        this._id = id;
        this._nom = nom;
        this._charged_moves =charged_moves;
        this._fast_moves = fast_moves;
        this._elite_charged_moves = elite_charged_moves;
        this._elite_fast_moves = elite_fast_moves;
    }

    get id() {return this._id}
    get nom() {return this._nom}
    get charged_moves() {return this._charged_moves}
    get fast_moves() {return this._fast_moves}
    get elite_charged_moves() {return this._elite_charged_moves}
    get elite_fast_moves() {return this._elite_fast_moves}

    get all_attack(){return this.all_attack}

    set all_attack(all_attack){ this.all_attack = all_attack}

    toString(){
        return `id : ${this.id}\n
                nom : ${this.nom}\n
                charged_moves : ${this.charged_moves}\n
                fast_moves : ${this.fast_moves}\n
                elite_charged_moves : ${this.elite_charged_moves}\n
                elite_fast_moves : ${this.elite_fast_moves}\n`
    }
}
