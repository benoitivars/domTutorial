# Le monde merveilleux du DOM

Pour comprendre le DOM, j'ai dû passer par la prise de note que j'ai restructuré en un tuto que voici !

Explorons ce nouveau  sujet aussi complexe que fascinant.

## 1. Le DOM, le sequelette de mes pages web

Nous avons vu jusque maintenant html, qui structure la page, css, qui lui donne de l'allure, et JavaScript, qui effectue des opérations concrètes. Très bien, génial ! Je sais faire de jolies pages statiques, des algos avec des méthodes avancées, mais comment combiner tout ça ?

C'est ici que le DOM entre en jeu. Mais le DOM, C'est quoi ?

Grosso modo, c'est quand le code html est "transformé" en objet JS. Le document est un objet, qui contient un head et un body qui sont tous deux des objets, le body contenant un header, un main et un footer qui sont des objets, ... etc. Grosso modo, on reprend la structure du HTML  et on en fait du JS ! 

En html on a :

```html
<!DOCTYPE html>
<html>
<head>
    <title>Exemple</title>
</head>
<body>
    <header>
        <h1>Mon Site</h1>
    </header>
    <main>
        <p>Contenu principal.</p>
    </main>
    <footer>
        <p>Copyright 2023.</p>
    </footer>
</body>
</html>
```

Et on passe en DOM à :

document
|
|---> DOCTYPE
|---> html
      |
      |---> head
      |     |
      |     |---> title: "Exemple"
      |
      |---> body
            |
            |---> header
            |     |
            |     |---> h1: "Mon Site"
            |
            |---> main
            |     |
            |     |---> p: "Contenu principal."
            |
            |---> footer
                  |
                  |---> p: "Copyright 2023."

C'est l'arbre qui reprend les différents éléments. Et chacun de ces éléments, chaque balise du code html, jusqu'à un misérable <span> est un **objet** JS du DOM imbriqué dans d'autres objets !

Quand on a vu au tout début le HTML, et qu'on a appris que le navigateur "lisait" le HTML pour l'afficher, on peut dire que le DOM est ce qu'il voit concrètement : un document, qui est un objet avec ses *propriétés* et ses *méthodes*, qui contient d'autres objets, qui ont à leur tour des propriétés et des méthodes et qui... jusqu'à un misérable span ! 

Toute cette représentations sont dans la "mémoire" du navigateur, un peu comme quand on lit un texte : on passe d'une suite de caractères assemblés entre eux en une suite de sons. Nous, au milieu, on lit le texte, comprennons son sens de par sa structure et le rendons sous formes de sons compréhensibles et ayant du sens pour nos auditeurs, ce qui implique qu'on l'ait en mémoire, et le voyions comme à mi-chemin entre des signes et du son.

C'est pareil pour le navigateur : entre du HTML et un affichage web, il a du DOM en tête.

Par exemple, dans ce code que nous expliquerons en détails plus bas :

```javascript
const mainHeading = document.getElementById("main-heading");
    mainHeading.style.color = "#D32F2F";
    mainHeading.style.fontSize = "36px";
    mainHeading.style.fontFamily = "'Arial', sans-serif";
    mainHeading.style.textAlign = "center";
    mainHeading.style.marginBottom = "30px";
```

A la première ligne, "document" est notre objet, et ".getElementById" une méthode appliquée à notre "objet". De la deuxième à la sixième ligne,l'objet est mainHeading, et les différents "style. ..." la propriété de objet cet objet qu'on veut modifier... qui est aussi un objet qui a pour propriété .color, .fontSize, tc. C'est pour ça aussi qu'on parle de noeuds.

NB: L'indentation ici est utilisée à des fins pédagogiques pour illustrer la hiérarchie et la structure du DOM. Dans un vrai script JavaScript, cette indentation ne serait pas utilisée de cette manière.

Enfin, voici une représentation de cette manipulation sous forme d'objet JS, pour aussi comprendre l'idée d'imbrication, de noeuds, étant à la fois des objets et des attributs :

```javascript
let document = {
    getElementById: function(id) {
        if (id === "main-heading") {
            return {
                style: {
                    color: "#D32F2F",
                    fontSize: "36px",
                    fontFamily: "'Arial', sans-serif",
                    textAlign: "center",
                    marginBottom: "30px"
                }
            };
        }
        // ... d'autres éléments peuvent être ajoutés ici
    }
    // ... d'autres propriétés et méthodes de document peuvent être ajoutées ici
};
```

## 2. Manipuler le DOM

Maintenant qu'on sait comment les "noeuds" du DOM sont des objets, comment s'en servir ? A quoi ça sert ? Comment le manipuler ? 

### 2.1 Pourquoi le manipuler ?

Pour permettre trois choses essentielles : 

* Pour rendre le site interactif: affiche une boite de dialogue quand on clique sur un bouton, modifie les champs des formulaires, cursuer pour modifier une valeur, ... exemple concret : un Google Form.

* En lien avec le point précédent, faire des changements dynamiques sans recharger la page. Exemple : fil d'actu du site d'un journal, nombre d'utilisateurs en ligne, boite de dialogue intégrée (coucou les assistances des banques), ...

* La récupération d'informations. Dit autrement, quand on entre une donnée dans un formulaire, elle est récupérée et enregistrée dans une BDD. 

###### Mais pour modifier l'apparence, on n'a pas déjà les animations CSS ?

Question intéressante ! Mais ce qui différence une animation CSS d'une manipulation DOM, c'est que la première change la structure de la page, son comportement, tandis que la seconde fait de jolies animations strictement cosmétiques, sans toucher au code de la page.

###### Et le mode nuit ? Interactivité ou changement dynamique ?

Les deux, mon capitaine ! Quand on clique sur le bouton qui l'active, on utilise l'interractivité du DOM; et quand il chane de couleur, c'est une manipulation dynamique ! Souvent, les deux ont tendance à se chevaucher.

### 2.2 Mais comment les manipuler ?

maintenant qu'on a vu à quoi ça peut servir de manipuler le dom, voyons les fonctions principales !

#### 2.2.1 getElementById();

C'es le premier de la bande ! Il sert à sélectionner un élément par son ID. 

Pour ce faire, il faut bien évidement créer une variable correspondante dans le script :

```javascript
const mainHeading = document.getElementById("main-heading");
```
... qui correspond à notre h1 qui a l'ID "main-heading" dans le code html !

```html
 <h1 id="main-heading">Favourite movies</h1>
```

Enfin, pour le retrouver via la console, il suffit de tapper `mainHeading`, soit le nom de notre cosntante dans la variable, qui va nous ressortir en output toute la balise ! Et si on passe la souris dessus dans la console, on voit que ça s'affiche dans notre page, avec sa box !

Et si on veut changer la couleur de "main-heading" ? Ce sera pas dur ! En dessous de la ligne le déclarant en varaiable, on l'appelle, on appelle la fonction style, la fonction color et et enfin, on précise red comme ceci : ="red". 

Pour visualiser :

```javascript
const mainHeading = document.getElementById("main-heading");
mainHeading.style.color = "#D32F2F";
mainHeading.style.fontSize = "36px";
mainHeading.style.fontFamily = "'Arial', sans-serif";
mainHeading.style.textAlign = "center";
mainHeading.style.marginBottom = "30px";
```

Et là on a eu la "cascade" d'objets suivante : document (objet) --> h1#main-heading (objet) --> style (propriété/objet) --> color (propriété) qui fait qu'au final, notre ID mainHeading s'affichera en rouge !

#### 2.2.2 getElementsByClassName
 
La même que getElementById(); sauf qu'ici, on peut prendre tous les éléments correspondant à une classe !

Et on commence avec un premier défi, getElementByClassName nous renvoie une "HTMLCollection", vu que là, on n'est plus sur un Id unique, mais toute une série d'éléments qui apaprtiennent à une même classe (genre, des li, des h3, ...) ! Donc si on veut les traiter, il faut passer par des méthodes des tableaux (pas toutes, ou alors avec une conversion préalable, comme nous le verrons plus bas).

```javascript
const listItems = document.getElementsByClassName("list-item");
```

Est la synthaxe de base pour sélectionner tous les éléments qui sont le la classe "list-item", d'où le "s" dans getElement**s**ByClassName(), vu qu'il  sont en principe plusieurs. En effet, en html, si on ne veut discriminer qu'un élément, autant utiliser un Id unique. 

Maintenant, petite touche de complexité : avec getElementsByClassName(), on vient de voir qu'on rapporte plusieurs éléments. Ces différents élémetents sont renvoyés dans une "collection html".

##### 2.2.3 Qu'est-ce qu'une collection html ?

La collection html est au array ce que le chenipan est au papilusion, c'est à dire une versiona ssez primitive d'un array.

Il n'y a que quelques pratiques du array qui fonctionne directement dessus : 

* connaitre la valeur des éléments à un index donné avec listItems[i]
* connaitre la longueur avec listItems.length
* Pourvoir faire quelques modifications, avec les boucles.

D'ailleurs, si je le modifier, voilà quoi faire :

```javascript
for (let i = 0; i < listItems.length; i++) {
    listItems[i].style.color = "#1976D2";
    listItems[i].style.fontSize = "24px";
    listItems[i].style.fontFamily = "'Arial', sans-serif";
    listItems[i].style.marginBottom = "10px";
    listItems[i].style.borderBottom = "1px solid #BDBDBD";
}
```
Pour utiliser les autres fonctions comme forEach(), map(), reduce(), slice(), ou autres, voilà comment convertir :

```javascript
const listItemsArray = [...listItems];
```

#### 2.2.4 GetElementsByTagName

C'est la même idée que getElementsByClassName, mais à un cran pus général, car on vise toutes les balises d'un type. Comme pour getElementsByClassName, il renvoie un CollectionHTML.

Voici l'exemple type :

