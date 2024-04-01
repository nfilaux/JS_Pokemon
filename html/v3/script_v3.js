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

if (fin_ancien < 25) {
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
form_suiv.action = `pokemons_v3.html?page=${parseInt(poke)}`


//--------------------------------------------------------------------------------------

//detail 

const pokemonImages = document.querySelectorAll('#pokemonBody img');

document.addEventListener("DOMContentLoaded", function () {
    const pokemonList = document.getElementById("pokemonTable").getElementsByTagName("tr");
    const popup = document.getElementById("popup");

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
        var mouseY = event.clientY;
        var offset = 0; // Décalage de la popup par rapport au curseur

        let div = document.createElement('div');

        // Calculer la position verticale de la popup en tenant compte de l'espace disponible
        var popupTop = mouseY + scrollY + offset;
        popup.style.top = popupTop + 'px';

        // Créer l'élément image
        let image = document.createElement('img');
        let img_url = String(Pokemon.all_pokemons[pok_id].pokemon_id);
        while (img_url.length < 3) {
            img_url = '0' + img_url;
        }
        image.src = `../webp/thumbnails/${img_url}.webp`;
        div.appendChild(image);

        let description = document.createElement('div');
        // Créer l'élément id et nom
        var id = document.createElement('h4');
        id.appendChild(document.createTextNode(Pokemon.all_pokemons[pok_id].pokemon_id + " " + Pokemon.all_pokemons[pok_id].pokemon_name));
        description.appendChild(id);

        // Créer l'élément type
        let types = document.createElement('p')
        if (Pokemon.all_pokemons[pok_id].types.length === 1) {
            types.textContent = "Type : " + Pokemon.all_pokemons[pok_id].types[0].nom
        }
        else {
            types.textContent = `Type : ${Pokemon.all_pokemons[pok_id].types[0].nom} / ${Pokemon.all_pokemons[pok_id].types[1].nom}`
        }
        description.appendChild(types)

        changeColor(Pokemon.all_pokemons[pok_id].types[0].nom, popup)

        // Créer l'élément generation 
        var info_gen = document.createElement('p');
        info_gen.appendChild(document.createTextNode("Generation : " + Pokemon.all_pokemons[pok_id]._generation));
        description.appendChild(info_gen);

        div.appendChild(description);
        popup.appendChild(div);

        div.classList.add("info");

        // Créer l'élément base atk, def et stam
        var info = document.createElement('p');
        info.appendChild(document.createTextNode("Attaque de base : " + Pokemon.all_pokemons[pok_id].base_attack + " / Défense de base : " + Pokemon.all_pokemons[pok_id].base_defense + " / Endurance : " + Pokemon.all_pokemons[pok_id].base_stamina));
        popup.appendChild(info);

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
            let attackTypeList = document.createElement('ul');
            let attackType = document.createElement('li');
            attackElement.setAttribute('src', "../css/pokeball.png");
            attackElement.textContent = attackName;
            attackType.textContent = Pokemon.all_pokemons[pok_id].attacks[i].type.nom;

            if (Pokemon.all_pokemons[pok_id].attacks[i].form === "charged") {
                atk_c.appendChild(attackElement);
                attackTypeList.appendChild(attackType);
                atk_c.appendChild(attackTypeList);
            } else {
                atk_f.appendChild(attackElement);
                attackTypeList.appendChild(attackType);
                atk_f.appendChild(attackTypeList);
            }
        }

        info_atk.classList.add("atk");
        // Ajoutez les éléments atk_c et atk_f une seule fois après la boucle
        div_c.appendChild(atk_c);
        div_f.appendChild(atk_f);
        info_atk.appendChild(div_c);
        info_atk.appendChild(div_f);
        popup.appendChild(info_atk);

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

        // Prendre en compte le défilement de la page
        var scrollX = window.pageXOffset;
        var scrollY = window.pageYOffset;

        // Calculer la position verticale de la popup en tenant compte de l'espace disponible
        var popupTop = mouseY + scrollY + offset;
        var popupHeight = popup.offsetHeight;
        var windowHeight = window.innerHeight;

        // Si la popup dépasse en bas de la fenêtre, la placer au-dessus du curseur
        if (popupTop + popupHeight > windowHeight) {
            popupTop = mouseY + scrollY - popupHeight - offset;
        }

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
            colorB = '#db5';
            break;
        case 'Fire':
            text = '#fff';
            colorB = '#f42';
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
            colorB = '#fc3';
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
            colorB = '#7c5';
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
            text = '#fff';
            colorB = '#ab2';
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
