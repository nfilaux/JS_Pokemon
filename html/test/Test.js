function getPokemonsByType(typeName){
    let all_pokemon_type = [];
    for (pok in Pokemon.all_pokemons){
        //console.log(Pokemon.all_pokemon[pok]._types);
        for(type in Pokemon.all_pokemons[pok]._types ){
            //console.log(Pokemon.all_pokemon[pok]._types[type].nom);
            if (Pokemon.all_pokemons[pok]._types[type].nom == typeName){
                all_pokemon_type.push(Pokemon.all_pokemons[pok]); 
            }
        }
    }
    return all_pokemon_type;
}

function getPokemonsByAttack(attackName){
    let all_pokemon_attack = [];

    for (pok in Pokemon.all_pokemons){
        /*for(type in Pokemon.all_pokemon[pok]._types ){
            //console.log(Pokemon.all_pokemon[pok]._types[type].nom);
            if (Pokemon.all_pokemon[pok]._types[type].nom == typeName){
                all_pokemon_attack.push(Pokemon.all_pokemon[pok]); 
            }
        }*/
    }
    return all_pokemon_attack;
}

function getAttacksByType(typeName){
    let all_attack_by_type = [];
    for(current in Attack.all_attacks){
        if(Attack.all_attacks[current].type.nom == typeName){
            all_attack_by_type.push(Attack.all_attacks[current]);
        }
    }
    return all_attack_by_type;
}


function getWeakestEnemies(attack){
    for(let current in Attack.all_attacks){
        if(Attack.all_attacks[current].nom == attack){
            var type_attack = Attack.all_attacks[current].type
        }
        break;
    }

    let tab_worst_types = []
    // ajout type simple
    for(let type in Type.all_types){
        tab_worst_types.push({'type': Type.all_types[type].nom , 'effec': type_attack.effectiveness(Type.all_types[type].nom)})
    }
    console.log(type_attack);


    return 0;
}

function getBestAttackTypesForEnemy(name){
    return 0;
}