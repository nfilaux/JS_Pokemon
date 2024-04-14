/*
● identifiant unique
● nom
● génération
● types (liste des noms des types du Pokémon)
● endurance (stamina)
● points d’attaque de base
● points de défense de base
● image (en taille miniature, adaptée à la hauteur des autres champs
d’information)
*/


// copie de tous les pokemons
var objet_pokemons_sort = Object.assign(Pokemon.all_pokemons);


var body_table = document.getElementById('pokemonBody')
var debut = 0;
var poke;
function tablePrec() {

    let t_poke_prec = 0;
    while (t_poke_prec < 25 && debut > 0) {
        if ((objet_pokemons_sort[debut] != undefined && objet_pokemons_sort[debut] != null) &&
            (objet_pokemons_sort[debut].generation == filtreGen.selectedOptions[0].value || filtreGen.selectedOptions[0].value == "0") &&
            (objet_pokemons_sort[debut].pokemon_name.toUpperCase().includes(filtreNom.value.toUpperCase()) || filtreNom.value == "") &&
            (filtreType.selectedOptions[0].value == "0" || objet_pokemons_sort[debut].types[0].nom == filtreType.selectedOptions[0].value ||
                (objet_pokemons_sort[debut].types[1] != undefined && objet_pokemons_sort[debut].types[1].nom == filtreType.selectedOptions[0].value))) {
            t_poke_prec++;
        }
        debut--;
    }
    // reset tableau
    body_table.innerHTML = "";
    chargeTable();
    ajoutListenerPourPopup();
    PrepImages();
    responsiveThead();
}

function TableSuiv() {
    debut = poke;
    // reset tableau
    body_table.innerHTML = "";
    chargeTable();
    ajoutListenerPourPopup();
    PrepImages();
    responsiveThead();
}

function chargeTable() {
    var keys = Object.keys(objet_pokemons_sort);
    var total = 0
    poke = debut;
    while (total < 25 && poke <= keys[keys.length - 1]) {
        if (objet_pokemons_sort[poke] != undefined && objet_pokemons_sort[poke] != null) {
            if ((objet_pokemons_sort[poke].generation == filtreGen.selectedOptions[0].value || filtreGen.selectedOptions[0].value == "0") &&
                (objet_pokemons_sort[poke].pokemon_name.toUpperCase().includes(filtreNom.value.toUpperCase()) || filtreNom.value == "") &&
                (filtreType.selectedOptions[0].value == "0" || objet_pokemons_sort[poke].types[0].nom == filtreType.selectedOptions[0].value ||
                    (objet_pokemons_sort[poke].types[1] != undefined && objet_pokemons_sort[poke].types[1].nom == filtreType.selectedOptions[0].value))) {

                total++;
                // création de la ligne
                let ligne = document.createElement('tr')
                body_table.appendChild(ligne)

                // création colonne id
                let id = document.createElement('td')
                id.textContent = objet_pokemons_sort[poke].pokemon_id
                ligne.appendChild(id)

                // création colonne nom
                let nom = document.createElement('td')
                nom.textContent = objet_pokemons_sort[poke].pokemon_name
                ligne.appendChild(nom)

                // création colonne generation
                let gen = document.createElement('td')
                gen.textContent = objet_pokemons_sort[poke].generation
                ligne.appendChild(gen)

                // création colonne types
                let types = document.createElement('td')
                if (objet_pokemons_sort[poke].types.length === 1) {
                    types.textContent = objet_pokemons_sort[poke].types[0].nom
                }
                else {
                    types.textContent = `${objet_pokemons_sort[poke].types[0].nom} / ${objet_pokemons_sort[poke].types[1].nom}`
                }
                ligne.appendChild(types)

                // création colonne stamina
                let stam = document.createElement('td')
                stam.textContent = objet_pokemons_sort[poke].base_stamina
                ligne.appendChild(stam)

                // création colonne attack
                let atk = document.createElement('td')
                atk.textContent = objet_pokemons_sort[poke].base_attack
                ligne.appendChild(atk)

                // création colonne defense
                let def = document.createElement('td')
                def.textContent = objet_pokemons_sort[poke].base_defense
                ligne.appendChild(def)

                // création colonne spite
                let img = document.createElement('td')
                let sprite = document.createElement('img')
                let img_url = String(objet_pokemons_sort[poke].pokemon_id)
                while (img_url.length < 3) {
                    img_url = '0' + img_url
                }
                if (objet_pokemons_sort[poke].generation <= 7) {
                    img_url = img_url + 'MS'
                }

                sprite.src = `../webp/sprites/${img_url}.webp`
                img.appendChild(sprite)
                ligne.appendChild(img)
                // poke suivant
            }
        }
        poke++;
    }
    desactiveBouton();
}

