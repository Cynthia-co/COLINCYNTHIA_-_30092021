let produitLocalStorage = JSON.parse(localStorage.getItem('produitEnregistre'));
console.log(produitLocalStorage);
//Affichage des éléments du local storage
//Déclaration des variables
let totalPrice = quantity * price;
let produitPanier = `<article class="cart__item" data-id="${id}">
<div class="cart__item__img">
  <img src="${imageUrl}" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__titlePrice">
    <h2>${nameKanap}</h2>
    <p>${totalPrice} €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : ${quantity} </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`

if(produitLocalStorage === 0){
    document.querySelector(".cart__item__content") = "Le panier est vide"
}else{

}