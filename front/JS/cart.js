// let produitLocalStorage = JSON.parse(localStorage.getItem('produitEnregistre'));
// console.log(produitLocalStorage);
// //Affichage des éléments du local storage
// //Déclaration des variables
// let totalPrice = quantity * price;


// if(produitLocalStorage === 0){
//     document.querySelector(".cart__item").innerHTML = "Le panier est vide"
// }else{
//     let produitPanier = `<article class="cart__item" data-id="${id}">
//     <div class="cart__item__img">
//       <img src="${imageUrl}" alt="Photographie d'un canapé">
//     </div>
//     <div class="cart__item__content">
//       <div class="cart__item__content__titlePrice">
//         <h2>${nameKanap}</h2>
//         <p>${totalPrice} €</p>
//       </div>
//       <div class="cart__item__content__settings">
//         <div class="cart__item__content__settings__quantity">
//           <p>Qté : ${quantity} </p>
//           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//         </div>
//         <div class="cart__item__content__settings__delete">
//           <p class="deleteItem">Supprimer</p>
//         </div>
//       </div>
//     </div>
//     </article>`
// }


//Formulaire - mise en place des RegEX pour vérifier les entrées de l'utilisateur
let form = document.querySelector(".cart__order__form");


form.firstName.addEventListener('change', function(){
    validName(this);
});

form.lastName.addEventListener('change', function(){
    validName(this);
});

const validName = function(inputName){
    let nameRegExp = new RegExp( "^([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$", "g");
}
let testName = validName.test(inputName);
console.log(testName);

const validName = function(inputEmail){
    let nameRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    let testName = nameRegExp.test(inputName);
        console.log(testName);

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

form.email.addEventListener('change', function() {
    validEmail(this);
});

const validEmail = function(inputEmail){
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
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

//Soumission du formulaire
// form.addEventListener('submit', function(e){
//     e.preventDefault();
//     if (validName(form.name) && validAdress(form.address) && validCity(form.city) && validEmail(form.Email))
// })