function getPokemonsByType(typeName){
    import_pokemon();
    all_pokemon_type = [];
    for (pok in Pokemon.all_pokemon){
        //console.log(Pokemon.all_pokemon[pok]._types);
        for(type in Pokemon.all_pokemon[pok]._types ){
            //console.log(Pokemon.all_pokemon[pok]._types[type].nom);
            if (Pokemon.all_pokemon[pok]._types[type].nom == typeName){
                all_pokemon_type.push(Pokemon.all_pokemon[pok]); 
            }
        }
    }
    return all_pokemon_type;
}

function getPokemonsByAttack(attackName){
    import_pokemon();
    all_pokemon_attack = [];

    for (pok in Pokemon.all_pokemon){
        console.log(Pokemon.all_pokemon[pok]);
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
    
}