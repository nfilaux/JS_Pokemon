// Cette fonction prend en paramètre le nom d'un type de Pokémon et renvoie tous les Pokémon de ce type.
function getPokemonsByType(typeName) {
    // Crée un tableau vide pour stocker tous les Pokémon du type spécifié.
    let all_pokemons_type = [];
    // Parcourt tous les Pokémon disponibles.
    for (pok in Pokemon.all_pokemons) {
        // Parcourt tous les types de chaque Pokémon.
        for (type in Pokemon.all_pokemons[pok]._types) {
            // Vérifie si le nom du type correspond au type spécifié.
            if (Pokemon.all_pokemons[pok]._types[type].nom == typeName) {
                // Si c'est le cas, ajoute ce Pokémon à la liste des Pokémon du type spécifié.
                all_pokemons_type.push(Pokemon.all_pokemons[pok]);
            }
        }
    }
    // Renvoie la liste des Pokémon du type spécifié.
    return all_pokemons_type;
}

// Cette fonction prend en paramètre le nom d'une attaque et renvoie tous les Pokémon qui possèdent cette attaque.
function getPokemonsByAttack(attackName) {
    // Crée un tableau vide pour stocker tous les Pokémon qui possèdent l'attaque spécifiée.
    let all_pokemons_attack = [];
    // Parcourt tous les Pokémon disponibles.
    for (pok in Pokemon.all_pokemons) {
        // Parcourt toutes les attaques de chaque Pokémon.
        for (attack in Pokemon.all_pokemons[pok]._attacks) {
            // Vérifie si le nom de l'attaque correspond à l'attaque spécifiée.
            if (Pokemon.all_pokemons[pok]._attacks[attack].nom == attackName) {
                // Si c'est le cas, ajoute ce Pokémon à la liste des Pokémon possédant l'attaque spécifiée.
                all_pokemons_attack.push(Pokemon.all_pokemons[pok]);
            }
        }
    }
    // Renvoie la liste des Pokémon possédant l'attaque spécifiée.
    return all_pokemons_attack;
}


// Cette fonction prend en paramètre le nom d'un type d'attaque et renvoie toutes les attaques de ce type.
function getAttacksByType(typeName) {
    // Crée un tableau vide pour stocker toutes les attaques du type spécifié.
    let all_attack_by_type = [];
    // Parcourt toutes les attaques disponibles.
    for (current in Attack.all_attacks) {
        // Vérifie si le nom du type de l'attaque correspond au type spécifié.
        if (Attack.all_attacks[current].type.nom == typeName) {
            // Si c'est le cas, ajoute cette attaque à la liste des attaques du type spécifié.
            all_attack_by_type.push(Attack.all_attacks[current]);
        }
    }
    // Renvoie la liste des attaques du type spécifié.
    return all_attack_by_type;
}

// Cette fonction trie tous les Pokémon par leur nom en ordre alphabétique.
function sortPokemonByName() {
    // Crée un tableau vide pour stocker tous les Pokémon.
    let all_pokemons_sort = [];
    // Parcourt tous les Pokémon disponibles.
    for (pok in Pokemon.all_pokemons) {
        // Ajoute chaque Pokémon au tableau de tous les Pokémon à trier.
        all_pokemons_sort.push(Pokemon.all_pokemons[pok]);
    }
    // Trie les Pokémon par leur nom en utilisant la méthode sort() et une fonction de comparaison.
    all_pokemons_sort.sort(function (a, b) {
        // Convertit les noms des Pokémon en majuscules pour effectuer une comparaison insensible à la casse.
        var nomA = a._pokemon_name.toUpperCase();
        var nomB = b._pokemon_name.toUpperCase();
        // Compare les noms des Pokémon pour déterminer l'ordre de tri.
        return (nomA < nomB) ? -1 : (nomA > nomB) ? 1 : 0;
    });
    // Renvoie le tableau trié de tous les Pokémon.
    return all_pokemons_sort;
}


// Cette fonction trie tous les Pokémon par leur statistique de base de résistance (stamina) en ordre décroissant.
function sortPokemonByStamina() {
    // Crée un tableau vide pour stocker tous les Pokémon.
    let all_pokemons_sort = [];
    // Parcourt tous les Pokémon disponibles.
    for (pok in Pokemon.all_pokemons) {
        // Ajoute chaque Pokémon au tableau de tous les Pokémon à trier.
        all_pokemons_sort.push(Pokemon.all_pokemons[pok]);
    }
    // Trie les Pokémon par leur statistique de base de résistance (stamina) en utilisant la méthode sort() et une fonction de comparaison.
    all_pokemons_sort.sort(function (a, b) {
        // Compare les statistiques de base de résistance (stamina) des Pokémon pour déterminer l'ordre de tri.
        return (a._base_stamina > b._base_stamina) ? -1 : (a._base_stamina < b._base_stamina) ? 1 : 0;
    });
    // Renvoie le tableau trié de tous les Pokémon.
    return all_pokemons_sort;
}


