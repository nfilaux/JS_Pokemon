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

function getAttacksByType(typeName){
    let all_attack_by_type = [];
    for(current in Attack.all_attacks){
        if(Attack.all_attacks[current].type.nom == typeName){
            all_attack_by_type.push(Attack.all_attacks[current]);
        }
    }
    return all_attack_by_type;
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

function sortPokemonByStamina(){
    let all_pokemons_sort = [];
    for (pok in Pokemon.all_pokemons){
        all_pokemons_sort.push(Pokemon.all_pokemons[pok]);
       
    }
    all_pokemons_sort.sort(function (a, b) {
        return (a._base_stamina < b._base_stamina) ? -1 : (a._base_stamina > b._base_stamina) ? 1 : 0;
    });
    console.log(all_pokemons_sort);

}

function getWeakestEnemies(attack){


    for(let current in Attack.all_attacks){
        if(Attack.all_attacks[current].nom == attack){
            var type_attack = Attack.all_attacks[current].type
            break;
        }
    }
    let tab_best_types = []
    for(let type1 in Type.all_types){
        tab_best_types.push({'type': [Type.all_types[type1].nom] , 'effec': type_attack.effectiveness(Type.all_types[type1].nom)})
        for(let type2 in Type.all_types){
            if(type1 != type2 && type1 > type2){
                tab_best_types.push({'type': [Type.all_types[type1].nom, Type.all_types[type2].nom] , 'effec': type_attack.effectiveness(Type.all_types[type1].nom) * type_attack.effectiveness(Type.all_types[type2].nom)})
            }
        }
    }
    tab_best_types.sort(function (a, b) {
        return (a.effec > b.effec) ? -1 : (a.effec < b.effec) ? 1 : 0;
    });
    var tab_best_ennemies = [];
    var old = {}
    var current = tab_best_types.shift()
    while(tab_best_ennemies.length == 0 || current.effec == old){
        for(let pok in Pokemon.all_pokemons){
            var tab_pok_types = []
            for(let pok_t of Pokemon.all_pokemons[pok].types){
                tab_pok_types.push(pok_t.nom)
            }
            tab_pok_types = JSON.stringify(tab_pok_types)
            if(tab_pok_types == JSON.stringify(current.type) || tab_pok_types == JSON.stringify(current.type.reverse())){
                tab_best_ennemies.push(Pokemon.all_pokemons[pok]);
            }
        }
        old = current.effec;
        current = tab_best_types.shift();
    }
    return tab_best_ennemies;
}

function getBestAttackTypesForEnemy(name){
    for(let pok in Pokemon.all_pokemons){
        if(Pokemon.all_pokemons[pok].pokemon_name == name){
            var bon_pok = Pokemon.all_pokemons[pok];
            break;
        }
    }

    if(bon_pok.types.length > 1){
        var longeur = 2;
    }
    else{
        var longeur = 1;
    }

    var tab_best_types = []
    for(let attack in Type.all_types){
        if(longeur == 1){
            tab_best_types.push({'type attack': [Type.all_types[attack].nom] , 'effec': Type.all_types[attack].effectiveness(bon_pok.types[0].nom)})
        }
        else{
            tab_best_types.push({'type attack': [Type.all_types[attack].nom] , 'effec': Type.all_types[attack].effectiveness(bon_pok.types[0].nom) * Type.all_types[attack].effectiveness(bon_pok.types[1].nom)})
        }
    }

    tab_best_types.sort(function (a, b) {
        return (a.effec > b.effec) ? -1 : (a.effec < b.effec) ? 1 : 0;
    });

    
    var tab_best_ennemies = [];
    var old = {}
    var current = tab_best_types.shift()
    while(tab_best_ennemies.length == 0 || current.effec == old){
        for(let pok in Pokemon.all_pokemons){
            var tab_pok_types = []
            for(let pok_t of Pokemon.all_pokemons[pok].types){
                tab_pok_types.push(pok_t.nom)
            }
            tab_pok_types = JSON.stringify(tab_pok_types)
            if(tab_pok_types == JSON.stringify(current.type) || tab_pok_types == JSON.stringify(current.type.reverse())){
                tab_best_ennemies.push(Pokemon.all_pokemons[pok]);
            }
        }
        old = current.effec;
        current = tab_best_types.shift();
    }
    console.log(tab_best_types)

    return 0;
}