// appel de la fonction quand la page est load
window.addEventListener("load", function () {
    chargeTable();
});

//test pour les bouton
function desactiveBouton() {
    var keys = Object.keys(objet_pokemons_sort);
    if (debut <= 0) {
        document.getElementById("btn-prec").disabled = true;
    } else {
        document.getElementById("btn-prec").disabled = false;
    }
    if (keys[keys.length - 1] <= poke) {
        document.getElementById("btn-suiv").disabled = true;
    } else {
        document.getElementById("btn-suiv").disabled = false;
    }
}


//redirige en haut de tableau
const button_p = document.getElementById("btn-prec");
const button_s = document.getElementById("btn-suiv");
const debut_tab = document.getElementById("pokemonContainer");

button_s.addEventListener("click", function () {
    debut_tab.scrollIntoView();
});
button_p.addEventListener("click", function () {
    debut_tab.scrollIntoView();
});

//--------------------------------------------------------------------------------------

//details
window.addEventListener("load", function () {
    const popup = document.getElementById("popup");

    // responsive
    responsiveThead();

    popup.addEventListener('mouseenter', function () {
        document.body.style.overflow = 'hidden';
    });

    popup.addEventListener('mouseleave', function () {
        document.body.style.overflow = 'auto';
    });

    document.addEventListener('click', function (event) {
        if (!popup.contains(event.target) && !event.target.closest('#pokemonBody')) {
            popup.style.display = 'none';
        }
    });

    // Écouteurs d'événements pour chaque élément de la liste de Pokémon
    ajoutListenerPourPopup();

    // image 
    PrepImages();
});

// pour le responsive
function responsiveThead() {
    document.querySelectorAll('.pokemonTable').forEach(function (table) {
        let labels = Array.from(table.querySelectorAll('th')).map(function (th) {
            return th.innerText;
        })
        table.querySelectorAll('td').forEach(function (td, i) {
            td.setAttribute('data-label', labels[i % labels.length])
        })
    })

}

function ajoutListenerPourPopup() {

    var pokemonList = document.getElementById("pokemonBody").getElementsByTagName("tr");
    for (let i = 0; i < pokemonList.length; i++) {

        pokemonList[i].addEventListener("click", function (event) {
            const pok_id = pokemonList[i].cells[0].textContent; // Récupérer le id du Pokémon depuis la premiere cellule
            showPopup(pok_id);
        });
    }
}

