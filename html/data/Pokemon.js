class Pokemon {
  // variable de classe stockant tout les pokemons
  static _all_pokemons;
	constructor (pokemon_id, pokemon_name, base_defense, base_attack, base_stamina, generation, types, attacks) {
		this._pokemon_id = pokemon_id
    this._pokemon_name = pokemon_name

    this._base_defense = base_defense
    this._base_attack = base_attack
    this._base_stamina = base_stamina
    this._generation = generation

    this._types = types
    // les attaques sont stockés sous la forme d'un tableau ex : [attack1, attack2, attack3, attack4]
    this._attacks = attacks
  }

  get pokemon_id() { return this._pokemon_id; }
  get pokemon_name() { return this._pokemon_name; }

  get base_defense() { return this._base_defense; }
  get base_attack() { return this._base_attack; }
  get base_stamina() { return this._base_stamina; }
  get generation() { return this._generation; }

  get types() { return this._types; }

  get attacks() { return this._attacks; }


  static get all_pokemons() { return Pokemon._all_pokemons }
  static set all_pokemons(all_poke) { Pokemon._all_pokemons = all_poke }

  toString() {
    return `[
    pokemon_id = ${this.pokemon_id},\n
    pokemon_name = ${this.pokemon_name},\n
    base_defense = ${this.base_defense},\n
    base_attack = ${this.base_attack},\n
    base_stamina = ${this.base_stamina},\n
    base_stamina = ${this.generation},\n
    types = [${this.types}],\n
    charged_moves = [${this.charged_moves}],\n
    fast_moves = [${this.fast_moves}],\n
    elite_charged_moves = [${this.elite_charged_moves}],\n
    elite_fast_moves = [${this.elite_fast_moves}]\n
  ]`;
  }

}
