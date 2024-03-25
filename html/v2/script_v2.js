/*
identifiant unique
● nom
● génération
● types (liste des noms des types du Pokémon)
● endurance (stamina)
● points d’attaque de base
● points de défense de base
● image (en taille miniature, adaptée à la hauteur des autres champs
d’information)
*/


document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 25;
    let currentPage = 1;
    let pokemonsData = [];

    // Fonction pour afficher les Pokémons de la page spécifiée
   
        document.getElementById('pageInfo').innerText = `Page ${currentPage} / ${Math.ceil(pokemonsData.length / itemsPerPage)}`;
    
    // Gestion des clics sur les boutons de pagination
    document.getElementById('prevButton').addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            displayPokemons(currentPage);
        }
    });

    document.getElementById('nextButton').addEventListener('click', function () {
        if (currentPage < Math.ceil(pokemonsData.length / itemsPerPage)) {
            currentPage++;
            displayPokemons(currentPage);
        }
    });

    // Initialisation de la pagination au chargement de la page
    initPagination();
});
