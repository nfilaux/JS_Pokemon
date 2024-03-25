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

for(let poke in Pokemon.all_pokemons){
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
    if(Pokemon.all_pokemons[poke].types.length === 1){
        types.textContent = Pokemon.all_pokemons[poke].types[0].nom
    }
    else{
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
    while(img_url.length < 3){
        img_url = '0' + img_url
    }

    sprite.src = `../webp/sprites/${img_url}MS.webp`
    img.appendChild(sprite)
    ligne.appendChild(img)



}
