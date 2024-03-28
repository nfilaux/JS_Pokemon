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
if(debut == undefined || debut == null){
    var debut = 1
}
var total = 0
var poke = debut
const keys = Object.keys(Pokemon.all_pokemons)

while(total < 25 && poke <= keys[keys.length -1]){

    if(Pokemon.all_pokemons[poke] != undefined && Pokemon.all_pokemons[poke] != null){
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
    if(Pokemon.all_pokemons[poke].generation <= 7){
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
    if(fin_ancien == undefined || fin_ancien == null){
        var fin_ancien = 1
    }
    
    if(fin_ancien < 25){
        document.getElementById("btn-prec").disabled = true;
    }else{
        document.getElementById("btn-prec").disabled = false;
    }
    if(keys[keys.length -1] <= poke){
        document.getElementById("btn-suiv").disabled = true;
    }else{
        document.getElementById("btn-suiv").disabled = false;
    }
    prec = parseInt(poke) - 25
    prec2 = prec - 25
    
    form_prec.action = `pokemons_v3.html?page=${prec2}`
    form_suiv.action = `pokemons_v3.html?page=${parseInt(poke)}`


//detail 
document.addEventListener("DOMContentLoaded", function() {
    const pokemonList = document.getElementById("pokemonTable").getElementsByTagName("tr");
    const popup = document.getElementById("popup");

    popup.removeChild(); // Suppression de l'image du popup

    // Fonction pour afficher la fenêtre contextuelle avec les détails du Pokémon
    function showPopup(pok_id) {
      popup.style.display = "block";
      var mouseY = event.clientY;
      var offset = 2; // Décalage de la popup par rapport au curseur

      // Prendre en compte le défilement de la page
      var scrollY = window.pageYOffset;

      // Calculer la position verticale de la popup en tenant compte de l'espace disponible
      var popupTop = mouseY + scrollY + offset;
      var popupHeight = popup.offsetHeight;
      var windowHeight = window.innerHeight;

      // Si la popup dépasse en bas de la fenêtre, la placer au-dessus du curseur
      if (popupTop + popupHeight > windowHeight) {
          popupTop = mouseY + scrollY - popupHeight - offset;
      }

      popup.style.top = popupTop + 'px';

      var id = document.createElement('h4');
      id.appendChild(document.createTextNode(Pokemon.all_pokemons[pok_id].pokemon_id + " " + Pokemon.all_pokemons[pok_id].pokemon_name));
      popup.appendChild(id);

      var info_gen = document.createElement('p');
      info_gen.appendChild(document.createTextNode("Generation " + Pokemon.all_pokemons[pok_id]._generation));
      popup.appendChild(info_gen);


      var info = document.createElement('p');
      info.appendChild(document.createTextNode("base attaque " + Pokemon.all_pokemons[pok_id].base_attack + " / base défence " + Pokemon.all_pokemons[pok_id].base_defense + " / base stamina " + Pokemon.all_pokemons[pok_id].base_stamina));
      popup.appendChild(info);

      let types = document.createElement('p')
      if(Pokemon.all_pokemons[pok_id].types.length === 1){
        types.textContent = "Type : " + Pokemon.all_pokemons[pok_id].types[0].nom
      }
      else{
        types.textContent = `Type : ${Pokemon.all_pokemons[pok_id].types[0].nom} / ${Pokemon.all_pokemons[pok_id].types[1].nom}`
      }
      popup.appendChild(types)

        let atk_c = document.createElement('ol');
        let atk_f = document.createElement('ol');

        for (let i = 0; i < Pokemon.all_pokemons[pok_id].attacks.length; i++) {
            let attackName = Pokemon.all_pokemons[pok_id].attacks[i].form + " : " +  Pokemon.all_pokemons[pok_id].attacks[i].nom;
            
            // Créez un nouvel élément p pour chaque attaque
            let attackElement = document.createElement('ul');
            attackElement.textContent = attackName;

            if (Pokemon.all_pokemons[pok_id].attacks[i].form === "charged") {
                atk_c.appendChild(attackElement);
            } else {
                atk_f.appendChild(attackElement);
            }
        }

        // Ajoutez les éléments atk_c et atk_f une seule fois après la boucle
        popup.appendChild(atk_c);
        popup.appendChild(atk_f);

      console.log(Pokemon.all_pokemons[pok_id]);
    }
    // Écouteurs d'événements pour chaque élément de la liste de Pokémon
    for (let i = 0; i < pokemonList.length; i++) {
        pokemonList[i].addEventListener("click", function(event) {
            const pok_id = pokemonList[i].cells[0].textContent; // Récupérer le nom du Pokémon depuis la deuxième cellule (index 1) de la ligne
            showPopup(pok_id);
        });
    }
});


// image 

const pokemonImages = document.querySelectorAll('#pokemonBody img');
var popup = document.getElementById("popupimg");
var thumbnails = document.createElement('img');

pokemonImages.forEach(image => {

    image.addEventListener('mouseover', function(event) {
        var dernierSlashIndex = image.src.lastIndexOf("/");

        // Extraire la partie du chemin après le dernier slash
        var nomFichier = image.src.substring(dernierSlashIndex + 1);

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

        popup.style.left = mouseX + scrollX + offset + 'px';
        popup.style.top = popupTop + 'px';

        popup.appendChild(thumbnails);
    });

    image.addEventListener('mouseout', function() {
        popup.style.display = "none";
        popup.removeChild(thumbnails); // Suppression de l'image du popup
    });
});
