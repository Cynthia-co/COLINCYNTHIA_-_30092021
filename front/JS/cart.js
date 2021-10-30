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

      // inputChange(produitLocalStorage[j].getId);
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
// const inputChange = (id) => {
//   const storage = localStorage.getItem("articles");

//   const input = document.getElementById(id).querySelector(".itemQuantity");
//   input.addEventListener("input", (e) => {
//     if (storage) {
//       const newQuantity = e.data;
//       console.log(newQuantity);
//       const product = JSON.parse(storage);
//        const sameQantity = article.find(event => event.id === id)
//       localStorage.setItem("articles", JSON.stringify(produitLocalStorage));
//       document.querySelector(".itemQuantity").textContent += e.data;

//       displayTotalPrice();
//       displayTotalQuantity();
//     }
//   });
// };

const displayTotalPrice = () => {
  const storage = localStorage.getItem("articles");
  if (storage) {
    const product = JSON.parse(storage);
    const totalPrice = product.reduce(
      (acc, el) => acc + Number(el.quantity * el.price),
      0
    );

    document.querySelector("#totalPrice").innerHTML = totalPrice;
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
    document.querySelector("#totalQuantity").innerHTML = totalQuantity;
  }
};
displayTotalQuantity();

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
  let nameRegExp = new RegExp("^[a-zA-Z][a-zA-Z .,'-]*$", "g");
  let testName = nameRegExp.test(inputName.value);
  if (testName) {
    inputName.nextElementSibling.innerHTML = "Format valide";
  } else {
    inputName.nextElementSibling.innerHTML = "Saisissez votre nom";
    return false;
  }
};

form.address.addEventListener("change", function () {
  validAddress(this);
});

const validAddress = function (inputAdress) {
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );
  let testAdress = addressRegExp.test(inputAdress.value);
  if (testAdress) {
    inputAdress.nextElementSibling.innerHTML = "Format valide";
    return true;
  } else {
    inputAdress.nextElementSibling.innerHTML = "Saisissez votre adresse";
    return false;
  }
};
form.city.addEventListener("change", function () {
  validCity(this);
});

const validCity = function (inputCity) {
  let cityRegExp = new RegExp ("^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$", "g");
  let testCity = cityRegExp.test(inputCity.value);
  if (testCity) {
    inputCity.nextElementSibling.innerHTML = "Format valide";
  } else {
    inputCity.nextElementSibling.innerHTML = "Saisissez votre ville";
    return false;
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
  let testEmail = emailRegExp.test(inputEmail.value);

  if (testEmail) {
    inputEmail.nextElementSibling.innerHTML = "Adresse valide";
    return true;
  } else {
    inputEmail.nextElementSibling.innerHTML =
      "Saisissez votre adresse mail complète";
    return false;
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