// preparation images
function PrepImages() {
    var pokemonImages = document.querySelectorAll('#pokemonBody img');
    pokemonImages.forEach(image => {
        var popup = document.getElementById("popupimg");
        var thumbnails = document.createElement('img');

        image.addEventListener('mouseover', function (event) {
            // Enlever le "MS" du nom de fichier
            var nomFichierSansMS = image.src.replace("MS", "");

            // Remplacer "sprites" par "thumbnails"
            var nomFichierModifie = nomFichierSansMS.replace("sprites", "thumbnails");

            popup.style.display = "block";

            // Définition des attributs de l'image
            thumbnails.setAttribute('src', nomFichierModifie);

            // Positionner la popup près du curseur de la souris
            var mouseX = event.clientX;
            var mouseY = event.clientY;
            var offset = 10; // Décalage de la popup par rapport au curseur

            // Calculer la position verticale de la popup en tenant compte de l'espace disponible
            var popupTop = mouseY + scrollY + offset;

            // Calculer la position horizontale de la popup en tenant compte de l'espace disponible
            var popupLeft = mouseX + scrollX + offset;
            var popupWidth = popup.offsetWidth;
            var windowWidth = window.innerWidth;

            // Si la popup dépasse à droite de la fenêtre, la placer à gauche du curseur
            if (popupLeft + popupWidth > windowWidth) {
                popupLeft = mouseX + scrollX - popupWidth - offset;
            }

            popup.style.left = popupLeft + 'px';
            popup.style.top = popupTop + 'px';

            popup.appendChild(thumbnails);

        });

        image.addEventListener('mouseout', function () {
            popup.style.display = "none";
            popup.removeChild(thumbnails); // Suppression de l'image du popup
        });
    });
}

