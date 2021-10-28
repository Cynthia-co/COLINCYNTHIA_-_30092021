//Récupération des produits du localStorage
let produitLocalStorage = JSON.parse(localStorage.getItem("articles"));

//Affichage des produits sur la page

//Déclaration de la fonction pour l'affichage
const displayCart = () => {
  //Affichage des éléments du local storage
  if (produitLocalStorage.length === 0) {
    document.getElementById(
      "cart__items"
    ).innerHTML = `<p>Le panier est vide<p>`;
  } else {
    document.getElementById("cart__items").innerHTML = "";
    for (j = 0; j < produitLocalStorage.length; j++) {
      const priceUnit = Number(produitLocalStorage[j].price);
      const quantityUnit = Number(produitLocalStorage[j].quantity);
      const partielPrice = priceUnit * quantityUnit;

      //Déclaration de l'article du panier
      const produitPanier = `<article class="cart__item" id="${produitLocalStorage[j].getId}" data-color=${produitLocalStorage[j].colorsOption}>
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
           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitLocalStorage[j].quantity}">
         </div>
         <div class="cart__item__content__settings__delete">
           <p id="deleteItem" class="deleteItem">Supprimer</p>
        </div>
       </div>
     </div>
        </article>`;

      document
        .getElementById("cart__items")
        .insertAdjacentHTML("beforeend", produitPanier);

      inputChange(produitLocalStorage[j].getId);
      addDeleteAction(produitLocalStorage[j].getId);
    }
  }
};
const addDeleteAction = (id) => {
  const deleteItem = document.getElementById(id).querySelector(".deleteItem");
  const item = document.getElementById(id);

  deleteItem.addEventListener("click", () => {
    const idItem = item.getAttribute("id");
    const colorItem = item.getAttribute("data-color");

    produitLocalStorage = produitLocalStorage.filter(
      (p) => p.getId !== idItem || p.colorsOption !== colorItem
    );

    localStorage.setItem("articles", JSON.stringify(produitLocalStorage));

    displayCart();
    displayTotalPrice();
    displayTotalQuantity();
  });
};


//Changer la quantité du panier
const inputChange = (id) => {
  const input = document.getElementById(id).querySelector(".itemQuantity");
  input.addEventListener("input", (e) => {
    console.log(e);
  });
};

const displayTotalPrice = () => {
  const storage = localStorage.getItem("articles");
  if (storage) {
    const product = JSON.parse(storage);
    const totalPrice = product.reduce(
      (acc, el) => acc + Number(el.quantity * el.price),
      0
    );

    console.log(totalPrice);
    document.querySelector("#totalPrice").innerHTML += totalPrice;
  }
};
displayTotalPrice();

const displayTotalQuantity = () => {
  const storage = localStorage.getItem("articles");
  if (storage) {
    const product = JSON.parse(storage);
    const totalQuantity = product.reduce(
      (acc, el) => acc + Number(el.quantity),
      0
    );
    document.querySelector("#totalQuantity").innerHTML += totalQuantity;
  }
};
displayTotalQuantity();

// const quantityValue = document.querySelectorAll(".itemQuantity").value;
// console.log(quantityValue);
// // for (m=0; m<inputQuantity.length; m++){
//      inputQuantity.addEventListener('change', updateValue);
//     function updateValue(e){
//         quantityValue.texteContent = e.target.value;
//utiliser getattribute
//     }
//  //};
displayCart();
//Formulaire - mise en place des RegEX pour vérifier les entrées de l'utilisateur
let form = document.querySelector(".cart__order__form");

form.firstName.addEventListener("change", function () {
  validName(this);
});

form.lastName.addEventListener("change", function () {
  validName(this);
});

const validName = function (inputName) {
  let nameRegExp = new RegExp(
    "^([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$",
    "g"
  );
  let testName = nameRegExp.test(inputName);

  if (testName) {
    return true;
  } else {
    inputName.nextElementSibling.innerHTML = "Format non valide";
    return false;
  }
};

form.address.addEventListener("change", function () {
  validAddress(this);
});
let validAddress = function (inputAdress) {
  if (inputAdress.value.length < 5) {
    inputAdress.nextElementSibling.innerHTML = "Saisissez votre adresse";
  } else {
    return true;
  }
};
form.city.addEventListener("change", function () {
  validCity(this);
});

let validCity = function (inputCity) {
  if (inputCity.value.length < 3) {
    inputCity.nextElementSibling.innerHTML = "Saisissez votre ville";
  } else {
    return true;
  }
};

form.email.addEventListener("change", function () {
  validEmail(this);
});

const validEmail = function (inputEmail) {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  let testEmail = emailRegExp.test(inputEmail);

  if (testEmail) {
    return true;
    inputEmail.nextElementSibling.innerHTML = "Adresse valide";
  } else {
    return false;
    inputEmail.nextElementSibling.innerHTML = "Adresse NON valide";
  }
};

//Bouton d'envoi, soumission du formulaire
document.querySelector("#order").addEventListener("click", (e) => {
  e.preventDefault();
  let contact = {
    lastName: form.lastName.value,
    firstName: form.firstName.value,
    address: form.address.value,
    city: form.city.value,
    email: form.email.value,
  };
  let command = {
    getId,
    totalPrice,
    contact,
  };

  if (
    validName(form.name) &&
    validAdress(form.address) &&
    validCity(form.city) &&
    validEmail(form.Email)
  ) {
    localStorage.setItem(command);
  }

  //Requête POST
  //Déclaration des variables
  const promise1 = fetch("http://localhost:3000/api/orders", {
    method: "POST",
    body: JSON.stringify(command),
    headers: {
      "Content-type": "application/JSON",
    },
  });

  //Fonction envoi dans l'API
  promise1.then((response) => {
    const orderCommand = response.json;
  });
});