```javascript
const listItemsByTag = document.getElementsByTagName("li");
for (let i = 0; i < listItemsByTag.length; i++) {
    listItemsByTag[i].style.backgroundColor = "#E0F2F1";
    listItemsByTag[i].style.padding = "10px";
    listItemsByTag[i].style.borderRadius = "5px";
}
```

#### 2.2.5 QuerySelector et QuerySelectorAll

Ici, on travaille par l'autre bout de la lorgnette, en touchant les selecteurs css plutôt que les balises, classes et Id html.

Pour rappel, le CSS est ce qui eprmet de sttyliser son code HTML, de rajouter 

Ces sélecteurs sont :

```css
* { /* Tous les éléments */ }
body { /* Élément body */ }
.class { /* Éléments avec une classe spécifique */ }
#Id { /* Élément avec un ID spécifique */ }
```

Et ainsi de suite. 

La synthaxe, à quelques détails près, est sensiblement la même :

```js
const titre = document.querySelector("#main-heading");
const conteneur = document.querySelector(".container");
const liste = document.querySelector("ul");
```

Par contre, pour la modification on laisse tomber les boucles et on applique des règles CSS :

```javascript
const mainHeadingQuery = document.querySelector("#main-heading");
mainHeadingQuery.style.fontSize = "24px"; // Change la taille de la police

const listItemsQuery = document.querySelectorAll(".list-item");
listItemsQuery.forEach(item => {
    item.style.border = "2px solid black"; // Ajoute une bordure à chaque élément de la liste
});

const listItemsByTagQuery = document.querySelectorAll("li");
listItemsByTagQuery.forEach(item => {
    item.style.padding = "5px"; // Ajoute du padding à chaque élément <li>
});
```

##### Petites subltilités 

querySelectorAll nous renvoie ni un array, ni un CollectionHTML, mais un... NodeList, qui est un autre "cousin" du array, sur lequel on peut appliquer quelques méthodes en plus que le CollectionHTML. Entre chenipan et papilusion, ce serait crysacier.

Voici un tableau qui reprend les méthodes les plus fréquentes et leurs compatibilité avec ces trois "sortes" d'array :



| Méthode/Opération          | NodeList                  | Array | HTMLCollection |
|----------------------------|---------------------------|-------|----------------|
| `length`                   | ✓                         | ✓    | ✓              |
| `forEach()`                | ✓ (modern browsers)       | ✓    | ✗              |
| `map()`                    | ✗                         | ✓    | ✗              |
| `filter()`                 | ✗                         | ✓    | ✗              |
| `reduce()`                 | ✗                         | ✓    | ✗              |
| `push()`                   | ✗                         | ✓    | ✗              |
| `pop()`                    | ✗                         | ✓    | ✗              |
| `shift()`                  | ✗                         | ✓    | ✗              |
| `unshift()`                | ✗                         | ✓    | ✗              |
| `slice()`                  | ✗                         | ✓    | ✗              |
| `splice()`                 | ✗                         | ✓    | ✗              |
| Indexation (ex. `list[0]`) | ✓                         | ✓    | ✓              |

#### 2.2.6 Le style : syntaxe et priorité

D'ailleurs, si on observe le fichier app.js qui va avec ce md, on observe que tous les changements de styles qui ont été apportés, que ce soit par les différents selectItem(s) ou le querySelector on a repris tout symplement les règles de style CSS, à un petit détail près, en gras ci-dessous :

backgroun**dC**olor
fon**tF**amily
margi**nB**ottom
tex**tA**lign

Vous avez remarqué ? Les éléments de style sont en fait écrits avec un camelCase et non plus avec un tiret, comme en CSS :

background-color <--> backgroundColor
font-family <--> fontFamily
margin-botom <--> marginBottom
text-align <--> textAlign

Du reste, les valeurs se modifient comme en CSS.

Quant à la priorité, les modifications de style par le DOM écraserent les styles définis dans votre fichier CSS, car elles sont en "in-line", dans le code HTML, et les définitiens de style HTML sont prioritaires sur toutes les autres !

#### 2.2.7 La différence entre innerText et innerHTML

Contrairement au cours sur le DOM proposé à BeCode, je propsoe d'insérer ici la théorie à proprement parler du innerText et du innerHTML, pour les présenter.

Si on revient au tout début de ce tuto, on sait que le DOM est un objet, composé de propriétés (ensemble de variables qui le caractérise) et de méthodes (fonctions qui lui sont propres).

innerText et innerHTML deux **propriétés** du DOM, qui permettent d'accéder, d'afficher, voire de modifier le contenu textuel d'un élément dans le cas du innerText, ou de cet élément dans sa structure HTML dans le cas de innerHTML.

Par exemple,

```javascript
const mainHeading = document.getElementById("main-heading");
console.log(mainHeading.innerText);
```

Renverra "favorite movies".

```javascript
const mainHeading = document.getElementById("main-heading");
console.log(mainHeading.innerHTML);
```

Renverra "<h1 id="main-heading">Favourite movies</h1>"

Nous verrons plus bas, au point **2.2.10** comment modifier ces éléments.


#### 2.2.8 ajouter et retirer des éléments

Nous avons vus que l'on peut sélectionner des éléments et les modifier avec des méthodes qu'on applique au document html. Mais on peut aussi en ajouter ou en retirer ! 

Cs deux méthodes, que nous allons voir en pratique sont **createElement();**, **appenChild();** pour ajouter des choses et **remove();** pour retirer. 

##### 2.2.8.1 Ajouter du contenu

Bon, la liste de films est sympa, mais moi je veux ajouter Lord of the Rings, Ready Player One et Jurasic Park !

Comment je fais, sans toucher au code HTML ?

D'abord, on va vouloir toucher l'élément "ul", et pour ce faire, on va créer une variable, comme on fait toujours dans le dom :

```javascript
const myList = document.querySelector("ul");
```

Et on crée la liste des films à ajouter à terme :

```javascript
const movies = ["Lord of the Ring", "Ready Player One", "Jurassic Park"];
```
Là, rien de neuf, ni en DOM, ni en JS.

Avant d'ajouter notre liste de films, voici un autre élément que l'on va **créer**, car n'existant pas dans notre fichier HTML !

```javascript
const myItem = document.createElement("li");
```
                        ^^^^^^^^^^^^^ Vous voyez au dessus des accents qu'on utilise la méthode createElement(); ! Notez aussi que cet item est est pour l'instant attaché à l'objet document. 

C'est là qu'intervient le moment où on "décroche" myItem du document pour le raccrocher à l'objet "ul" qu'on a pris le temps de désigner plus haut, car il a ni classe, ni id :

```javascript
myList.appendChild(myItem);
```
C'est clair ? Nickel ! On va commenter cette partie du code pour montrer comment faire pour ajouter notre array "movies" !

On reprend la base : 

```javascript
const movies = ["Lord of the Ring", "Ready Player One", "Jurassic Park"];
const myList = document.querySelector("ul");
```

On a là notre liste de films, et "ul" est déjà sélectionné.

Maintenant, on va parcourir notre liste avec forEach, avec "movie" en paramètre de fonction callback/variable temporaire.

Dans ce forEach, on va créer l'élément movieItem, de type "li", qui sera greffé, comme c'est toujours le cas au début à l'objet "document". Ensuite, on va créer un élément "li" chaque fois que "movie" "rappelle" une élément de "movies" et lui donnant la valeur de l'élément via textContent. Une fois que c'est fait, on "décroche" movieItem pour le raccrocher à myList, qu'on a créé en désignant l'élément "ul" : 

```javascript
movies.forEach(movie => {
    const movieItem = document.createElement("li");
    movieItem.textContent = movie;
    myList.appendChild(movieItem);
});
```
Et si on ajoute le code comme expliquer dans le fichier JS... ça donne trois films qui s'ajoutent, sans aucun style ! C'est moche, hein ?

Pas de panique, voici comment régler le souci ! On crée une fonction (au nom infâme, je le concède), qui reprend tous les styles de listItemByTag et de listItemByTagQuery (on avait utilisé les deux pour montrer les deux sélecteurs) :

```javascript
function applyListItemStyle(item) {
    item.style.color = "#1976D2";
    item.style.fontSize = "24px";
    item.style.fontFamily = "'Arial', sans-serif";
    item.style.marginBottom = "10px";
    item.style.fontFamily = "1px solid #BDBDBD";
    item.style.backgroundColor = "#E0F2F1";
    item.style.padding = "10px";
    item.style.borderRadius = "5px";
    item.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
}
```

Et puis, dans notre fonction de rappel movies, on ajoute notre fonction avec "movieItem" en argument juste avant de décrocher "movieItem" de l'objet document :

```javascript
const movies = ["Lord of the Ring", "Ready Player One", "Jurassic Park"];
const myList = document.querySelector("ul");
movies.forEach(movie => {
    const movieItem = document.createElement("li");
    movieItem.textContent = movie;
    applyListItemStyle(movieItem);  // Notre fonction est ici
    myList.appendChild(movieItem);
});
```
##### 2.2.8.2 Ajouter du contenu à un endroit précis du DOM

Nous l'avons vu, .createElement nous permet de créer des éléments, et de l'ajouter avec .appendChild à l'élément duquel il doit "dépendre". Et si on fait ça au document, ça ira à la toute fin du document. Mais comment faire alors pour ajouter du contenu au document, mais autre part qu'à la fin ? DIt autrement, entre deux éléments pré-existants ?

Disons qu'on veut créer un paragraphe à mettre après le titre, "Liste des films à voir une fois dans sa vie". On commence comme d'habitude par créer un nouvel élément par une variable.

```javascript
const newParagraph = document.createElement("p");
newParagraph.textContent = "Liste des films à voir une fois dans sa vie";
```

Maintenant, on va avoir deux lignes qui ont l'air compliquées, mais qui ne le sont pas tellement. Iva s'agir :

