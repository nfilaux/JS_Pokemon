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
}

function TableSuiv() {
    debut = poke;
    // reset tableau
    body_table.innerHTML = "";
    chargeTable();
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


// responsive
document.querySelectorAll('.pokemonTable').forEach(function (table) {
    let labels = Array.from(table.querySelectorAll('th')).map(function (th) {
        return th.innerText;
    })
    table.querySelectorAll('td').forEach(function (td, i) {
        td.setAttribute('data-label', labels[i % labels.length])
    })
});

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