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

form_prec.action = `pokemons_v2.html?page=${debut_prece}`
form_suiv.action = `pokemons_v2.html?page=${parseInt(poke)}`

document.querySelectorAll('.pokemonTable').forEach(function (table) {
    let labels = Array.from(table.querySelectorAll('th')).map(function (th){
        return th.innerText;
    })
    table.querySelectorAll('td').forEach(function (td, i){
        td.setAttribute('data-label', labels[i % labels.length])
    })
})