// Fonction pour afficher la fenêtre contextuelle avec les détails du Pokémon
function showPopup(pok_id) {

    // Effacer le contenu de la popup lorsque la popup est fermée
    popup.innerHTML = '';

    popup.style.display = "block";
    let div = document.createElement('div');

    // Créer l'élément image
    let image = document.createElement('img');
    let type1 = document.createElement('img');
    let type2 = document.createElement('img');
    let img_url = String(Pokemon.all_pokemons[pok_id].pokemon_id);
    while (img_url.length < 3) {
        img_url = '0' + img_url;
    }
    image.src = `../webp/thumbnails/${img_url}.webp`;
    div.appendChild(image);

    let description = document.createElement('div');
    var id = document.createElement('h4');
    var id_text = String(Pokemon.all_pokemons[pok_id].pokemon_id);
    while (id_text.length < 3) {
        id_text = '0' + id_text;
    }
    id.appendChild(document.createTextNode("#" + id_text));
    popup.appendChild(id);
    id.classList.add("id");
    // Créer l'élément nom
    var nom = document.createElement('h4');
    nom.appendChild(document.createTextNode(Pokemon.all_pokemons[pok_id].pokemon_name));
    description.appendChild(nom);
    nom.id = "nom";

    // Créer l'élément type
    let info_type = document.createElement('div');
    let types = document.createElement('p')
    let types2 = document.createElement('p')
    if (Pokemon.all_pokemons[pok_id].types.length === 1) {
        types.textContent = Pokemon.all_pokemons[pok_id].types[0].nom
        type1.src = `../css/images/${Pokemon.all_pokemons[pok_id].types[0].nom}.ico`
        info_type.appendChild(type1)
        info_type.appendChild(types)
    }
    else {
        type1.src = `../css/images/${Pokemon.all_pokemons[pok_id].types[0].nom}.ico`
        types.textContent = `${Pokemon.all_pokemons[pok_id].types[0].nom} / `
        type2.src = `../css/images/${Pokemon.all_pokemons[pok_id].types[1].nom}.ico`
        types2.textContent = `${Pokemon.all_pokemons[pok_id].types[1].nom}`
        info_type.appendChild(type1)
        info_type.appendChild(types)
        info_type.appendChild(type2)
        info_type.appendChild(types2)
    }
    description.appendChild(info_type)

    changeColor(Pokemon.all_pokemons[pok_id].types[0].nom, popup)

    // Créer l'élément generation 
    var info_gen = document.createElement('p');
    info_gen.appendChild(document.createTextNode("Generation : " + Pokemon.all_pokemons[pok_id]._generation));
    description.appendChild(info_gen);

    div.appendChild(description);
    description.classList.add("description");
    popup.appendChild(div)
    div.classList.add("info");

    // Créer l'élément base atk, def et stam
    let info_base = document.createElement('div');
    let atkhover = document.createElement('div');
    var info_e = document.createElement('p');
    var info_a = document.createElement('p');
    var info_d = document.createElement('p');
    info_e.appendChild(document.createTextNode("Endurance - " + Pokemon.all_pokemons[pok_id].base_stamina));
    info_a.appendChild(document.createTextNode("Attaque -  " + Pokemon.all_pokemons[pok_id].base_attack));
    info_d.appendChild(document.createTextNode("Défense - " + Pokemon.all_pokemons[pok_id].base_defense));
    info_base.appendChild(info_e);
    info_base.appendChild(info_a);
    info_base.appendChild(info_d);

    info_base.classList.add("base");
    popup.appendChild(info_base);

    // Créer l'élément liste atk 
    var info_atk = document.createElement('div')
    var div_c = document.createElement('div')
    var div_f = document.createElement('div')
    let atk_c = document.createElement('ul');
    let atk_f = document.createElement('ul');

    var charged = document.createElement('h4');
    charged.textContent = "CHARGED MOVES"
    div_c.appendChild(charged)

    var fast = document.createElement('h4');
    fast.textContent = "FAST MOVES"
    div_f.appendChild(fast)


    for (let i = 0; i < Pokemon.all_pokemons[pok_id].attacks.length; i++) {
        let attackName = Pokemon.all_pokemons[pok_id].attacks[i].nom;

        // Créez un nouvel élément p pour chaque attaque
        let attackElement = document.createElement('li');
        let attackElementList = document.createElement('div');
        let attackType = document.createElement('div');
        let Nomtype = document.createElement('p');
        attackElement.textContent = attackName;
        let attackDuration = document.createElement('p');
        let attackPower = document.createElement('p');
        let attackCrit = document.createElement('p');
        let attackEnergieDelta = document.createElement('p');
        let attackStamLoss = document.createElement('p');

        attackElementList.style.display = 'none';

        let type_atk = document.createElement('img');
        type_atk.src = `../css/images/${Pokemon.all_pokemons[pok_id].attacks[i].type.nom}.ico`
        Nomtype.textContent = Pokemon.all_pokemons[pok_id].attacks[i].type.nom;
        attackType.appendChild(type_atk);
        attackType.appendChild(Nomtype);
        attackPower.textContent = "Power : " + Pokemon.all_pokemons[pok_id].attacks[i].power;
        attackDuration.textContent = "Duration : " + Pokemon.all_pokemons[pok_id].attacks[i].duration;
        attackCrit.textContent = "Critical Chance : " + Pokemon.all_pokemons[pok_id].attacks[i].critical_chance;
        attackEnergieDelta.textContent = "Energy Delta : " + Pokemon.all_pokemons[pok_id].attacks[i].energy_delta;
        attackStamLoss.textContent = "Stamina loss Scaler : " + Pokemon.all_pokemons[pok_id].attacks[i].stamina_loss_scaler;

        if (Pokemon.all_pokemons[pok_id].attacks[i].form === "charged") {
            atk_c.appendChild(attackElement);
            attackElementList.appendChild(attackType);
            attackElementList.appendChild(attackPower);
            attackElementList.appendChild(attackDuration);
            attackElementList.appendChild(attackCrit);
            attackElementList.appendChild(attackEnergieDelta);
            attackElementList.appendChild(attackStamLoss);
            attackElementList.appendChild(atkhover);
            atk_c.appendChild(attackElementList);
        } else {
            atk_f.appendChild(attackElement);
            attackElementList.appendChild(attackType);
            attackElementList.appendChild(attackPower);
            attackElementList.appendChild(attackDuration);
            attackElementList.appendChild(attackCrit);
            attackElementList.appendChild(attackEnergieDelta);
            attackElementList.appendChild(attackStamLoss);
            attackElementList.appendChild(atkhover);
            atk_f.appendChild(attackElementList);
        }

        attackElement.addEventListener('click', function (event) {
            if (attackElementList.style.display === 'block') {
                attackElementList.style.display = 'none';
            } else {
                attackElementList.style.display = 'block';
            }
        });

    }


    info_atk.classList.add("atk");
    // Ajoutez les éléments atk_c et atk_f une seule fois après la boucle
    div_c.appendChild(atk_c);
    div_f.appendChild(atk_f);
    info_atk.appendChild(div_c);
    info_atk.appendChild(div_f);
    popup.appendChild(info_atk);

    let croix = document.createElement('img');
    croix.src = "../css/images/croix.png";
    croix.id = "croix";
    popup.appendChild(croix);

    croix.addEventListener('click', function (event) {
        popup.style.display = 'none';
    });
}

