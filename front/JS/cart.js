 //Récupération des produits du localStorage
let produitLocalStorage = JSON.parse(localStorage.getItem('articles'));
console.log(produitLocalStorage);

let prices =[];
let quantities = [];
 //Affichage des éléments du local storage
 if(produitLocalStorage.length === 0){
     document.querySelector(".cart__item").innerHTML = `<p>Le panier est vide<p>`;
 }else{
    for (j=0; j<produitLocalStorage.length; j++){
     let priceUnit = Number(produitLocalStorage[j].price);
     let quantityUnit = Number(produitLocalStorage[j].quantity);
     let partielPrice = priceUnit * quantityUnit;
     prices.push(partielPrice);
     quantities.push(quantityUnit);
     
     let produitPanier = `<article class="cart__item" data-id="${produitLocalStorage[j].getId}">
     <div class="cart__item__img">
       <img src="${produitLocalStorage[j].imageUrl}" alt="Photographie d'un canapé">
     </div>
     <div class="cart__item__content">
       <div class="cart__item__content__titlePrice">
         <h2>${produitLocalStorage[j].nameKanap} - ${produitLocalStorage[j].colorsOption}</h2>
         <p id="partielPrice">${partielPrice} €</p>
      </div>
       <div class="cart__item__content__settings">
         <div class="cart__item__content__settings__quantity">
           <p>Qté :  </p>
           <input type="number" onKeyUp="stepCalcul(event)" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitLocalStorage[j].quantity}">
         </div>
         <div class="cart__item__content__settings__delete">
           <p id="deleteItem" class="deleteItem">Supprimer</p>
        </div>
       </div>
     </div>
        </article>`

         document.querySelector("#cart__items").innerHTML += produitPanier;
 }
};

//Calcul du nombre total d'articles
let totalQuantity = quantities.reduce((acc, el)=> acc + el);
document.querySelector("#totalQuantity").innerHTML += totalQuantity;

//Calcul du prix total
let totalPrice = prices.reduce((acc, el)=> acc + el);
document.querySelector("#totalPrice").innerHTML += totalPrice;

// function stepCalcul(e){
//     console.log(e.key);
// }

//Changer la quantité du panier 
// let inputQuantity = document.querySelectorAll(".itemQuantity");
// for (m=0; m<inputQuantity.length; m++){
//     inputQuantity.addEventListener('change', function(){
//      let newQuantity = inputQuantity[m].value;
//   //   produitLocalStorage.quantity.push(newQuantity); 
//     console.log(newQuantity);
//   });
// };

//Supprimer l'article du panier
let item = document.querySelectorAll(".cart__item");
let deleteItem = document.querySelectorAll("#deleteItem"); 
let items = [];
items.push(item);
console.log(item);
console.log(items);
//function deleteArticle() {
for (l=0; l<item[l].length; l++){
    // let deleteButton = document.querySelectorAll(".deleteItem");
       // console.log(deleteButton);
       console.log('Bonjour');
     deleteItem[l].addEventListener('click', (e) => {
       e.preventDefault();
      
       console.log(item[0]);
        localStorage.removeItem(item[l]); 
     })
};
//};
//deleteArticle();

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

form.email.addEventListener('change', function(){
    validEmail(this);
});

const validEmail = function(inputEmail){
    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
    let testEmail = emailRegExp.test(inputEmail);
        
    if(testEmail){
        return true;
        inputEmail.nextElementSibling.innerHTML = 'Adresse valide';
        
    }else{ 
        return false;
        inputEmail.nextElementSibling.innerHTML = 'Adresse NON valide';
       
    }
};

//Bouton d'envoi, soumission du formulaire
document.querySelector("#order").addEventListener('click', e =>{
     e.preventDefault();
     let contact = {
         lastName : form.lastName.value,
         firstName : form.firstName.value,
         address : form.address.value,
         city : form.city.value,
         email : form.email.value,
         };
     let command= {
         getId,
         totalPrice,
         contact
         };    
  
     if (validName(form.name) && validAdress(form.address) && validCity(form.city) && validEmail(form.Email)){
   
       localStorage.setItem(command);
     }

    //Requête POST
    //Déclaration des variables
    const promise1 = fetch("http://localhost:3000/api/orders",{
        method :"POST",
        body: JSON.stringify(command),
        headers: {
            "Content-type": "application/JSON",
        },
    });

    //Fonction envoi dans l'API
    promise1.then((response)=>{
        const orderCommand = response.json;
    });
});