1. De préciser que newParagraph doit bien se raccrocher quelque part, et que si on veut qu'il soit au même niveau que "main-heading", qu'on doit viser dans le DOM le parent de mainHeading. Avec le même parent, newParagraph et mainParent sont "de la même fratrie.

2. On utlise sur cet élément parent qu'on vvient de créer, parentElement, la méthode ".insertBefore(); qui prend deux arguments : ce qu'on va insérer (ici, newPragraph), et le fait qu'on va l'insérer "jsute avant le noeud qui vient après "mainHeading". C'est pas clair ? VOyons le code :

```javascript
const parentElement1 = mainHeading.parentNode;
parentElement1.insertBefore(newParagraph, mainHeading.nextSibling);
```

Une autre manière de comprendr la seconde ligne, c'est que l'on dit de caler newParagraphe entre mainHeading le prochain élément de même niveau; dit autrement "pile sur le point" de "mainHeading.nextSibling" !

###### 2.2.8.3 Ajouter les éléments au début

Rien de bien compliqué, regardons le code à appliquer :


```javascript
const anotherParagraph = document.createElement("p");
anotherParagraph.textContent = "Pour introduire notre sujet, voici :";

const parentElement2 = mainHeading.parentNode;
parentElement2.insertBefore(anotherParagraph, mainHeading);
```

Si vous avez bien observé, l'argument "mainHeading.nextSibling" est simplement changé par "mainHeading", vu que la limite absolue es tmaitnenant "mainHeading" avant lequel on doit entrer notre paragraphe.

Ces ajouts dans app.js ne ressemblent à rien une fois affichés, l'esthétisme n'est pas le but recherché ici; on veut juste montrer comment ajouter des éléments.

#### 2.2.9 Retirer du contenu

Cette étape va être confondante de facilité, comme c'est toujours le cas qund on "détruit". Il suffit d"utiliser la méthode .remove(); qui serait en quelque sorte le .pop(); du DOM, le ciblage en plus.

###### 2.2.9.1 Retirer un élément

Imaginons que l'on veuille retirer le h1. Pour ce faire, il suffit de le cibler (sans ciblage préalable, on ne sait rien modifier du DOM), puis on y applique la méthode .remove();. 

RAPPELLEZ-VOUS : pour cibler un élément, on crée une variable, on part du document, on utilise la méthode de sélection la plus adaptée et on met en argument ce qui permet d'identifier notre élément ! Après, il suffit de réutiliser notre variable pour y appliquer notre méthode de suppression.

```javascript
const mainHeading = document.getElementById("main-heading");
mainHeading.remove();
```
On veut retirer la liste ? Vu qu'elle a déjà été pointée avec myList, il suffit d'appliquer la bonne méthode !

```javascript
myList.remove();
```

###### 2.2.9.2 Retirer plusieurs éléments

Maintenant, je veux retirer plusieurs éléments de ma liste de films, ceux que j'ai ajouté avec LotR, Ready Player One ou Jurassic Park. Pour rappel, voici la fonction qu'on a utilisé :

```javascript
const movies = ["Lord of the Ring", "Ready Player One", "Jurassic Park"];
const myList = document.querySelector("ul");
movies.forEach(movie => {
    const movieItem = document.createElement("li");
    movieItem.textContent = movie;
    applyListItemStyle(movieItem);  // Notre fonction est ici
    myList.appendChild(movieItem);
});
```
Et mauvaise nouvelle, faire 

```javascript
movieItem.remove();
```

Ne va rien retirer ! 

Pourquoi ? parce qu'il faut d'abord re-parcourir notre liste ! Et pour ça on va utiliser un forEach, qui va récupérer tous les éléments de notre liste, pour ensuite les comparer à notre tableau. Pour bien comprendre comment fonctionne le code ci-dessous, il faut se dire qu'on part de la liste et qu'on la compare au tableau, comme si on se demandait "tiens, est-ce que des éléments de notre liste sont dans notre tableau de référence ?"; et si oui, on les retire !

```javascript
const allLiItems = document.querySelectorAll("ul li"); // Notez d'ailleurs la manière dont on pointe "ul li", comme on le ferait en CSS !

allLiItems.forEach(item => {
    if (movies.includes(item.textContent)) {
        item.remove();
    }
});
```

#### 2.2.10 Modifier des éléments

Nous avons vu jusque maintenant,  comment sélectionner des éléments, modifier leur style, créer des éléments ui n'existaient pas ou retirer des éléments existants.

Maintenant, on va voir comment *modifier* un contenu textuel ! Et pour ce faire, on va se servir à nouveau des attributs innerText et innerHTML, que nous avons vus au **point 2.2.7**, c'est à dire, soit en modifiant directement le texte et que le texte ciblé, soit en prenant en compte l'environnement HTML dans lequel il se situe, en prenant en compte les balises imbriquées dans son environnement.

Imaginons que nous avions cette simplicime balise :

```html
<h1 id="hello-world">Hello <span> world</span></h1>
```

Nous savons dores et déjà que :

```javascript
const helloWorld = document.getElementById("hello-world");
console.log(helloWorld.innerHTML);
```

Renverra le contenu 'Hello <span> world</span>', c'est-à-dire tout le contenu HTML à l'intérieur de l'élément h1 (vu que l'id 'hello-world' renvoie à cette balise)";

Et que :

```javascript
const helloWorld = document.getElementById("hello-world");
console.log(helloWorld.innerText);
```