//changement de couleur

function changeColor(type, elem) {
    var colorB;
    var text;
    switch (type) {
        case 'Rock':
            text = '#fff';
            colorB = '#ba6';
            break;
        case 'Ground':
            text = '#fff';
            colorB = '#D2B48C';
            break;
        case 'Fire':
            text = '#fff';
            colorB = '#d35d0f';
            break;
        case 'Water':
            text = '#fff';
            colorB = '#39f';
            break;
        case 'Psychic':
            text = '#fff';
            colorB = '#f59';
            break;
        case 'Electric':
            text = '#000';
            colorB = '#ff9110';
            break;
        case 'Steel':
            text = '#000';
            colorB = '#aab';
            break;
        case 'Normal':
            text = '#000';
            colorB = '#aa9';
            break;
        case 'Flying':
            text = '#000';
            colorB = '#89f';
            break;
        case 'Ice':
            text = '#000';
            colorB = '#6cf';
            break;
        case 'Poison':
            text = '#fff';
            colorB = '#a59';
            break;
        case 'Ghost':
            text = '#fff';
            colorB = '#66b';
            break;
        case 'Grass':
            colorB = '#0d5';
            text = '#000';
            break;
        case 'Fighting':
            colorB = '#b54';
            text = '#fff';
            break;
        case 'Fairy':
            text = '#000';
            colorB = '#e9e';
            break;
        case 'Bug':
            text = '#000';
            colorB = '#7c5';
            break;
        case 'Dragon':
            text = '#fff';
            colorB = '#76e';
            break;
        case 'Dark':
            text = '#fff';
            colorB = '#754';
            break;
        default:
            colorB = '#FFFFFF';
            text = '#000';
            break;
    }
    elem.style.color = text;
    elem.style.backgroundColor = colorB;
}

/* -------------------- filtres ----------------------*/

// recupere les input de nos filtres
var filtreGen = document.getElementById('genF');
var filtreType = document.getElementById('typeF');
var filtreNom = document.getElementById('nomF');

// ajout des différents choix dans les select

const generations = new Set();
const types = new Set();

for (let objet_poke in objet_pokemons_sort) {
    generations.add(objet_pokemons_sort[objet_poke].generation);
    for (let type of objet_pokemons_sort[objet_poke].types) {
        types.add(type.nom);
    }
}

// ajout des options dans le select generation
for (const generation of generations) {
    // créé une nouvelle option
    const optionGen = document.createElement("option");
    // definit la valeur de l'option
    optionGen.value = generation;
    // definit le texte de l'option
    optionGen.textContent = generation;
    // ajoute l'option au select genF
    filtreGen.appendChild(optionGen);
}

// ajout des options dans le select type
for (const type of types) {
    // créé une nouvelle option
    const optionType = document.createElement("option");
    // definit la valeur de l'option
    optionType.value = type;
    // definit le texte de l'option
    optionType.textContent = type;
    // definit l'option au select typeF
    filtreType.appendChild(optionType);
}

