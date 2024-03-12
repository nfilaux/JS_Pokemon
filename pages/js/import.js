function import_pokemon(){
  for(let pok of pokemon){
  
    if(pok.form == "Normal"){
      var imp_pokemon = new Pokemon(pok.pokemon_id,pok.pokemon_name,pok.base_defense,pok.base_attack,pok.base_stamina,"jnvreu","rmkmkb","oufrh","ejrf","uer");
      //console.log(imp_pokemon.toString());
      var all_pok = new List_pokemon(imp_pokemon);
      console.log(all_pok.all_pokemon);
    }
    
  }
}

console.log(import_pokemon());