Renverra juste "Hello world", donc tous les éléments textuels visibles de hello-world compris entre les balises h1 (vu que l'id renvoie à la balise), mais sans s'embarrasser de la structure html.

Maintenant, pour faire la modifcation, rien de plus simple !

D'abord en innerText :

```javascript
const helloWorld = document.getElementById("hello-world");
helloWorld.innerText = "hello universe";
console.log(helloWorld.innerText);
```
Qui retournera "Hello universe" !

Et maintenant innerHTML :

```javascript
const helloWorld = document.getElementById("hello-world");
const spanElement = helloWorld.querySelector("span");
spanElement.innerHTML = "universe"; 
console.log(helloWorld.innerHTML);
```

Qui retournera "Hello <span>universe</span>" !

##### 2.2.11 Attributs et classes

Nous venons d'apprendre à modifier des éléments textuels, soit en passant par le innerText, soit par le innerHTML, le second cas nous permettant carément de supprimer ou ajouter des balises à notre guise !

Et en parlant de modifications de balises HTML, au delà de les créer et de les supprimer à l'envie, si on jouait avec attributs, en les créant, modifiant ou supprimant ? 

Voyons d'abord comment ajouter, modifier, et enfin, retirer un attribut !

###### 2.2.11.1 Ajouter, modifier, et retirer des attributs

Partons du principe que j'ai la balise dans le code HTML. Je veux lui donner un Id pour permettre des modifications :

<p>Hello <span>world</span></p>

Pour lui **ajouter un Id**,par exemple, voici le code :

```javascript
const futureAttribute = document.querySelector("p");
futureAttribute.setAttribute("id", "hello-world");
```

Comme d'habitude, on sélectionne notre cher élément avec la méthode adéquate, puis on utilise .setAtribute où on a ena rguments l'attribut qu'on veut créer, puis la valeur à lui donner.

NB, on modifie l'attribut de la même manière.

Pour **retrouver l'Id**, ou tout autre attribut, en partant de notre exemple précédent, voici la ligne de code :

```javascript
const futureAttribute = document.querySelector("p");
const retrievedId = futureAttribute.getAttribute("id");
console.log(retrievedId); 
```
Même si elle n'est pas absolument nécessaire, j'ai reprécisé la première ligne qui désigne notre élément. La seconde ligne, elle, crée la variable "retrivedAttribute" dans laquelle on va stocker la valeur de l'id de "futureAttribute" acquise via .getAttribute("id") (notons ici encore une fois l'attribut qu"on veut récupérer entre parenthèses); tandis que la troisième ligne nous permet dans le plus grand des calmes d'avoir un retour console de ladite valeur !

**Question :** quelle peut être l'utilité de getAttribute ? 

Vu de l'extérieur, ça peut sembler étrange d'utiliser cette méthode : soit on relit le code html, soit on relit le code JS pour retrouver les .setAttribute. En réalité, c'est très utile d'avoir ce retour : 

1. Il permet déjà de aprcourir plus efficacement un code qu'on ne connait pas
2. Dans un code dynamique, ça permet de mettre le doigt plus facilement sur certains éléments
3. Quand on construit ses interractions, ça peut aider à retrouver plus vite l'élément à rendre interractif

Enfin, pour **supprimer un Id** ou tout autre attribut, voici le code :

```javascript
const futureAttribute = document.querySelector("p");
futureAttribute.removeAttribute("id");
```
Là, c'est revenir à la case départ avec :

<p>Hello <span>world</span></p>

###### 2.2.11.2 Les méthodes de la modification de classes

Attaquons-nous maintenant à un attribut particulier et très important : les classes !

Leur manipulation mérite une section particulière car elle a ses propres méthodes et le sujet est assez complexe, en ceci que modifier une classe se joue ici sur un *ensemble* d'éléments, et qu'un élément peut appartenir à *plusieurs* classes, d'où le besoin de savoir ce que l'on fait !

**La découverte d'un nouvel objet, le classList**

Rappelons-nous d'abord qu'en JS, tout, absolument tout est un objet. Et dans le cadre du DOM, nous avons déjà croisé quatre objets différents ayant des comportements d'Array :

* Array, le tableau de base
* nodeList, un cousin du array sur lequel on peut appliquer qu'une aprtie des émthodes array
* collectionHTML, sur lequel on ne sait appliquer que très peu de méthodes array, sans passer par une "conversion".

Ici, nous ajouter le **classList** qui va avoir ses propres méthodes !

Déjà, il peut nous aider à retourner les classes d'un élément.

Prenons notre ami <p>Hello world</p>, et désignons-le pour tenter d'ena voir la classe :

```javascript
const parag = document.querySelector("p");
console.log(parag.classList);
```

Et ça va nous retourner, roulement de tambours...

```javascript
DOMTokenList [ ]
```

Parce qu'il y a aucune classe définie !

Mais si maintenant on a :

<p class="paragraph">Hello world</p>

```javascript
const parag = document.querySelector("p");
console.log(parag.classList);
```
On aura en output :

```javascript
DOMTokenList ["paragraph"]
```

Bon, repartons sur notre <p> "anonyme", sans class, et ajoutons lui une classe. On aprt de :

<p>Hello world</p>

Et on fait ceci :

```javascript
const parag = document.querySelector("p");
parag.classList.add("hello");
```

Ça nous donnera <p id = "hello">Hello world</p>

Et on peut y ajouter une autre classe :

```javascript
parag.classList.add("goodbye");
```
Ça nous donnera <p id = "hello goodbye">Hello world</p>

Et si on fait 

```javascript
const parag = document.querySelector("p");
console.log(parag.classList);
```

On aura en output :

```javascript
DOMTokenList ["hello","goodbye"]
```

Et si je décide que <p> ne doit aps avoir comme classes "hello goodbye", mais "on two three" ?

Il suffit de réécrire par dessus, avec **className** !

```javascript
parag.className = "one two three";
```
Ce qui renverra en html :

<p class="one two three">Hello world</p>

et en DOM :

```javascript
const parag = document.querySelector("p");
console.log(parag.classList);
```

On aura en output :

```javascript
DOMTokenList ["one","two", "three"]
```

Continuons sur cette lancée et imaginant que maintenant, nous voudrions **supprimer** une des classes, "two" par exemple. Pour ce faire, on utlise la méthode *.classList.remove()* avec en argument la classe à retirer :

```javascript
mainHeading.classList.remove("two");
console.log(mainHeading.classList);
```
On aura en output :

```javascript
DOMTokenList ["one", "three"]
```

Maintenant, si on se rappelle de la méthode .includes() qu'on applique aux arrays et qui renvoie un booléen, la méthode **.contains()** avec en argument le nom d'une classe, pour savoir si notre élément a cette classe ou non. La réponse sera "true" ou "false".

En repartant de ce qu'on vient de faire

```javascript
mainHeading.classList.contains("one");
console.log(mainHeading.classList.contains("one")); //Pour afficher dans la console
```

```javascript
mainHeading.classList.contains("two");
console.log(mainHeading.classList.contains("two")); //Pour afficher dans la console
```

Enfin, dernière méthode pour manipuler les .classList, le **.toggle();** qui est très particulier ! Son truc à lui ? Passer en revue les différentes classes attachées à un élément, avec en argument une classe donnée. L'élément n'inclut aucune de ces classes ? Elle est incluse ! 

A contrario, elle comprend la classe ? Elles est supprimée ! L'idée ici est vraiment de faire "l'inverse".

```javascript
mainHeading.classList.toggle("two"); //Ça ajoutera "two" à toutes les classe qui s'appliquent à mainHeading !
mainHeading.classList.toggle("three"); //Ça retirera "three" à toutes les classe qui s'appliquent à mainHeading !
```

Et là, le 

```javascript
console.log(mainHeading.classList);
```

Affichera :

DOMTokenList(2) ['one', 'two', value: 'one two']

Car on a d'abord ajouté "two" à la suite "one three", puis on a retiré "three" !

**L'attribut data-x**

Nous allons voir ici un attribut tout particulier, l'attribut **"data-*"**. On le croise souvent dans du code HTML dans des balises : data-quelquechose = ... Cet attribut est en fait un attribut "custom", inclus dans son code apr le dev, comme des sortes d'anotations,et n'a pas d'effet concret dans le code HTML, contrairement à des attributs href, height, src, ... Non, ici dans le HTML, il ne sert à rien.

C'est dans le DOM qu'il va avoir toute son utilité ! En effet, imaginons que nous voulions que nos éléments devienennt transparents, qu'ils aillent dans des directions,et que l'on veuille rpéciser ces directions. EN pseudocode, ça donne :

    Go to opacity 0;
    variable direction = data-direction
    Move to : direction

Avec l'atribut data-direction, ça devient possible :

```html
<div data-direction="top">This div goes to the top</div>
<div data-direction="left">This div goes to the left</div>
<div data-direction="right">This div goes to the right</div>
<div data-direction="bottom">This div goes to the bottom</div>
```

Tous les data-* d'un élément sont en fait "stockés" dans un objet attaché à cet élément, le "dataset". 

Imaginons cet élément, qui a une classe et deux data-* :

```html
<div class="block" data-direction="top" data-duration="400">
  This div goes to the top
</div>
```

Pour avoir le dataset, rien de plus simple, on désigne l'élément visé par une const, puis on applique la bonne méthode :

```javascript
const block = document.querySelector(".block");
console.log(block.dataset);
```

ce qui retournera :

{
    direction: "top",
    duration: "400"
}

Enfin, dans son code JS, on peut mettre en place certaines conditions pour vérifier si un élément répond à pluieurs conditions relatives au dataset afin d'exécuter des actions spécifiques. 

Exemple :

```javascript
if (block.dataset.direction === "top" && block.dataset.duration === "400") {
  // Do something nice !
}
```

ici, pour faire "quelque chose de nice", il faut que que les datasets aient comme valeur "top" pour la direction; et "400" pour la duration.

##### 2.2.12 La navigation dynamique

Faisons le point. Nous avons vu baucoup de choses : le DOM, les sélecteurs, comment ajouter ou retirer des éléments, modifier les éléments textuels, les attributs et j'en passe. Nous aovns déjà fait un premier énome tour sur la théorie, et tout ça envoie à notre arbre, le DOM.

Jusqu'à présent, nous avons navigué avec cette vue surplombante, avec tout le DOM en tête (ou du moins sous les yeux), à désigner à chaque fois de cette vue générale l'élément sur lequel on veut travailler.

Nous allons maintenant voir qu'il y a moyen de passer d'un élément à un autre... à partir d'un autre élément !

Impossible, dites-vous ? Pourtant, on l'a déjà fait ! La preuve ? Le point 2.2.8.2, quand on a pris des libertés avec le tuto BeCOde et que nou avons vus comment jouter les éléments là où on voulait !

Rappellez-vous de ces lignes :

```javascript
const newParagraph = document.createElement("p");
newParagraph.textContent = "Liste des films à voir une fois dans sa vie";
const parentElement1 = mainHeading.parentNode;
parentElement1.insertBefore(newParagraph, mainHeading.nextSibling);
```

Avec ça, on crée un paragraphe et on vient le caler entre mainHeading et... **nextSibiling**, qui sert à désigner le "frère" suivant dans le même niveau d'éléments !

Et on peut aller dans "quatre directions" : aller au niveau parent, le niveau enfant(s), "l'élément de la fratrie suivant" et "l'élément de la fratrie précédent" !

Passons ça en revue, en partant de notre index.html :

* Accéder au parent :

```javascript
const listItem = document.querySelector(".list-item"); // Sélectionne l'un des éléments <li>
const parentList = listItem.parentElement; // Accède à l'élément parent <ul>
```

* Accéder à l'enfant :

```javascript
const list = document.querySelector("ul"); // Sélectionne la balise <ul>
const childElements = list.children; // Obtient un tableau des éléments enfants (<li>)
```

* Accéder à l'élément suivant :

```javascript
const mainHeading = document.querySelector("#main-heading"); // Sélectionne l'élément "Favourite movies"
const nextElement = mainHeading.nextElementSibling; // Accède à l'élément suivant (<ul>)
```

* Accéder à l'élément précédent :

```javascript
const casinoElement = document.querySelector(".list-item:nth-child(3)"); // Sélectionne l'élément "Casino"
const previousElement = casinoElement.previousElementSibling; // Accède à l'élément précédent ("Braveheart")
```

### 2.3 Les event listeners

Nous avons vu les principales manifestations possibles dans le DOM, et grâce à elles, on sait déjà faire beaucoup de choses. Mais rappelez-vous du point **2.1** des raisons pour lesquelles ont pouvait faire toutes ces modifications, et qui donc peuvent les déclencher. QUand vous cliquez sur le bouton "mode nuit" de votre site préféré, la couleur de fond devient sombre et le texte clair. Ou lorsque vous venez de remplir un formulaire et de l'envoyer.

Et pour mettre en application toutes ces modifications, il faut des les **event listeners**, que nous pouvons aussi appeler en français *geestionnaire d'événements*. Et ces fameux événements peuvent être de natures bien différentes :

* Chargement de la page
* Un clic sur un élément précis du DOM
* Le survol d'un élément
* Le fait d'appuyer sur une touche rpécise du clavier
* Adapter l'affichage du navigateur
* Soumettre un formulaire
* ... et bien d'autres !

C'est comme les pièges avec les filets quia ttrapent leurs victimes dans un film : il faut bien que quelqu'un marche sur le fil pour déclencher le piège et donc le placer au bon endroit ! Eh bien, la liste au dessus, c'est une série de déclencheurs, et nous, nous allons aprendre à le mettre où il faut !

#### 2.3.1 l'attribut "onclick"

Un déclencheur basique est d'ajouter un attribut "onclick" à une  balsie html, comme par exemple :

```html
<p onclick="alert('I love JavaScript')">Click me!</p>
```

On remarque qu'il se décompose avec le nom de l'attribut et qu'on lui donne ici comme valeur un "alert".

Point positif : c'est vraiment pas dur à écrire !
Point négatif : en terme des séparationd es responsabilités, c'est pas fameux de mettre un attribut assimilable à un script dans le html. Il veut mieux faire ce genre de choses dnans le fichier JS, d'où la méthode **.addEventListener** que nous allons voir maintenant !

#### 2.3.2 .addEventListener();

Avec cette fonction, on retourne dans la logique du DOM. Imaginons que nous voulions que ce soit le clic sur un bouton qui déclenche notre événement. Il nous faut d'abord ésigner l'élément puis y associer notre méthode. En code, ça donne ceci :

```javascript
const button = document.querySelector("button"); // Cette ligne est tout ce qu'il y a de plus classique

button.addEventListener("click", () => { 
  alert("the button has been clicked");
});
```

La seconde partie du code est un chouïa technique : notre méthode .addEventListener prend deux arguments : son déclencheur, et la fonction déclenchée; cette fonction étant écrite sous forme de fonction fléchée, qui ne prend pas d'arguments dans le cas présent, d'où les parenthèses vides, allant directement sur ce qui est déclenché.

Par ailleurs, tout ce code peut aussi être écrit de manière nommée :

```javascript
const alertBtn = () => {
  alert("the button has been clicked");
};

button.addEventListener("click", alertBtn);
```
Là, la fonction est d'abord définie de manière nommée, puis implémentée à notre .addEventListener.

Enfin, voici une liste non-exhaustive des déclencheurs possibles :

* click
* change 
* mouseover
* mouseout
* keydown
* load
* submit

#### 2.3.3 La propagation d'événements

Nous avons vu comment déclencher ces modifications à partir de addEventListener(). Mais là on déclenchait qu'un seul événement, alors que l'on pourrait déclencher plusieurs événements, comme un jeu de réactions en chaîne avec une bille qui vient taper un domino qui déclenche un domino, qui propulserait une petite voiture qui... bref, on a tous vu ça dans un film au moins une fois !

Ici, on va appeler ça **Event bubling**, **Event delegation** et sera monitoré par **event object**. 

Voyons maintenant ces notions plsu en profondeur !

##### 2.3.3.1 Event bubling

Considérons ce bout de code :

```html
<div class="parent">
  <p>
    I am a child of my parent
    <button>I am a child of the paragraph</button>
  </p>
</div>
```

Notons déjà que notre bouton est inclus dans un paragraphe qui est dans une div. D'instinct on pourait se dire que c'est plus malin de mettre le bouton en dehos du paragraphe qui l'accompagne mais... faisons semblant de rien !

Maintenant ajoutons ce code JS :

```javascript
document.querySelector("button").addEventListener("click", () => {
  alert("button was clicked");
});
```

Si on clique sur le bouton, on a jsute l'alerte attendue. Mais si maintenant, on ajoute un .addEventListener qui fait que cliquer sur le paragraphe lance une autre alert, et qu'on écrit ce code à la suite directement :

```javascript
document.querySelector("button").addEventListener("click", () => {
  alert("button was clicked");
});

document.querySelector("p").addEventListener("click", () => {
  alert("paragraph was clicked");
});
```

Si on clique sur le bouton, les deux "alert" vont se déclencer, vu que le bouton est inclus dans le paragraphe !

Comment empêcher cette propagation, s'assurer qu'au niveau DOM, le bouton soit "isolé" du paragraphe paragraphe parent ? Pour ce faire, il faut voir deux choses : **l'event object** et la méthode **.stopPropagation()** qu'on va appliquer à ce même event object ! Pourquoi, comment ? Tentons d'y voir plus clair.

##### 2.3.3.2 Event object

Commençons avec la notion un peu spécifique d'object event. Enf ait, quand vous lancez un eventListener, vous générez aussi un event object qui lui est associé, qui est une sorte de rapport circonstancié de tout ce qu'il s'est passé. 

Si vous lancez ce code :

```javascript
element.addEventListener("click", function () {
  // Some code...
});
```
Et ce code en plus :

```javascript
document.querySelector("button").addEventListener("click", (event) => {
  console.log(event);
});
```

Vous allez générer dans la console une suite de données qui sont hors de notre portée actuellement. Il s'agit de décrire par le menu tout ce qu'il s'est passé avec un simple clic sur le bouton. Non, ne perdez pas votre temps à lire tout ça, vous allez juste y perdre des neurones. La seule chose qui nous intéresse, c'est que, quand on enclenche un déclencheur, JS prévoit de faire un objet avec une sorte de feedback de ce qu'il s'est passé.

##### 2.3.3.2 stopPropagation();

Vous avez cette idée de rapport bien en tête ? Nickel ! Je vais commencer par vous donner le code pour "isoler" le bouton du paragraphe, puis vous expliquer les passages un peu techniques, mais qui en réalité sont plus complexes à bien lire qu'à comprendre :

```javascript
const button = document.querySelector("button");
const p = document.querySelector("p");

button.addEventListener("click", (e) => {
  e.stopPropagation();
  alert("button was clicked");
});

p.addEventListener("click", () => {
  alert("paragraph was clicked");
});
```

Vous voyez la partie de code consacrée au bouton ? On a ajouté un argument à notre addEventListener, en plus du déclencheur, pour marquer le rapport, qui nous sert ensuite pour utiliser la méthode e.stopPropagation(). Ce qui est important ici, c'est pas qu'on ait utilisé "e". En réalité, on aurait pu appeler ça "pissenlit", "soleil" ou "monCulSurLaCommode" que ça n'aurait rien changé (hormis de passer pour des guignols). Non, ce quie st important, c'est que peu importe la veleur qu'onr enseigne, c'est que ça se réfère à notre fameux event object ! Et en appliquant à notre event object la méthode .stopPropagation(), c'est comme si on posait sa main sur l'épaule de JS et qu'on lui disait au niveau du DOM "eh bonhomme, c'est bon, tu m'as rentré un joli rapport, pas besoin de faire plus, arrête-toi là, je sais que t'es un bon, pas besoin d'en faire des caisses !".

##### 2.3.3.3 event delegation

Imaginons ce code :

```html
<div class="parent">
  <button>One</button>
  <button>Two</button>
  <button>Three</button>
  <button>Four</button>
  <button>Five</button>
  <button>Six</button>
  <button>Seven</button>
  <button>Eight</button>
</div>
```

Si je vous demandais de créer manuellement une classe pour chacun des boutons, en le désignant auparavant, vous me diriez d'aller me faire foutre non ? Vous auriez raison ! Et histoire d'enfoncer le clou, vous me sortiriez cette boucle :

```javascript
const buttons = document.querySelectorAll(".parent button");

buttons.forEach((button, index) => {
  button.classList.add(`button`);
});
```

Et là, ce serait à mon tour de m'eclafer de rire en vous traitant d'ignorants ! Car si votre boucle est bonne, il y a une autre "stratégie", encore plus esthétique, il s'agit de l'**event delegation** !

Vous vous rappelez quand on a vu que cliquer sur un enfant, si on ne fait pas gaffe, c'est cliquer sur son aprent par bubling ? ici, on va tourner ce phénomène à notre avantage ! Avc e.stopPropagation(), on évitait de remonter au parent. Ici, avec e.target, on va relier chaque bouton à "l'interrupteur" qui est sur .pareent et lee déclencher "à distance" !

On va utiliser ce code et l'expliquer :

```javascript
const parentDiv = document.querySelector(".parent");

parentDiv.addEventListener("click", (e) => {
    if (e.target.innerText === "One") {
      alert("You clicked the first button");
    }
  
    if (e.target.innerText === "Two") {
      alert("You clicked the second button");
    }
  
    if (e.target.innerText === "Three") {
      alert("You clicked the third button");
    }
    
    if (e.target.innerText === "Four") {
      alert("You clicked the fourth button");
    }
    
    if (e.target.innerText === "Five") {
      alert("You clicked the fifth button");
    }
    
    if (e.target.innerText === "Six") {
      alert("You clicked the sixth button");
    }
    
    if (e.target.innerText === "Seven") {
      alert("You clicked the seventh button");
    }
    
    if (e.target.innerText === "Eight") {
      alert("You clicked the eighth button");
    }
});
```

En reprennant le premier élément :

```javascript
parent.addEventListener("click", (e) => {
  if (e.target.innerText === "One") {
    alert("You clicked the first button");
  }
});
```

On retrouve une méthode .addEventListener(); avec ses deux arguments, à savoir son déclencheur (le clic), et notre cher rapport object event, en tant qu'argument de la fonction de rappel qui se déclenche qand on appelle l'événement ! Et sa seconde ligne, condition mise à part, contient un point important : **e.target**.innerText, qui renvoie sur un des boutons spécifique de la classe, ce qui déclenche l'eventListener attaché au parent, vu qu'on "remonte" du bouton au parent !

##### 2.3.3.4 remove event listener

Enfin, si on souhaite à un moment retier un eventListener, on peut le faire avec removeEventListener. La seule condition ? Avoir déclarée la fonctiond e manière explicite comme ici :

```javascript
const maFonction = () => {
    console.log("Clic détecté !");
};

element.addEventListener("click", maFonction);

// Plus tard, si vous souhaitez retirer cet écouteur d'événement, il vous suffit d'utiliser :

element.removeEventListener("click", maFonction);
```

###### Mais quand utiliser le removeEventListener ?

Pour ça, il suffit d'imaginer une page qui rpend en comtpe l'affichage de scores en live d'un match, où on enregistre le score manuellement en direct. Dès qu'un joueur atteint le score nécessaire pour gagner un jeu, on fait en sorte que j'ajout de points dans ledit jeu devienne impossible.

### 2.4 Les forms

Nous allons attaquer ici un autre gros morceau, celui des formulaires ! Les formulaires sont partout sur Internet : pour indiquer où livrer vos commandes, vous logger à votre boite mail, aider un étudiant à répondre à son enquête pour son mémoire avec Google Form, pour participer à un chat en ligne, ... tout ça est un formulaire ! Nous allons voir, avec le DOM, comment traiter concrètement ces informations... ou demander à ChatGPT de relire vos codes ou tutos !

Et la logique du form, TRÈS IMPORTANT, ne se limite pas à des champs à remplir avec un clavier ! Ils peuvent aussi prendre la forme de boutons, de radios, de checkboxes, ... c'est en fait très large ! 

Sur cette base, vous comprennez pourquoi il devient dès lors de saovir les manipuler efficacement avec le DOM, sous peine d'aovir des formulaires qui au mieux n'auront aucune utilité et seront au pire des passoires niveau sécurité.

Mais pour commencer, nous allons parler des deux méthodes pour soumettre des données à un formulaire, la méhode **GET** qui va de paire avec la notion de **queryString** et la méthode **Post**.

#### 2.4.1 GET, queryString et POST

Nous voilà dans la première partie de ce qui nous intéresse ! Tout ce qui rentre dans un form sera traité par une méthode, et ces méthodes sont au nombre de deux, le GET et le POST, qui vont traiter l'information dans deux optiques différentes. 

##### 2.4.1.1 POST

La méthode POST; va traiter l'information dans une optique de stockage. Si vous voulez un élément de comparaison, c'est comme faire un prompt avec JS et de stocker le résultat dans une variable donnée, quitte à s'en resservir plus tard. Mais là, pour continuer à filer la métaphore avec JS, on ne s'intéresse pas à un éventuel output. Le but ici, c'est qu'une information doit être enregistrée quelque part.

##### 2.4.1.2 GET

La méthode GET, pour sa part, s'utilise si on veut que les données rentrées dans un form nous sortent un output donné. Vous vous rappelez quand on codait des algorithmes qui nous renvoyaient quelque chose quand on entrait une donnée (c'était par ailleurs codé principalement comme un switch) ? C'est la philosophie du GET ! On entre quelque chose dans le form pour obtenir quelque chose en retour !

