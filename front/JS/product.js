//Déclaration des variables
let url = `http://localhost:3000/api/products/`;
const newUrl = new URL(window.location.href);
//Récupération de l'id
const getId = newUrl.searchParams.get("id");

 fetch(url + getId).then((data) =>
   data.json().then((data) => console.log(data))
 );

function getProduct(getId) {
  fetch(url + getId)
    .then((data) => data.json())
    .then((data) => {
      let name = data.name;
      let description = data.description;
      let imageUrl = data.imageUrl;
      let altTxt = data.altTxt;
      let colors = data.colors;
      let price = data.price / 10;
      let id = data._id;

      let image = `<img src="${imageUrl}" alt="${altTxt}" id="imageKanap"/>`
      //Insertion des données de chaque canapé sur la page Produit
      document.querySelector(".name").innerHTML = name;
      document.querySelector(".item__img").innerHTML += image;
      document.querySelector("#title").innerHTML = name;
      document.querySelector("#price").innerHTML = price;
      document.querySelector("#description").innerHTML = description;
      
      //Boucle for for in pour récupérer toutes les options couleurs et les injecter au document avec un innerHTML
      for (value in colors) {
        document.querySelector(
          "#colors"
        ).innerHTML += `<option id="colorOption" value="${colors[value]}">"${colors[value]}"</option>`;
      }
    });
}
//Appel de la fonction getProduct
getProduct(getId);


//Ajout au panier


//let panier = JSON.parse(localStorage.getItem())

document.querySelector("#addToCart").addEventListener("click", (event) => {
 event.preventDefault()
//Déclaration de constantes
const nameKanap = document.getElementById("title").innerText;
//const imageUrl = document.getElementsById("imageKanap").src;
const price = document.getElementById("price").innerText;
const quantity = document.getElementById("quantity").value;
const colorsOption = document.getElementById("colors").value;


    //Création de l'objet à rajouter au panier
    let article = {
      getId, 
     
      nameKanap,
      quantity,
      price,
      colorsOption,
    }
    console.log(article);
  // localStorage.getItem(panier);
  let produitLocalStorage = JSON.parse(localStorage.getItem('article'));

for(k=0; k<article.length; k++){
  if(article.getId === article[k].getId && article.colorsOption === article[k].colorsOption){
    article.quantity
  }
};
//vérifier s
if(produitLocalStorage){
   produitLocalStorage.push(article);
   localStorage.setItem("article", JSON.stringify(produitLocalStorage));
 }else{
   produitLocalStorage =[];
   produitLocalStorage.push(article);
 localStorage.setItem("article", JSON.stringify(produitLocalStorage));
 }    
});
