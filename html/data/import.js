function import_pokemon(){
  let tab_types = {};
  let tab_nom_types = [];

  let tab_poke = {};

  let tab_attak_c = {};
  let tab_id_attak_c = [];
  let tab_attak_f = {};
  let tab_id_attak_f = [];

  let obj_attak_c;
  let obj_attak_f;
  let obj_type;
  let imp_pokemon;

  // met dans un tableau tout les types
  for(let type in type_effectiveness){
    tab_nom_types.push(type);
  }

  for(let attack_c of charged_moves){
    tab_id_attak_c.push(attack_c);
  }

  for(let attack_f of fast_moves){
    tab_id_attak_f.push(attack_f);
  }

  // création de all_types
  for(let nom_type of tab_nom_types){
    obj_type = new Type(nom_type, type_effectiveness[nom_type]);
    tab_types[nom_type] = obj_type;
  }
  Type.all_types = tab_types;


  for(let attack_c of tab_id_attak_c){
    obj_attak_c = new Attack(attack_c.move_id, attack_c.name, attack_c.duration, attack_c.energy_delta, attack_c.power, attack_c.stamina_loss_scaler, Type.all_types[attack_c.type], attack_c.critical_chance || 0, "charged");
    tab_attak_c[attack_c.move_id] = obj_attak_c;
  }

  for(let attack_f of tab_id_attak_f){
    obj_attak_f = new Attack(attack_f.move_id, attack_f.name, attack_f.duration, attack_f.energy_delta, attack_f.power, attack_f.stamina_loss_scaler, Type.all_types[attack_f.type], 0, "fast");
    tab_attak_f[attack_f.move_id] = obj_attak_f;
  }
  Attack.all_attacks = Object.assign({}, tab_attak_f, tab_attak_c);


  for(let pok of pokemon){

    if(pok.form == "Normal"){
      types_raw = [];
      for(let poke_t of pokemon_types){
        if(poke_t.form == "Normal" && poke_t.pokemon_id == pok.pokemon_id){
          types_raw = poke_t.type
        }
      }

      types = []
      for(let t of types_raw){
        types.push(Type.all_types[t])
      }

      moves_raw = []
      for(let poke_m of pokemon_moves){
        if(poke_m.form == "Normal" && poke_m.pokemon_id == pok.pokemon_id){
          moves_raw.push(poke_m.charged_moves.concat(poke_m.elite_charged_moves, poke_m.fast_moves, poke_m.elite_fast_moves))
        }
      }

      moves = []
      for(let m of moves_raw){
        moves.push(Attack.all_attacks[m])
      }
      
      imp_pokemon = new Pokemon(pok.pokemon_id,pok.pokemon_name,pok.base_defense,pok.base_attack,pok.base_stamina,types,moves);
      tab_poke[pok.pokemon_id] = imp_pokemon;
    }
  }
  Pokemon.all_pokemon = tab_poke;
}
import_pokemon();