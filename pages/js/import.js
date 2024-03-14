function import_pokemon(){
  let tab_types = {};
  let tab_nom_types = [];
  let tab_poke = {};
  let obj_type;

  let tab_attak_c = {};
  let tab_id_attak_c = [];
  let tab_attak_f = {};
  let tab_id_attak_f = [];
  let obj_attak_c;
  let obj_attak_f;

  // met dans un tableau tout les types
  for(let type in type_effectiveness){
    tab_nom_types.push(type);
  }

  for(let attack_c in charged_moves){
    tab_id_attak_c.push(attack_c);
  }

  // création de all_types
  for(let nom_type of tab_nom_types){
    obj_type = new Type(nom_type, type_effectiveness[nom_type]);
    tab_types[nom_type] = obj_type;
  }
  Type.all_types = tab_types;

  for(let attack_c in tab_id_attak_c){
    obj_attak_c = new Attack(attack_c.move_id,tab_id_attak_c[attack_c.name,attack_c.duration,attack_c.energy_delta,attack_c.power,attack_c.stamina_loss_scaler,attack_c.type]);
    tab_attak_c[attack_c.move_id] = obj_attak_c;
  }

  for(let pok of pokemon){

    if(pok.form == "Normal"){
      types_raw = null;
      for(let poke_t of pokemon_types){
        if(poke_t.form == "Normal" && poke_t.pokemon_id == pok.pokemon_id){
          types_raw = poke_t.type
        }
      }
      types = []
      for(let t of types_raw){
        types.push(Type.all_types[t])
      }
      let imp_pokemon = new Pokemon(pok.pokemon_id,pok.pokemon_name,pok.base_defense,pok.base_attack,pok.base_stamina,types,"rmkmkb","oufrh","ejrf","uer");
      //tab_poke.push({ pokemon_id:imp_pokemon});
      tab_poke[pok.pokemon_id] = imp_pokemon;
    }
  }
  Pokemon.all_pokemon = tab_poke;
}
import_pokemon()