// Cette fonction renvoie les ennemis les plus faibles d'une attaque donnée.
function getWeakestEnemies(attack) {
    // Recherche le type de l'attaque spécifiée.
    for (let current in Attack.all_attacks) {
        if (Attack.all_attacks[current].nom == attack) {
            var type_attack = Attack.all_attacks[current].type;
            break;
        }
    }

    // Si le type de l'attaque n'est pas trouvé, affiche un message d'erreur et renvoie un tableau vide.
    if (!type_attack) {
        console.error(`Aucun type trouvé pour l'attaque "${attack}".`);
        return [];
    }

    // Crée un tableau pour stocker les types les plus efficaces contre l'attaque.
    let tab_best_types = [];

    // Ajoute le type simple et les combinaisons de types.
    for (let type1 in Type.all_types) {
        tab_best_types.push({ 'type': [Type.all_types[type1].nom], 'effec': type_attack.effectiveness(Type.all_types[type1].nom) })
        for (let type2 in Type.all_types) {
            // Vérifie si les deux types sont différents et évite les doublons.
            if (type1 != type2 && type1 > type2) {
                tab_best_types.push({ 'type': [Type.all_types[type1].nom, Type.all_types[type2].nom], 'effec': type_attack.effectiveness(Type.all_types[type1].nom) * type_attack.effectiveness(Type.all_types[type2].nom) })
            }
        }
    }

    // Trie les types par efficacité décroissante.
    tab_best_types.sort(function (a, b) {
        return (a.effec > b.effec) ? -1 : (a.effec < b.effec) ? 1 : 0;
    });

    // Initialise un tableau pour stocker les meilleurs ennemis.
    var tab_best_ennemies = [];
    var old = {}
    var current = tab_best_types.shift()

    // Ajoute les ennemis les plus faibles jusqu'à ce que l'efficacité change.
    while (tab_best_ennemies.length == 0 || current.effec == old) {
        // Parcourt tous les Pokémon.
        for (let pok in Pokemon.all_pokemons) {
            // Stocke les types du Pokémon actuel.
            var tab_pok_types = []
            for (let pok_t of Pokemon.all_pokemons[pok].types) {
                tab_pok_types.push(pok_t.nom)
            }
            tab_pok_types = JSON.stringify(tab_pok_types)

            // Vérifie si les types du Pokémon correspondent à ceux du type actuel ou à leur ordre inversé.
            if (tab_pok_types == JSON.stringify(current.type) || tab_pok_types == JSON.stringify(current.type.reverse())) {
                // Ajoute le Pokémon à la liste des meilleurs ennemis.
                tab_best_ennemies.push(Pokemon.all_pokemons[pok]);
            }
        }
        // Met à jour l'ancienne efficacité et passe au prochain type.
        old = current.effec;
        current = tab_best_types.shift();
    }

    // Renvoie la liste des meilleurs ennemis.
    return tab_best_ennemies;
}

function getBestAttackTypesForEnemy(name) {
    // On parcourt tout les pokemons pour trouver celui avec notre nom
    for (let pok in Pokemon.all_pokemons) {
        if (Pokemon.all_pokemons[pok].pokemon_name == name) {
            var bon_pok = Pokemon.all_pokemons[pok];
            break;
        }
    }

    // On regarde le nombre de types du pokemon
    if (bon_pok.types.length > 1) {
        var longeur = 2;
    }
    else {
        var longeur = 1;
    }

    var tab_best_types = []

    // Parcours de tout le types pour les ajoutés dans un tableau avec leur effectiveness contre notre pokemon
    for (let attack in Type.all_types) {
        if (longeur == 1) {
            tab_best_types.push({ 'type_attack': Type.all_types[attack].nom, 'effec': Type.all_types[attack].effectiveness(bon_pok.types[0].nom) })
        }
        else {
            tab_best_types.push({ 'type_attack': Type.all_types[attack].nom, 'effec': Type.all_types[attack].effectiveness(bon_pok.types[0].nom) * Type.all_types[attack].effectiveness(bon_pok.types[1].nom) })
        }
    }

    // On trie notre tableau par effectiveness
    tab_best_types.sort(function (a, b) {
        return (a.effec > b.effec) ? -1 : (a.effec < b.effec) ? 1 : 0;
    });

    var tab_best_attacks = [];
    var old = {}
    var current = tab_best_types.shift()

    // On rempli notre tableau de retour avec les types avec les plus d'effectiveness
    while (tab_best_attacks.length == 0 || current.effec == old) {
        // Cherche le type dans all_types
        tab_best_attacks.push(Type.all_types[current.type_attack])
        // On passe au type suivant
        old = current.effec;
        current = tab_best_types.shift();
    }

    // Renvoie la liste des meilleurs types d'attaques
    return tab_best_attacks;
}
