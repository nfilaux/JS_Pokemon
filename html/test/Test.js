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
    let all_pokemons_sort = [];
    for (pok in Pokemon.all_pokemons){
        all_pokemons_sort.push(Pokemon.all_pokemons[pok]);
       
    }
    all_pokemons_sort.sort(function (a, b) {
        var nomA = a._pokemon_name.toUpperCase();
        var nomB = b._pokemon_name.toUpperCase();
        return (nomA < nomB) ? -1 : (nomA > nomB) ? 1 : 0;
    });
    console.log(all_pokemons_sort);
}
