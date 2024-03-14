function import_pokemon(){
  for(let pok of pokemon){
  
    if(pok.form == "Normal"){
      for(let pok_move of pokemon_moves){
        if(pok_move.form == "Normal"){
          if(pok_move.pokemon_id == pok.pokemon_id){
            for(let pok_types of pokemon_types){
              if(pok_types.form == "Normal"){
                if(pok_types.pokemon_id == pok.pokemon_id){
                  var imp_pokemon = new Pokemon(pok.pokemon_id,pok.pokemon_name,pok.base_defense,pok.base_attack,pok.base_stamina,pok_types.type,pok_move.charged_moves,pok_move.fast_moves,pok_move.elite_charged_moves,pok_move.elite_fast_moves);
                  console.log(imp_pokemon.toString());
                  var all_pok = new List_pokemon(imp_pokemon);
                }
              }
            }
          }
        }
      }
    }
  }
}

console.log(import_pokemon());