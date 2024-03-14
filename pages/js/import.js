function import_pokemon(){
  let tab_types = [];
  let tab_nom_types = [];
  let tab_poke = [];
  let obj_type;


  for(let type in type_effectiveness){
    tab_nom_types.push(type);
  }

  for(let nom_type of tab_nom_types){
    obj_type = new Type(nom_type, type_effectiveness[nom_type]);
    tab_types.push(obj_type);
  }
  Type.all_types = tab_types;

  for(let pok of pokemon){

    if(pok.form == "Normal"){
      types = null;
      for(let poke_t of pokemon_types){
        if(poke_t.form == "Normal" && poke_t.pokemon_id == pok.pokemon_id){
          types = poke_t.type
        }
      }

      let imp_pokemon = new Pokemon(pok.pokemon_id,pok.pokemon_name,pok.base_defense,pok.base_attack,pok.base_stamina,type,"rmkmkb","oufrh","ejrf","uer");
      tab_poke.push({ pokemon_id:imp_pokemon});
    }
  }
  Pokemon.all_pokemon = tab_poke;

  console.log(Type.all_types);
  console.log(Pokemon.all_pokemon);

}