// ajout des listeners pour les filtres
filtreGen.addEventListener("change", function () {
    // reset tableau
    body_table.innerHTML = "";
    //reset debut
    debut = 0;
    chargeTable();
    ajoutListenerPourPopup();
    PrepImages();
    responsiveThead();
});
filtreType.addEventListener("change", function () {
    // reset tableau
    body_table.innerHTML = "";
    //reset debut
    debut = 0;
    chargeTable();
    ajoutListenerPourPopup();
    PrepImages();
    responsiveThead();
});
filtreNom.addEventListener("input", function () {
    // reset tableau
    body_table.innerHTML = "";
    //reset debut
    debut = 0;
    chargeTable();
    ajoutListenerPourPopup();
    PrepImages();
    responsiveThead();
});



/* --------------------------------- TRIS ---------------------------- */

var thead = document.querySelector('thead');
thead.classList.add('v5thead');

// dictionnaire pour connaitre chaque trie en cours
var status_tri = {
    "idC": 0,
    "nomC": 0,
    "genC": 0,
    "typesC": 0,
    "enduC": 0,
    "atkC": 0,
    "defC": 0
}

for (let propriete in status_tri) {
    status_tri[propriete] = 0;
}
// recupere les titres de colonnes (dans le thhead) pour le tri
var idC = document.getElementById('idC');
var nomC = document.getElementById('nomC');
var genC = document.getElementById('genC');
var typesC = document.getElementById('typesC');
var enduC = document.getElementById('enduC');
var atkC = document.getElementById('atkC');
var defC = document.getElementById('defC');

// ajoute un ecouteur d'evenements "click" a chaque variable
idC.addEventListener("click", () => triParColonne("idC"));
nomC.addEventListener("click", () => triParColonne("nomC"));
genC.addEventListener("click", () => triParColonne("genC"));
typesC.addEventListener("click", () => triParColonne("typesC"));
enduC.addEventListener("click", () => triParColonne("enduC"));
atkC.addEventListener("click", () => triParColonne("atkC"));
defC.addEventListener("click", () => triParColonne("defC"));


