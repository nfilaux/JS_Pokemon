document.addEventListener("DOMContentLoaded", function() {
    const pokemonList = document.getElementById("pokemonTable").getElementsByTagName("tr");
    const popup = document.getElementById("popup");
    const popupName = document.getElementById("popupName");
    const popupDetails = document.getElementById("popupDetails");
    const closePopup = document.getElementById("closePopup");

    console.log(popup); // Vérifier si la popup est correctement sélectionnée

    // Fonction pour afficher la fenêtre contextuelle avec les détails du Pokémon
    function showPopup(pokemonName) {
      console.log("Popup displayed for", pokemonName); // Vérifier si la fonction est appelée
      popupName.textContent = pokemonName;
      // Ajoutez ici la logique pour obtenir les détails du Pokémon en fonction de son nom ou de son ID
      popupDetails.textContent = "Détails du Pokémon " + pokemonName; // Exemple basique
      popup.style.display = "block";
    }

    // Écouteurs d'événements pour chaque élément de la liste de Pokémon
    for (let i = 0; i < pokemonList.length; i++) {
        pokemonList[i].addEventListener("click", function(event) {
            const pokemonName = pokemonList[i].cells[1].textContent; // Récupérer le nom du Pokémon depuis la deuxième cellule (index 1) de la ligne
            showPopup(pokemonName);
        });
    }

    // Événement pour fermer la fenêtre contextuelle
    closePopup.addEventListener("click", function() {
      console.log("Popup closed"); // Vérifier si l'événement est déclenché
      popup.style.display = "none";
    });
});
