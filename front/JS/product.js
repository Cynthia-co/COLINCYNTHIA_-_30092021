//Déclaration des variables
let url = `http://localhost:3000/api/products/`;
const newUrl = new URL(window.location.href);
//Récupération de l'id
const getId = newUrl.searchParams.get("id");
console.log(getId);
console.log(newUrl);

 fetch(url + getId)    
      .then((data) => data.json().then((data)=> console.log(data)));

function getProduct(getId) {
    fetch(url + getId)
    .then((response) => response.json())
    .then ((data) => {
        let name= data.name;
        let description = data.description;
        let imageUrl = data.imageUrl;
        let altTxt = data.altTxt;
        let colors = data.colors;
        let price = data.price /10;
        let id = data._id; 
        
        //Insertion des données de chaque canapé sur la page Produit
        document.querySelector('.name').innerHTML = name;
        document.querySelector('.item__img').src = imageUrl;
        document.querySelector('#title').innerHTML = name;
        document.querySelector('#price').innerHTML = price;
        document.querySelector('#description').innerHTML = description;
        
        //Boucle for for in pour récupérer toutes les options couleurs et les injecter au document avec un innerHTML     
        for (value in colors){
            document.querySelector("#colors").innerHTML += 
            `<option value="${colors[value]}">"${colors[value]}"</option>`;
        }
    
    })}

    getProduct(getId);