// LES SELECTEURS

// Sélection et stylisation du titre principal
const mainHeading = document.getElementById("main-heading");
mainHeading.style.color = "#D32F2F";
mainHeading.style.fontSize = "36px";
mainHeading.style.fontFamily = "'Arial', sans-serif";
mainHeading.style.textAlign = "center";
mainHeading.style.marginBottom = "30px";

// Sélection et stylisation des éléments de la liste par classe
const listItems = document.getElementsByClassName("list-item");
for (let i = 0; i < listItems.length; i++) {
    listItems[i].style.color = "#1976D2";
    listItems[i].style.fontSize = "24px";
    listItems[i].style.fontFamily = "'Arial', sans-serif";
    listItems[i].style.marginBottom = "10px";
    listItems[i].style.border = "1px solid #BDBDBD";
}

// Sélection et stylisation des éléments de la liste par balise
const listItemsByTag = document.getElementsByTagName("li");
for (let i = 0; i < listItemsByTag.length; i++) {
    listItemsByTag[i].style.backgroundColor = "#E0F2F1";
    listItemsByTag[i].style.padding = "10px";
    listItemsByTag[i].style.borderRadius = "5px";
}

// Sélection et stylisation en utilisant querySelectorAll sur "li"
const listItemsByTagQuery = document.querySelectorAll("li");
listItemsByTagQuery.forEach(item => {
    item.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
});

// Mettre en évidence le premier élément de la liste
const firstListItem = document.querySelector("li");
firstListItem.style.fontWeight = "bold";
firstListItem.style.border = "2px solid #1976D2";
firstListItem.style.marginBottom = "20px";

//// AJOUTER OU RETIRER DES ELEMENTS

const myList = document.querySelector("ul");
const myItem = document.createElement("li");
// Pas d'ajout ici, on verra plus bas comment étendre notre liste.

function applyListItemStyle(item) {
    item.style.color = "#1976D2";
    item.style.fontSize = "24px";
    item.style.fontFamily = "'Arial', sans-serif";
    item.style.marginBottom = "10px";
    item.style.border = "1px solid #BDBDBD";
    item.style.backgroundColor = "#E0F2F1";
    item.style.padding = "10px";
    item.style.borderRadius = "5px";
    item.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
}

const movies = ["Lord of the Ring", "Ready Player One", "Jurassic Park"];
movies.forEach(movie => {
    const movieItem = document.createElement("li");
    movieItem.textContent = movie;
    applyListItemStyle(movieItem);
    myList.appendChild(movieItem);
});


const newParagraph = document.createElement("p");
newParagraph.textContent = "Liste des films à voir une fois dans sa vie";

const parentElement1 = mainHeading.parentNode;
parentElement1.insertBefore(newParagraph, mainHeading.nextSibling);

const anotherParagraph = document.createElement("p");
anotherParagraph.textContent = "Pour introduire notre sujet, voici :";

const parentElement2 = mainHeading.parentNode;
parentElement2.insertBefore(anotherParagraph, mainHeading);

// Pour retirer des éléments

/* const allLiItems = document.querySelectorAll("ul li");
allLiItems.forEach(item => {
    if (movies.includes(item.textContent)) {
        item.remove();
    }
}); */

const mainHeading = document.getElementById("main-heading");
mainHeading.classList.add("goodbye");
console.log(mainHeading.classList);