function triParColonne(colonne) {
    let all_pokemons_sort = [];
    for (let pok in Pokemon.all_pokemons) {
        // Ajoute chaque Pokémon au tableau de tous les Pokémon à trier.
        all_pokemons_sort.push(Pokemon.all_pokemons[pok]);
    }

    // trie par nom en cas d'égalité de valeur
    all_pokemons_sort.sort(function (a, b) {
        let nomA = a.pokemon_name;
        let nomB = b.pokemon_name;
        // Compare les noms des Pokémon pour déterminer l'ordre de tri.
        return (nomA < nomB) ? -1 : (nomA > nomB) ? 1 : 0;
    });

    switch (colonne) {
        case "idC":


            all_pokemons_sort.sort(function (a, b) {
                let idA = a.pokemon_id;
                let idB = b.pokemon_id;
                if (status_tri.idC === 0 || status_tri.idC === 2) {
                    // Compare les id des Pokémons pour déterminer l'ordre de tri.
                    return (idA < idB) ? -1 : (idA > idB) ? 1 : 0;
                } else {
                    return (idA > idB) ? -1 : (idA < idB) ? 1 : 0;
                }
            });
            if (status_tri.idC === 0 || status_tri.idC === 2) {
                for (let propriete in status_tri) {
                    status_tri[propriete] = 0;
                    document.getElementById(propriete).style.fontWeight = "normal";
                    document.getElementById(propriete).style.backgroundColor = "#2253be";
                }
                status_tri.idC = 1;
            } else {
                for (let propriete in status_tri) {
                    status_tri[propriete] = 0;
                    document.getElementById(propriete).style.fontWeight = "normal";
                    document.getElementById(propriete).style.backgroundColor = "#2253be";
                }
                status_tri.idC = 2;
            }
            idC.style.fontWeight = "bolder";
            idC.style.backgroundColor = "#112a60";
            break;


        case "nomC":


            if (status_tri.nomC === 1) {
                all_pokemons_sort.sort(function (a, b) {
                    let nomA = a.pokemon_name
                    let nomB = b.pokemon_name
                    // Compare les noms des Pokémon pour déterminer l'ordre de tri.
                    return (nomA > nomB) ? -1 : (nomA < nomB) ? 1 : 0;
                });
                for (let propriete in status_tri) {
                    document.getElementById(propriete).style.fontWeight = "normal";
                    document.getElementById(propriete).style.backgroundColor = "#2253be";
                    status_tri[propriete] = 0;
                }
                status_tri.nomC = 2;
            } else {
                for (let propriete in status_tri) {
                    document.getElementById(propriete).style.fontWeight = "normal";
                    document.getElementById(propriete).style.backgroundColor = "#2253be";
                    status_tri[propriete] = 0;
                }
                status_tri.nomC = 1;
            }
            nomC.style.fontWeight = "bolder";
            nomC.style.backgroundColor = "#112a60";
            break;


        case "genC":

            all_pokemons_sort.sort(function (a, b) {

                let genA = a.generation;
                let genB = b.generation;
                if (status_tri.genC === 0 || status_tri.genC === 2) {
                    // Compare les generations des Pokémons pour déterminer l'ordre de tri.
                    return (genA < genB) ? -1 : (genA > genB) ? 1 : 0;
                } else {
                    return (genA > genB) ? -1 : (genA < genB) ? 1 : 0;
                }
            });
            if (status_tri.genC === 0 || status_tri.genC === 2) {
                for (let propriete in status_tri) {
                    document.getElementById(propriete).style.fontWeight = "normal";
                    document.getElementById(propriete).style.backgroundColor = "#2253be";
                    status_tri[propriete] = 0;
                }
                status_tri.genC = 1;
            } else {
                for (let propriete in status_tri) {
                    document.getElementById(propriete).style.fontWeight = "normal";
                    document.getElementById(propriete).style.backgroundColor = "#2253be";
                    status_tri[propriete] = 0;
                }
                status_tri.genC = 2;
            }
            genC.style.fontWeight = "bolder";
            genC.style.backgroundColor = "#112a60";
            break;


        case "typesC":

            all_pokemons_sort.sort(function (a, b) {
                if (a.types.length === 1) {
                    var typeA = a.types[0].nom;
                } else {
                    var typeA = a.types[0].nom + a.types[1].nom;
                }

                if (b.types.length === 1) {
                    var typeB = b.types[0].nom;
                } else {
                    var typeB = b.types[0].nom + b.types[1].nom;
                }
                if (status_tri.typesC === 0 || status_tri.typesC === 2) {
                    // Compare les types des Pokémons pour déterminer l'ordre de tri.
                    return (typeA < typeB) ? -1 : (typeA > typeB) ? 1 : 0;
                } else {
                    return (typeA > typeB) ? -1 : (typeA < typeB) ? 1 : 0;
                }
            });
            if (status_tri.typesC === 0 || status_tri.typesC === 2) {
                for (let propriete in status_tri) {
                    document.getElementById(propriete).style.fontWeight = "normal";
                    document.getElementById(propriete).style.backgroundColor = "#2253be";
                    status_tri[propriete] = 0;
                }
                status_tri.typesC = 1;
            } else {
                for (let propriete in status_tri) {
                    document.getElementById(propriete).style.fontWeight = "normal";
                    document.getElementById(propriete).style.backgroundColor = "#2253be";
                    status_tri[propriete] = 0;
                }
                status_tri.typesC = 2;
            }
            typesC.style.fontWeight = "bolder";
            typesC.style.backgroundColor = "#112a60";
            break;


        case "enduC":

            all_pokemons_sort.sort(function (a, b) {
                let enduA = a.base_stamina;
                let enduB = b.base_stamina;
                if (status_tri.enduC === 0 || status_tri.enduC === 2) {
                    // Compare l'endurance des Pokémons pour déterminer l'ordre de tri.
                    return (enduA < enduB) ? -1 : (enduA > enduB) ? 1 : 0;
                } else {
                    return (enduA > enduB) ? -1 : (enduA < enduB) ? 1 : 0;
                }
            });
            if (status_tri.enduC === 0 || status_tri.enduC === 2) {
                for (let propriete in status_tri) {
                    document.getElementById(propriete).style.fontWeight = "normal";
                    document.getElementById(propriete).style.backgroundColor = "#2253be";
                    status_tri[propriete] = 0;
                }
                status_tri.enduC = 1;
            } else {
                for (let propriete in status_tri) {
                    document.getElementById(propriete).style.fontWeight = "normal";
                    document.getElementById(propriete).style.backgroundColor = "#2253be";
                    status_tri[propriete] = 0;
                }
                status_tri.enduC = 2;
            }
            enduC.style.fontWeight = "bolder";
            enduC.style.backgroundColor = "#112a60";
            break;


        case "atkC":

            all_pokemons_sort.sort(function (a, b) {
                // Convertit les noms des Pokémon en majuscules pour effectuer une comparaison insensible à la casse.
                let atkA = a.base_attack;
                let atkB = b.base_attack;
                if (status_tri.atkC === 0 || status_tri.atkC === 2) {
                    // Compare l'attaque des Pokémons pour déterminer l'ordre de tri.
                    return (atkA < atkB) ? -1 : (atkA > atkB) ? 1 : 0;
                } else {
                    return (atkA > atkB) ? -1 : (atkA < atkB) ? 1 : 0;
                }
            });
            if (status_tri.atkC === 0 || status_tri.atkC === 2) {
                for (let propriete in status_tri) {
                    document.getElementById(propriete).style.fontWeight = "normal";
                    document.getElementById(propriete).style.backgroundColor = "#2253be";
                    status_tri[propriete] = 0;
                }
                status_tri.atkC = 1;
            } else {
                for (let propriete in status_tri) {
                    document.getElementById(propriete).style.fontWeight = "normal";
                    document.getElementById(propriete).style.backgroundColor = "#2253be";
                    status_tri[propriete] = 0;
                }
                status_tri.atkC = 2;
            }
            atkC.style.fontWeight = "bolder";
            atkC.style.backgroundColor = "#112a60";
            break;


        case "defC":

            all_pokemons_sort.sort(function (a, b) {
                let defA = a.base_defense;
                let defB = b.base_defense;
                if (status_tri.defC === 0 || status_tri.defC === 2) {
                    // Compare les defenses des Pokémons pour déterminer l'ordre de tri.
                    return (defA < defB) ? -1 : (defA > defB) ? 1 : 0;
                } else {
                    return (defA > defB) ? -1 : (defA < defB) ? 1 : 0;
                }
            });
            if (status_tri.defC === 0 || status_tri.defC === 2) {
                for (let propriete in status_tri) {
                    document.getElementById(propriete).style.fontWeight = "normal";
                    document.getElementById(propriete).style.backgroundColor = "#2253be";
                    status_tri[propriete] = 0;
                }
                status_tri.defC = 1;
            } else {
                for (let propriete in status_tri) {
                    document.getElementById(propriete).style.fontWeight = "normal";
                    document.getElementById(propriete).style.backgroundColor = "#2253be";
                    status_tri[propriete] = 0;
                }
                status_tri.defC = 2;
            }
            defC.style.fontWeight = "bolder";
            defC.style.backgroundColor = "#112a60";
            break;
    }

    // on transforme le tableau trié en objet
    objet_pokemons_sort = {};
    all_pokemons_sort.forEach((element, index) => {
        objet_pokemons_sort[index] = element;
    });

    // reset debut
    debut = 0;

    // reset tableau
    body_table.innerHTML = "";
    // on met à jour la table
    chargeTable();
    ajoutListenerPourPopup();
    PrepImages();
    responsiveThead();
}