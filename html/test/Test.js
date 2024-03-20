function getPokemonsByType(typeName){
    all_pokemons_type = [];
    for (pok in Pokemon.all_pokemons){
        //console.log(Pokemon.all_pokemon[pok]._types);
        for(type in Pokemon.all_pokemons[pok]._types ){
            //console.log(Pokemon.all_pokemon[pok]._types[type].nom);
            if (Pokemon.all_pokemons[pok]._types[type].nom == typeName){
                all_pokemons_type.push(Pokemon.all_pokemons[pok]); 
            }
        }
    }
    return all_pokemons_type;
}

function getPokemonsByAttack(attackName){
    all_pokemons_attack = [];
    for (pok in Pokemon.all_pokemons){
        //console.log(Pokemon.all_pokemons[pok]._attacks);
        for(attack in Pokemon.all_pokemons[pok]._attacks){
            //console.log(Pokemon.all_pokemons[pok]._attacks[attack].nom);
            if (Pokemon.all_pokemons[pok]._attacks[attack].nom == attackName){
                all_pokemons_attack.push(Pokemon.all_pokemons[pok]); 
            }
        }
    }
    return all_pokemons_attack;
}

function sortPokemonByName(){
    all_pokemons_sort = [];
    for (pok in Pokemon.all_pokemons){
        //console.log(Pokemon.all_pokemons[pok]);

        for(sort in Pokemon.all_pokemons[pok]._pokemon_name){
            console.log(Pokemon.all_pokemons[pok]._pokemon_name);
            /*if (Pokemon.all_pokemons[pok]._pokemon_name == attackName){
                all_pokemons_attack.push(Pokemon.all_pokemons[pok]); 
            }*/
        }
    }
    
}