Et le GET va de paire avec le "query string", qui est en quelque sorte la preuve que le site que vous consultez prend en compte les données entrées dans le form.

Par exemple, regarder cet url :

https://www.youtube.com/watch?v=2O8pkybH6po&ab_channel=BroCode

Ils se décompose enf ait en trois parties :

https://www.youtube.com/watch --> Le lien de base

v=2O8pkybH6po --> La référence à la vidéo (précédé d'un "?")

ab_channel=BroCode --> La chaine qui a posté (précédé d'un "&")


... On remarque que le lien comprend toute une longue partie, la fameuse query string, qui comprend deux paires clé/données, à la façon d'un objet. Et toute l'astuce repose dans le fait que, quand on clique sur un lien, on enclenche en fait un .get() qui va nous chercher la vidéo en tenant compte de deux paramètres : la chaîne de caractères sous laquelle Toutube l'a enregistrée et le nom de la chaine d'où elle provient ! En gros, la miniature sur laquelle on a cliqué est une sorte de "bouton" muni de la méthode .get() !

Autre exemple : acheter des chaussures New Balance :

https://www.newbalance.be/fr/hommes/chaussures/made-in-uk-us/?prefn1=mensFootwearSize&prefv1=38.5&prefn2=refinementColor&prefv2=Beige

On décompose le lien comme suit :

https://www.newbalance.be/fr/hommes/chaussures/made-in-uk-us/ --> l'URL de base

prefn1=mensFootwearSize --> la partie de la query string qui précise par filtre le genre de chaussure

prefv1=38.5 --> la partie de la query string qui précise par filtre la pointure

prefn2=refinementColor  --> la partie de la query string qui précise par filtre un choix de couleur

prefv2=Beige  --> la partie de la query string qui précise par filtre la couleur précise

Là, ce sont les filtres sur un site marchand !

###### Attendez... un bouton peut avoir une autre méthode du DOM que addEventListener ?

Eh oui ! Si nous avons vu à présent que des usages front-end du DOM, il a aussi des usages back-en, .get(); and .post(); étant les deux façons d'interragir avec la base de données ! Mais nous verrons ça dans un autre tuto ! Retenez juste ici qu'un bouton peut avoir le comportement d'un form. D'ailleurs, les méthodes .form(); et .post(); ne sont pass des méthodes JavaScript, mais des méthodes HTTP, qui soumettent les demandes faites par formulaire au serveur.

De plus, le bouton lié à un formulaire est de type submit, et le bouton ""normal" est de type, bah... button !

##### 2.4.1.3 action de forumlaire

Dernier point à prendre en considération ici : **l'action de fromulaire** qui nous sert à indiquer où les informations du form doivent être envoyées : une autre page, un script JS pour vérifier si votre paire identifiant/mot de passe est valide, etc. Pour comparer, imaginez un escl... employé d'entrepôt Amazon : il doit savoir où chercher tel ou tel produit pour aller le chercher et préparer un colis ! Sans ça, il va rester avec vos isntructions et... aller nulle part. 

##### 2.4.1.4 petit refresh sur les form en HTML

Si nous allons manipuler des forms HTML, la moindre des choses est de biens e rappeler de la manière de les écrire, et de leurs attributs.

La base pour créer un form est la balise form :

```html
<form></form>
```

Dedans, on pet deux balises : la balise "label" qui sert de nom auquel on va associer un "input" :

```html
<form>
  <label>First name:</label>
  <input type="text"> 
</form>
```

Ici, on aura indiqué "First name: [boite d'input]".

Mais pour bien faire, les deux doivent être liés avec l'attribut "for" dans le label et "id" dns l'input, avec la même valeur dans les deux :

```html
<form>
  <label for="fname">First name:</label>
  <input type="text" id="fname"> 
</form>
```

Ainsi, quand on clique sur le texte "First name:", on peut remplir la boite. 

Maintenant ajoutons l'attribut "name" qui lui va aider à stocker les données entrées ici au bon endroit dans la base de donnée, dans la bonne "colonne" (si on considère que chaque ligne concerne un utilisateur); c'est une sorte de lien avec le back end :

```html
<form>
  <label for="fname" name="fname">First name:</label>
  <input type="text" id="fname"> 
</form>
```

Enfin, l'attribut "placeholder" quant à lui permet qu'il y ait un petit quelque chsoe d'écrit dans le champ à remplir, en attendant qu'on y note quelque chose.

```html
<form>
  <label for="fname">First name:</label>
  <input type="text" id="fname" name="fname" placeholder="First name"> 
</form>
```

Et dans la même balise "form", on va aussi mettre les balises label et input du nom de famille, en prenant soin de mettre chaque paire label/input dans sa propre div !

```html
<form>
  <div>
    <label for="fname">First name:</label>
    <input type="text" id="fname" name="fname" placeholder="First name"> 
  </div>

<br>

  <div>
    <label for="lname">Last name:</label>
    <input type="text" id="lname" name="lname" placeholder="Last name">
  </div>
</form>
```

Maintenant on va rajouter en dessous un bouton, qu'on va changer de type au fur et à mesure !

D'abord, va pour un bouton "reset" :

```html
<form>
  <div>
    <label for="fname">First name:</label>
    <input type="text" id="fname" name="fname" placeholder="First name"> 
  </div>

<br>

  <div>
    <label for="lname">Last name:</label>
    <input type="text" id="lname" name="lname" placeholder="Last name">
  </div>

<br>

  <div>
    <input type="reset">
  </div>

</form>
```

Quand on clique deçu, ça réinitialise tout ce qu'on aurait déjà rentré comme infos.

Maintenant, on va rajouter un submit :

```html
<form>
  <div>
    <label for="fname">First name:</label>
    <input type="text" id="fname" name="fname" placeholder="First name"> 
  </div>

<br>

  <div>
    <label for="lname">Last name:</label>
    <input type="text" id="lname" name="lname" placeholder="Last name">
  </div>

<br>

  <div>
    <input type="reset">
  </div>

<br>

  <div>
    <input type="submit">
  </div>

</form>
```

Lui sert à  soumettre notre formulaire là où il faut ! Mais petit souci : quand on clique, bah ça va nulle aprt ! Pour régler ça, il faut ajouter un attribut à notre première balise, celle qui ouvre le form, pour indiquer où l'envoyer et avec quelle méthode !

```html
<form action="action_page.php"  method="POST">
  <div>
    <label for="fname">First name:</label>
    <input type="text" id="fname" name="fname" placeholder="First name"> 
  </div>

<br>

  <div>
    <label for="lname">Last name:</label>
    <input type="text" id="lname" name="lname" placeholder="Last name">
  </div>

<br>

  <div>
    <input type="reset">
  </div>

<br>

  <div>
    <input type="submit">
  </div>

</form>
```

Ici, on fait le lien avec la matière vue jsute avant avec "action", "GET" et "POST", on indique l'endroit où il faut envoyer ces informaitons ! D'ailleurs, si on utlise le FORM ici, c'est pour éviter que les infos entrées en GET se retrouvent dans l'URL sous form de query list en toute insoucience !

Et dans un ordre d'idée plus simple, vous voulez es infos obligatoires dans votre iput ? Ajoutez juste l'argument "required" !

```html
<form action="action_page.php"  method="POST">
  <div>
    <label for="fname">First name:</label>
    <input type="text" id="fname" name="fname" placeholder="First name" required> 
  </div>

<br>

  <div>
    <label for="lname">Last name:</label>
    <input type="text" id="lname" name="lname" placeholder="Last name" required>
  </div>

<br>

  <div>
    <input type="reset">
  </div>

<br>

  <div>
    <input type="submit">
  </div>

</form>
```

Un autre type attribute dans les input quie st très utilses, c'est password : ici votre texte sera "caché" :

```html
  <div>
    <label for="password">password:</label>
    <input type="password" id="password" name="password" placeholder="password" required>
  </div>
```

Et nous pouvons y ajouter aussi l'attribut "maxlengh" qui limite le nombre de caractères (tout ça nous rappelle furieusement les méthodes sur les string en JS !) :

```html
  <div>
    <label for="password">password:</label>
    <input type="password" id="password" name="password" placeholder="password" maxlengh="12" required>
  </div>
```

Ici, la limite es tà 12 caractères.

D'autres id attributes intéressants sont "tel" pour enregistrer un numéro de téléphone, "email" qui permet d'enregistrer un email, ou une date anniversaire : 

```html
  <div>
    <label for="phone">phone #:</label>
    <input type="tel" id="phone" name="phone" placeholder="(123)-456-789" maxlengh="9" required>
  </div>
```

```html
  <div>
    <label for="email">email:</label>
    <input type="email" id="email" name="email" placeholder="jeandupont@exemple.com" required>
  </div>
```

```html
  <div>
    <label for="bdate">brithdate:</label>
    <input type="date" id="bdate" name="bdate" required>
  </div>
```

Il y a aussi l'id attribute pour entrer un nombre, une quantité, en fixant un minimum et un maximum pour éviter de se retrouver avec des données fantaisistes, sans oublier une valeur par défaut :

```html
  <div>
    <label for="quantity">quantity:</label>
    <input type="number" id="quantity" name="quantity" min="0" max="99" value="1">
  </div>
```

Maintenant, passons aux boutons radio, où on ne peut cliquer que sur un seul bouton, dans une liste de choix (par exemple, pour indiuer notre niveau d'études) :

```html
<form>
  <label>Mr.</label>
  <input type="radio" name="title">
  
  <label>Ms.</label>
  <input type="radio" name="title">

  <label>PhD.</label>
  <input type="radio" name="title">
</form>
```

Notez ici l'attribut "tittle" qui fait que l'on marque son choix parmi ces trois éléments !

D'ailleurs, voici une autre manière de noter ça, peut-être plus précise :

```html
<form>

  <label for="title">Title:</label>
  
  <label for="Mr.">Mr.</label>
  <input type="radio" id="Mr." name="title" value="Mr.">
  
  <label for="Ms.">Ms.</label>
  <input type="radio" id="Ms." name="title" value="Ms.">

  <label for="PhD.">PhD.</label>
  <input type="radio" id="Phd." name="title" value="PhD.">
</form>
```

Avant-dernier id atribute avoie, la checkbox, qui est le cousin de la radio, mais permetant un choiix multiple :
```html
<form>
  <label for="subscribe">subscribe:</label>
  <input type="checkbox" id="subscribe" name="subscribe">
</form>
```

Et dernier id atribute de cette section, le choix de moyen de payement !

```html
<form>

  <label for="payment">Payment:</label>
  <select id="payment" name="payment">
    <option value="visa">Visa</option>
    <option value="mastercard">Mastercard</option>
    <option value="giftcard">Giftcard</option>
    <option value="bancontact">ancontact</option>
</form>
```

##### 2.4.1.5 Retour au DOM

Alors, les forms, on a survécu à cette avalanche ? Si c'est le cas, on va maintenant mettre tout ça en pratique en utilisant tout ça vers le DOM, et voir comment manipuler/modifier les informations que l'on met dans un Form !

Mais pour comprendre ça, revenons un peu sur le "bubbling", aka la propagation; c'est à dire le fait que cliquer sur un élément enfant se propage à son parent. Si vous regardez les codes plus haut, le bouton 

```html
  <div>
    <input type="submit">
  </div>
```

Est entre les balises "form". Donc, quand on clique dessus, on étend la propagation de tout ce qui est entre les balises "form". Et quand on clique sur ce bouton, on enclenche du côté du form, s'il a bien été construit, un envoi vers une autre page, et du point de vue du DOM un event qui va rafraîchir la page. 

Or, comme tout event, on peut l'écouter, et choisir de le "figer" juste avant son envoi avec l'event "event.preventDefault()", commme avec le code ci-dessous :

```javascript
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents the page to submit the form (and therefore refresh the page)

  // Run some code then...
});
```

Dans ce code, tout se passe comme décrit : on sélectionne le form, et on écrit notre méthode d'eventListener avec l'évent à écouter (le submit), accompagné d'une fonction flécher qui nous dit que pour notre event submit, il faut arrêter la démarche "par défaut", qui consiste en DOM à rafraîchir la page.

Ainsi, on ne rafraichit rien au niveau du DOM, on n'envoie rien du point de vue du form et des méthodes HTTP GET et POST, mais on a toutes les données entrées dans le form sous la main pour pouvoir les manipuler, notamment pour vérifier si le Form a été correctement rempli, comme nous l'avons fait avec des tas d'algos JS qui transformaient des string !

##### 2.4.1.6 L'input value

On va commencer avec un concept assez simple, l'input value. Tout d'abord, on doit rappeler qu'avec javascript, dans le domaine du DOM, tout est un obejt, y compris un input de l'utilisateur. Et cet input a une propriété qui nous intéresse : "value", qui correspond à la valeur rentrée dans le champ d'input.

Considérons cette balise lancée dans un navigateur :


```html
<body>
    <input type="text" id="monInput" placeholder="Écrivez quelque chose ici...">
</body>
```

Et écrivons dans le champ adéquat ce que l'on veut, comme par exemple "Bonjour".

En lançant la console via l'inspecteur de Google Chrome, on peut rentrer la ligne suivante :

```javascript
let input = document.querySelector('#monInput');
```

Qui enregistrera la value "Bonjour dans la variable input.

Et quand, toujours dans la console, on tappera :

```javascript
input.value;
```

On aura en retour "Bonjour", vu qu'on demande là la value de notre fameuse variable "input".

Mais là où ça devient marrant, c'est quand on réassigne la value de notre variable "input" :

```javascript
input.value = "Bonsoir";
```

Grâce au DOM, on peut changer la valeur d'un input !

###### Certes. Mais à quoi ça peut servir ?

Les usages sont multiples : récupérer la valeur d'un input permet de voir si cet input est au bon format, à faire de l'autocompletion, à switcher du input type password à l'input type text sans changer la valeur, le "..." des chats qui permet de montrer qu'on écrit, l'autocompletion de Chrome, ... les usages sont multiples !

Et para ailleurs, quand nous disons que cette value permet de apsser de mot de passe à text sans changer de valeur, ça permet de comprendre que cette "value" ne s'applique pas qu'aux texte, mais aussi à bien d'autres éléments ! Password, radio, checkbox, ...

##### 2.4.1.7 L'inspecteur d'évenement "change"

Maintenant que nous avons su récupérer la valeur d'un input depuis la console et vu qu'on pouvait la modifier soit via l'input du navigateur, soit par une réassignation de valeur dans la console, ont peut aussi faire en certe que tout changement d'input soit pris en compte une fois que le champ a été rempli par une pression sur "enter", ou alors en cliquant hors du cadre de l'input. 

Pour ce faire, on va passer par le fichier JS plutôt que la console et copier/coller tout ce code :

```javascript
let inputValue = ""; // variable pour stocker la valeur de l'input

// Sélectionner l'élément input par son id
const inputElement = document.querySelector('#monInput');

// Ajouter un écouteur d'événements pour l'événement "change"
inputElement.addEventListener("change", function() {
    inputValue = this.value; // met à jour la variable inputValue avec la nouvelle valeur de l'input
    console.log(inputValue); // affiche la nouvelle valeur dans la console
});
```
Décomposons-le :

* La première ligne crée une variable attachée à rien, qui est vide;
* La seconde ligne, comme d'habitude, désigne l'élément que l'on prendr en considération;
* La troisième ligne est plus intéessante : on met un eventListener à notre élément "inputElement", et cet eventListener a "change" pour déclencheur et active à cuque changement la fonction :
* Attribuer à inputValue la valeur-même de ce qu'il y a dans le champ input (grosso modo, on lui dit "tu es ce que tu es", car "this" fait ici référence à l'élément déclencheur, qui est fatalement inputValue !);
* Ona ffiche dans la console ce changement.

Et chaque fois qu'on remplira l'input, et que ce remplissage sera considéré comme "fini" (clic en dehors du champ ou pressien sur Enter), on vera dans la console la valeur de inputValue changer !

###### D'accord. Mais encore une fois, à quoi ça peut servir ?

Ici aussi les usages sont multiples. Je vais en citer que quelques uns. Un exemple concret, sertait un site calculant la durée du jour et de la nuit, qui aurait deux menus déorulants : un pour le pays, et un autre pour la ville qui s'adapte dès que le pays a été choisi. Et si on change de pays, la lise des villes possibles change aussi ! 

Autre cas concret : la validation des formulaires ; au lieu d'attendre que l'utilisateurr ait tout rempli et cliqué sur "submit" avant de lui dire qu'il y a des trous dans le formulaires ou des données qui n'ont pas le bon format, autant lui dire directement s'il a mal rempli une section !

Enfin, ça peut eprmettre une sauvegarde automatique bien plus rapide.

##### 2.4.1.6 Forms et DOM : des exempels pratiques

Maintenant qu'on sait manipuler le DOM, et qu'on a des bases dans les Forms, je vous propose d'illsutrer la combinaison des deux au travers d'exemples concrets : je me suis rendu compte lors de l'exercice du Form que de faire des tâches de ces deux domaines en même temps peut être assez vite déroutant. Dès lors, je vous propose ici quelques cas de figures,e t la méthode utiliser pour els résoudre.

##### 2.4.1.6.1 Vérifier le bon format d'un input text

On demande à un utilisateur d'entrer un nom d'utilisateur, et on lui met certaines limites : pas moins de cinq lettres, pas plus de dix et pas de majuscules. COmment faire ? Pour ça analysons le code :

```javascript
let inputUsername = "";
const paragraphs = document.getElementsByClassName("msg"); //Donné comme consigne, mais j'ai pas su m'en servir...
const username = document.getElementById("username");
const pUsername = username.nextElementSibling;
username.addEventListener("change", function() {
    isValid = true;
    inputUsername = this.value; 
        if (inputUsername.length < 5 || inputUsername.length > 10) {
            isValid = false;
        } else if (/[A-Z]/.test(inputUsername)) {
            isValid = false;
        }
        if (isValid) {
            pUsername.innerText = "Valid username";
            pUsername.style.color = "green";
        } else {
            pUsername.innerText = "Enter a valid username";
            pUsername.style.color = "red";
        }
    });
```
On prévoit une variable "let" vide pour les inputs de l'utilisateur, qui pourra changer. On "vise" aussi l'élément "input"; et on vise aussi le paragraphe qui suit la zone d'input.

Ensuite, on lance notre écouteur d'événement avec "change" comme rpemier argument (bah oui, on va peut--être attendre que l'utilisateur ait fini de remplir la zone...), on précise d'abord une variable booléenne "isValid" qui commence par défaut sur "true". Ensuite, un if/else if, avec deux conditions : être entre cinq et dix caractères, et ensuite s'assurer qu'il n'y ait pas de majuscules (d'ailleurs, dites bonjour au Regex qui se cache là ! On en parle juste plus bas !). Après, on lance un autre if/else, qui lui va vérifier si isValid est passé en négatif avec els deux conditions précédentes ! Et si c'est le cas, notre "p" réagira en conséquence !

Un petit mot sur paragraphs : il est sensé désigner toutes les éléments p de l'exercice qui sont dans la même classe pour leur donner les mêmes comportements de couleurs, j'imagine. Me concentrant sur une démarche "étape après étape", je l'ai laissé de côté ici.

##### 2.4.1.6.2 Vérifier une adresse mail grâce au Regex

Tout ça nous permet de voir un nouveau point, le Regex !

Nous avons vu que pour trouver une suite de caractères précis dans une string, on peut utiliser les boucles. Problème, ça peut vite devenir technique.

Il existe une alternative, celle du Regex,diminutif de "regular expression", qui est une expression qui va "suivre des règles"; et dans le cas présent, ça va être écrire une adresse mail en respectant certaines règles.

Prenons l'adresse mail de thomas.dupont@adressemail.com

On remarque que, comme toutes les adresses mails, elle se compose de plusieurs parties :

thomas.dupont --> le nom de l'utilisateur

@ --> symbole qui sépare le nom de l'utilisateur du service de boite mail et qui permet de reconnaitre ici qu'on a affaire à une adresse mail

adressemail --> le nom de domaine du service mail

. --> le séparateur entre le nom de domaine et 

com --> le domaine de premier niveau, qui est sur le web, une manière de savoir à quel genre d'entité on a affaire en un coup d'œil : 

* Du commercial

* Du national

* Une organisation

* Un domaine particulier

Pour rendre tout ça en expression suivant une règle, on va utliser cette charmante ligne de code :

/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

Alors, c'est moche, ça a l'air incompréhensible, mais c'est pas bien compliqué, décomposons ça :

/^...$/ --> pour commencer, marque le début et la fin de la chaine à évaluer

[a-zA-Z0-9._-]+ --> est une première portion, qui se décompose en deux portions :

[a-zA-Z0-9._-] --> tous les caractères qui sont explicitement autorisés à figurer du côté gauche du symbole @

+ --> signifie que ces caractères peuvent être là en plusieurs exemplaires

Et la première portions encore en sous portions :

a-z --> toutes les minuscules de l'alphabet latin

A-Z --> toutes les majuscules de l'alphabet latin

0-9 --> tous les chiffres entre 0 et 9 inclus

._- --> les symboles . _ -


@ --> est hors crochets, ça indique donc qu'il est obligatoirement là, c'est pas une question de possibilité mais bien de nécessité

[a-zA-Z0-9.-] -->  indique les caractères qu'on peut utiliser pour désigner le service de messagerie

\. --> marque le point obligatoire avec \ devant le . pour bien le faire ressortir, le mettre en évidence

[a-zA-Z]{2,4} --> est la dernière section, composée de deux ensembles :

[a-zA-Z] --> les caractères de la dernière section, ici que des lettres

{2,4} --> le nombre de ces caractères qu'on peu décemment mettre

Dit autrement, c'est comme si on donnait à un enfant un certain nombre de grosses boites avec des pièces spécifiques de Légo dans chaque boite, et qu'il peut construire une portion de mur précise qu'avec els éléments d'une boite donnée, et qu'il est obligé de mettre certaiens briques précises à certains endroits. 

Ainsi, ce fameux Regex, dans le monde merveilleux des Forms, peut aider à s'assurer, avec l'event listener "change" que l'usager entre une adresse mail valable.

##### 2.4.1.6.3 Vérifier une adresse mail grâce au Regex

```html
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const email = document.getElementById("email");
    const pEmail = email.nextElementSibling;
    email.addEventListener("change", function() {
    isValid = emailRegex.test(this.value); 
            if (isValid) {
                pEmail.innerText = "Valid email";
                pEmail.style.color = "green";
            } else {
                pEmail.innerText = "Enter a valid email";
                pEmail.style.color = "red";
            }
        });
```

Voici par exemple un code qui eprmet ce genre de validation. 

On crée un objet Regex, puis ensuite, on utilise la méthode .test(this.value), dans le cadre de la méthode addEventListener avec paramètre "change" qu'on applique à notre élément email du DOM !

Est-ce que j'ai couvert ici tous le Regex ? Non, loin de là ! C'est un sujet complexe et se susages dépassent de loin la vérification d'adresses mail, et ne se limite pas qu'à l'alphabet latin et aux chiffres arabes. Ce suejt est bien, bien, bien plus vaste, en termes d'usages et de caractères disponibles ! Ici, je le présente de manière utilitaire dans un domaine particulier. Nous aurons peut-être l'occasion de développer ce thème plus tard.

##### 2.4.1.6.4 Comparer deux mots de passe

```javascript
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const pPassword = password.nextElementSibling;
const pConfirmPassword = confirmPassword.nextElementSibling;

password.addEventListener("change", function() {
    if (password.value.length < 8 || password.value.length > 15) {
        pPassword.innerText = "Password must be between 8 and 15 characters";
        pPassword.style.color = "red";
    } else {
        pPassword.innerText = "Valid password length";
        pPassword.style.color = "green";
    }
});

confirmPassword.addEventListener("change", function() {
    if (confirmPassword.value !== password.value) {
        pConfirmPassword.innerText = "Passwords do not match";
        pConfirmPassword.style.color = "red";
    } else {
        pConfirmPassword.innerText = "Passwords match";
        pConfirmPassword.style.color = "green";
    }
});
```

On prend les mêmes et on recommence : on déclare ses variables, on désigne les bons éléments, on écrit notre code sous notre addEventListener. D'ailleurs petite astuce : on découvre l'addEventListener, et sa synthaxe semble spécieuse quand on est pas habitué. Rendez-vous service : n'en tenez pas compte une fois que vous l'avez écrite, et concentrez-vous sur le code qu'il y a dedans, qui lui est le même que d'ahbitude !

On le voit d'allieurs dans les encond assEventListener : c'est une simple comparaison de strings !

##### 2.4.1.6.5 Soumettre l'ensemble

Bon, on est en local, on ne va aps vraiment soumettre notre Form, ce serait bizarre (et casse-gueule). Mais dans le cadre de cet exercice, on doit "faire comme" et donc sur le bouton submit, on devra... oui... c'est bien ça... utiliser le event.preventDefault(); du point **2.4.1.5** !

Et, en reprenant notre code, on va utliser une autre astuce : définir nos variables de vérification sur faux en dehors de nos chers addEventListeners, et donc les mettre au global !

```javascript
let isValidUsername = false;
let isValidEmail = false;
let isValidPassword = false;
let isValidConfirmPassword = false;
```

Quand on fait oturner le reste du code :

```javascript
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const form = document.querySelector("form");

username.addEventListener("change", function() {
    isValidUsername = true;
    let inputUsername = this.value; 
    const pUsername = username.nextElementSibling;
    
    if (inputUsername.length < 5 || inputUsername.length > 10 || /[A-Z]/.test(inputUsername)) {
        isValidUsername = false;
        pUsername.innerText = "Enter a valid username";
        pUsername.style.color = "red";
    } else {
        pUsername.innerText = "Valid username";
        pUsername.style.color = "green";
    }
});

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const pEmail = email.nextElementSibling;

email.addEventListener("change", function() {
    isValidEmail = emailRegex.test(this.value); 
    if (isValidEmail) {
        pEmail.innerText = "Valid email";
        pEmail.style.color = "green";
    } else {
        pEmail.innerText = "Enter a valid email";
        pEmail.style.color = "red";
    }
});

const pPassword = password.nextElementSibling;
const pConfirmPassword = confirmPassword.nextElementSibling;

password.addEventListener("change", function() {
    isValidPassword = password.value.length >= 8 && password.value.length <= 15;
    if (!isValidPassword) {
        pPassword.innerText = "Password must be between 8 and 15 characters";
        pPassword.style.color = "red";
    } else {
        pPassword.innerText = "Valid password length";
        pPassword.style.color = "green";
    }
});

confirmPassword.addEventListener("change", function() {
    isValidConfirmPassword = confirmPassword.value === password.value;
    if (!isValidConfirmPassword) {
        pConfirmPassword.innerText = "Passwords do not match";
        pConfirmPassword.style.color = "red";
    } else {
        pConfirmPassword.innerText = "Passwords match";
        pConfirmPassword.style.color = "green";
    }
});
```

Où nos variables de vérifications apssent en "true" et le demeurent si elles passent les tests correctement.

Ennfin, on a la dernière partie du code où on va juste vérifier nos variables de véréfications et les comparer :

```javascript
form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (isValidUsername && isValidEmail && isValidPassword && isValidConfirmPassword) {
        console.log("Username:", username.value);
        console.log("Email:", email.value);
        console.log("Password:", password.value);
        console.log("Confirm Password:", confirmPassword.value);
    }
});
```

Et vu que tout est vrai, on aura dans la console toutes les données voulues, tandis que le fomrulaire, lui, restera comme il faut !