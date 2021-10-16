 //Récupération des produits du localStorage
let produitLocalStorage = JSON.parse(localStorage.getItem('article'));
console.log(produitLocalStorage);

 //Affichage des éléments du local storage
 if(produitLocalStorage === 0){
     document.querySelector(".cart__item").innerHTML = `<p>Le panier est vide<p>`;
 }else{
    for (j=0; j<produitLocalStorage.length; j++){
     let priceUnit = Number(produitLocalStorage[j].price);
     let quantityUnit = Number(produitLocalStorage[j].quantity);
     let partielPrice = priceUnit * quantityUnit;
     console.log(partielPrice);
     
     let produitPanier = `<article class="cart__item" data-id="${produitLocalStorage[j].getId}">
     <div class="cart__item__img">
       <img src="${produitLocalStorage[j].imageUrl}" alt="Photographie d'un canapé">
     </div>
     <div class="cart__item__content">
       <div class="cart__item__content__titlePrice">
         <h2>${produitLocalStorage[j].nameKanap} - ${produitLocalStorage[j].colorsOption}</h2>
         <p>${partielPrice} €</p>
      </div>
       <div class="cart__item__content__settings">
         <div class="cart__item__content__settings__quantity">
           <p>Qté :  </p>
           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitLocalStorage[j].quantity}">
         </div>
         <div class="cart__item__content__settings__delete">
           <p class="deleteItem">Supprimer</p>
        </div>
       </div>
     </div>
     </article>`

     document.querySelector("#cart__items").innerHTML += produitPanier;
 }
};
//changer la quantité du panier 
document.querySelector(".itemQuantity").addEventListener('change', (e) => {
    let newQuantity = this.value;
    console.log(newQuantity);
}
);
// Somme de nombre d'articles dans le panier
let totalArticles = [];

// for (k=0; k=produitLocalStorage.length; k++){
    
//     totalArticles.push(totalQuantity);
//     console.log(totalQuantity);
// }
// console.log(totalArticles);

document.querySelector("#totalQuantity").innerHTML += totalArticles;

// Somme du prix total
//let totalPrice
document.querySelector("#totalPrice").innerHTML += totalPrice;

//Formulaire - mise en place des RegEX pour vérifier les entrées de l'utilisateur
let form = document.querySelector(".cart__order__form");


form.firstName.addEventListener('change', function(){
    validName(this);
});

form.lastName.addEventListener('change', function(){
    validName(this);
});

// const validName = function(inputName){
//     let nameRegExp = new RegExp( "^([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$", "g");
// }
// let testName = validName.test(inputName);


const validName = function(inputName){
    let nameRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    let testName = nameRegExp.test(inputName);
    
    if(testName){
        return true;
    }else{
        inputName.nextElementSibling.innerHTML = 'Format non valide';
        return false;
    }
};


form.address.addEventListener('change', function(){
   validAddress(this);
});
let validAddress = function(inputAdress){
    if(inputAdress.value.length < 5){
        inputAdress.nextElementSibling.innerHTML = "Saisissez votre adresse"
    }else{
        return true;
    };
};
form.city.addEventListener('change', function(){
    validCity(this);
});

let validCity = function(inputCity){
    if(inputCity.value.length < 3){
        inputCity.nextElementSibling.innerHTML = "Saisissez votre ville"
    }else{
        return true;
    };
};

form.email.addEventListener('change', function() {
    validEmail(this);
});

const validEmail = function(inputEmail){
    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
    let testEmail = emailRegExp.test(inputEmail);
        console.log(testEmail);
    if(testEmail){
        inputEmail.nextElementSibling.innerHTML = 'Adresse valide';
        return true;
    }else{
        inputEmail.nextElementSibling.innerHTML = 'Adresse NON valide';
        return false;
    }
};


let contact = {
    lastName : form.lastName.value,
    firstName : form.firstName.value,
    address : form.address.value,
    city : form.city.value,
    email : form.email.value,
};

//Soumission du formulaire
 form.addEventListener('submit', function(e){
     e.preventDefault();
     if (validName(form.name) && validAdress(form.address) && validCity(form.city) && validEmail(form.Email)){
    
    localStorage.setItem(contact)
    }
});

//Requête POST