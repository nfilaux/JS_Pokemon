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

  for(let pok of pokemon){

    if(pok.form == "Normal"){
      let imp_pokemon = new Pokemon(pok.pokemon_id,pok.pokemon_name,pok.base_defense,pok.base_attack,pok.base_stamina,"aaa","rmkmkb","oufrh","ejrf","uer");
      tab_poke.push({ pokemon_id:imp_pokemon});
    }
  }
  var all_pok = new List_pokemon(tab_poke);
  console.log(all_pok);
  console.log(tab_types);

}