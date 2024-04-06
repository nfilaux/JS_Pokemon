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

var body_table = document.getElementById('pokemonBody')
var debut = parseInt(urlParams.get('page'))

if (isNaN(debut)) {
    debut = 0;
}
var total = 0
var poke = debut
const keys = Object.keys(Pokemon.all_pokemons)

while (total < 25 && poke <= keys[keys.length - 1]) {

    if (Pokemon.all_pokemons[poke] != undefined && Pokemon.all_pokemons[poke] != null) {
        total++;

        let ligne = document.createElement('tr')
        body_table.appendChild(ligne)

        let id = document.createElement('td')
        id.textContent = Pokemon.all_pokemons[poke].pokemon_id
        ligne.appendChild(id)

        let nom = document.createElement('td')
        nom.textContent = Pokemon.all_pokemons[poke].pokemon_name
        ligne.appendChild(nom)

        let gen = document.createElement('td')
        gen.textContent = Pokemon.all_pokemons[poke].generation
        ligne.appendChild(gen)

        let types = document.createElement('td')
        if (Pokemon.all_pokemons[poke].types.length === 1) {
            types.textContent = Pokemon.all_pokemons[poke].types[0].nom
        }
        else {
            types.textContent = `${Pokemon.all_pokemons[poke].types[0].nom} / ${Pokemon.all_pokemons[poke].types[1].nom}`
        }
        ligne.appendChild(types)


        let stam = document.createElement('td')
        stam.textContent = Pokemon.all_pokemons[poke].base_stamina
        ligne.appendChild(stam)

        let atk = document.createElement('td')
        atk.textContent = Pokemon.all_pokemons[poke].base_attack
        ligne.appendChild(atk)

        let def = document.createElement('td')
        def.textContent = Pokemon.all_pokemons[poke].base_defense
        ligne.appendChild(def)

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
    poke++;

}

var form_prec = document.getElementById('page_prec')
var form_suiv = document.getElementById('page_suiv')

var fin_ancien = urlParams.get('page')
if (fin_ancien == undefined || fin_ancien == null) {
    var fin_ancien = 1
}

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


let debut_prece = debut;
let t_poke_prec = 0;
while (t_poke_prec < 25 && debut_prece > 0) {
    if (Pokemon.all_pokemons[debut_prece] != undefined && Pokemon.all_pokemons[debut_prece] != null) {
        t_poke_prec++;
    }
    debut_prece--;
}

form_prec.action = `pokemons_v3.html?page=${debut_prece}`
form_suiv.action = `pokemons_v3.html?page=${parseInt(poke)}`


//--------------------------------------------------------------------------------------

//detail 

const pokemonImages = document.querySelectorAll('#pokemonBody img');

document.addEventListener("DOMContentLoaded", function () {
    const pokemonList = document.getElementById("pokemonBody").getElementsByTagName("tr");
    const popup = document.getElementById("popup");
    
    document.querySelectorAll('.pokemonTable').forEach(function (table) {
        let labels = Array.from(table.querySelectorAll('th')).map(function (th){
            return th.innerText;
        })
        table.querySelectorAll('td').forEach(function (td, i){
            td.setAttribute('data-label', labels[i % labels.length])
        })
    })

    popup.addEventListener('mouseenter', function() {
        document.body.style.overflow = 'hidden';
    });
    
    popup.addEventListener('mouseleave', function() {
        document.body.style.overflow = 'auto';
    });

    document.addEventListener('click', function(event) {
        if (!popup.contains(event.target) && !event.target.closest('#pokemonBody')) {
            popup.style.display = 'none';
        }
    });
    
    // Écouteurs d'événements pour chaque élément de la liste de Pokémon
    for (let i = 0; i < pokemonList.length; i++) {
        pokemonList[i].addEventListener("click", function (event) {
            const pok_id = pokemonList[i].cells[0].textContent; // Récupérer le id du Pokémon depuis la premiere cellule
            showPopup(pok_id);
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

            attackElementList.id = `${attackName}`;
            attackElementList.style.display = 'none';

            let type_atk = document.createElement('img');
            type_atk.src = `../css/images/${Pokemon.all_pokemons[pok_id].attacks[i].type.nom}.ico`
            Nomtype.textContent= Pokemon.all_pokemons[pok_id].attacks[i].type.nom;
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

            attackElement.addEventListener('click', function(event) {
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
        croix.id ="croix";
        popup.appendChild(croix);

        croix.addEventListener('click', function(event) {
            popup.style.display = 'none';
        });

        console.log(Pokemon.all_pokemons[pok_id]);
    }

});


// image 

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
