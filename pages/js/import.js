function import_pokemon(){
    var i = 0;
    for(pokemon in pokemon){
      var pok = new Pokemon(pokemon_id,pokemon_name,base_defense,base_attack,base_stamina,types,charged_moves,fast_moves,elite_charged_moves,elite_fast_moves);
      console.log(pok.toString())
    }
}