function updateClasses() {
    var departement = document.getElementById('departement').value;

    // Faire une requête AJAX pour obtenir les classes associées au département
    fetch(`/user/classes?departement=${departement}`)
        .then(response => response.json())
        .then(data => {
            var classeSelect = document.getElementById('classe');
            classeSelect.innerHTML = "";  // Réinitialiser les options
            data.classes.forEach(function(classe) {
                var option = document.createElement('option');
                option.value = classe;
                option.textContent = classe;
                classeSelect.appendChild(option);
            });
        })
        .catch(error => console.log('Erreur:', error));
}