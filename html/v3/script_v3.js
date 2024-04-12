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

// recupre les clés de tous les pokemons
const keys = Object.keys(Pokemon.all_pokemons)

var body_table = document.getElementById('pokemonBody')
var debut = 0;
var poke;
function tablePrec() {

    let t_poke_prec = 0;
    while (t_poke_prec < 25 && debut > 0) {
        if (Pokemon.all_pokemons[debut] != undefined && Pokemon.all_pokemons[debut] != null) {
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
    var total = 0
    poke = debut;
    while (total < 25 && poke <= keys[keys.length - 1]) {
        if (Pokemon.all_pokemons[poke] != undefined && Pokemon.all_pokemons[poke] != null) {
            total++;
            // création de la ligne
            let ligne = document.createElement('tr')
            body_table.appendChild(ligne)

            // création colonne id
            let id = document.createElement('td')
            id.textContent = Pokemon.all_pokemons[poke].pokemon_id
            ligne.appendChild(id)

            // création colonne nom
            let nom = document.createElement('td')
            nom.textContent = Pokemon.all_pokemons[poke].pokemon_name
            ligne.appendChild(nom)

            // création colonne generation
            let gen = document.createElement('td')
            gen.textContent = Pokemon.all_pokemons[poke].generation
            ligne.appendChild(gen)

            // création colonne types
            let types = document.createElement('td')
            if (Pokemon.all_pokemons[poke].types.length === 1) {
                types.textContent = Pokemon.all_pokemons[poke].types[0].nom
            }
            else {
                types.textContent = `${Pokemon.all_pokemons[poke].types[0].nom} / ${Pokemon.all_pokemons[poke].types[1].nom}`
            }
            ligne.appendChild(types)

            // création colonne stamina
            let stam = document.createElement('td')
            stam.textContent = Pokemon.all_pokemons[poke].base_stamina
            ligne.appendChild(stam)

            // création colonne attack
            let atk = document.createElement('td')
            atk.textContent = Pokemon.all_pokemons[poke].base_attack
            ligne.appendChild(atk)

            // création colonne defense
            let def = document.createElement('td')
            def.textContent = Pokemon.all_pokemons[poke].base_defense
            ligne.appendChild(def)

            // création colonne spite
            let img = document.createElement('td')
            let sprite = document.createElement('img')
            let img_url = String(Pokemon.all_pokemons[poke].pokemon_id)
            while (img_url.length < 3) {
                img_url = '0' + img_url
            }
            if (Pokemon.all_pokemons[poke].generation <= 7) {
                img_url = img_url + 'MS'
            }

            sprite.src = `../webp/sprites/${img_url}.webp`
            img.appendChild(sprite)
            ligne.appendChild(img)

        }
        // poke suivant
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
    if (debut <= 1) {
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
        popup.innerHTML = '';
        image.addEventListener('mouseover', function (event) {
            // Vide la popup 
            popup.innerHTML = ''

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
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight; 

            // Si la popup dépasse à droite de la fenêtre, la placer à gauche du curseur
            if (popupLeft + 100 > windowWidth) {
                popupLeft = mouseX + scrollX - 110 - offset;
            }

             // Si la popup dépasse en bas de la fenêtre, la placer en haut du curseur
            if (popupTop + 100 > windowHeight+scrollY) {
                popupTop = mouseY + scrollY - 110 - offset;
            }

            popup.style.left = popupLeft + 'px';
            popup.style.top = popupTop + 'px';

            popup.appendChild(thumbnails);

        });

        image.addEventListener('mouseout', function () {
             // Suppression de l'image du popup
            popup.style.display = "none";
            popup.removeChild(thumbnails);
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
    charged.textContent = "Charged : "
    div_c.appendChild(charged)

    var fast = document.createElement('h4');
    fast.textContent = "Fast : "
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
            atk_c.appendChild(attackElementList);
        } else {
            atk_f.appendChild(attackElement);
            attackElementList.appendChild(attackType);
            attackElementList.appendChild(attackPower);
            attackElementList.appendChild(attackDuration);
            attackElementList.appendChild(attackCrit);
            attackElementList.appendChild(attackEnergieDelta);
            attackElementList.appendChild(attackStamLoss);
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
