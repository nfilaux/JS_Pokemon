function getPokemonsByType(typeName){
    import_pokemon();
    all_pokemon_type = [];
    for (pok in Pokemon.all_pokemon){
        
        tab_pok = Pokemon.all_pokemon[pok];
        console.log(tab_pok.types);
        if (tab_pok._types == typeName){
            all_pokemon_type.push(Pokemon.toString());
        }
    }
    return all_pokemon_type;
}