const info = document.querySelector('.info');
const cellules = document.querySelectorAll('.cell');

let verouillage = true;
let joueurEnCours = "X";
//let img = new Image(/img/tenia-le-choc-des-cultures.png);


info.innerHTML = `Au tour de ${joueurEnCours}`;

//ici je crée un tableau avec tous les alignements possible pour gagner dans le jeux.
const alignementsGagnants = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
//ici c'est un tableau avec les cases que nous avons a cocher
let partieEnCours = ["","","","","","","","",""];

//pour chaque celue nous avons a cliquer dessus on envoie la fonction clicsurcase
cellules.forEach(cell => {
    cell.addEventListener('click', clicSurCase);

})

    //ici c'est la case sur laquelle ont vien de cliqué
    function clicSurCase(e) {
    const caseClique = e.target;
    //ici on récuperer l'index de la case cliquer
    const caseIndex = caseClique.getAttribute('data-index');

    //ici c'est différent d'une case au clic et on retourne
    //je verrouille la partie pour ne plus pouvoir clic sur les célules
    if(partieEnCours[caseIndex] !== "" || !verouillage){
        return;
    }

    partieEnCours[caseIndex] = joueurEnCours;
    caseClique.innerHTML = joueurEnCours;
    console.log(partieEnCours);

    validationResultats();
    
}
    

    function validationResultats() {
        let finDePartie = false;

        for(let i = 0; i < alignementsGagnants.length; i++){

    
        const checkWin = alignementsGagnants[i];
        // [0, 1, 2],
        let a = partieEnCours[checkWin[0]];
        let b = partieEnCours[checkWin[1]];
        let c = partieEnCours[checkWin[2]];
        
    
        if(a === '' || b === '' || c === ''){
            continue;
        }
        if( a === b && b === c){
            finDePartie = true;
            break;
        }
    }
    
    if(finDePartie){
        info.innerText = `Le joueur ${joueurEnCours} a gagné !`
        verouillage = false;
        return;
    }

    //si il n y a pas de chaine de caractere vide dans la partie en cours
    let matchNul = !partieEnCours.includes('');
    if(matchNul){
        info.innerText = 'Match nul !';
        verouillage = false;
        return;
    }

    changementDeJoueur();
}
    function changementDeJoueur(){
        joueurEnCours = joueurEnCours === "X" ? "O" : "X";
        info.innerText = `Au tour de ${joueurEnCours}`;
    


}   
