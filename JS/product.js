//Déclaration des variables
let url = `http://localhost:3000/api/products/`;
const newUrl = new URL(window.location.href);
//Récupération de l'id
const getId = newUrl.searchParams.get("id");
console.log(getId);
console.log(newUrl);

 fetch(url + "id")    
     .then((data) => data.json().then((data)=> console.log(data)));

function getProduct(getId) {
    fetch(url + "id")
    .then(data => data.json)
    .then ((data) => {
        let name= data.name;
        let description = data.description;
        let imageUrl = data.imageUrl;
        let altTxt = data.altTxt;
        let colors = data.colors;
        let price = data.price /10;
        let id = data._id; 
        
        document.querySelector('.item__img').innerHTML += imageUrl;
        document.querySelector('#title').innerHTML += name;
        document.querySelector('#price').innerHTML += price;
        document.querySelector('#description').innerHTML += description;
        document.querySelector('#title').innerHTML += name;
    
        for (choice in colors){

        }
    
    })}

    getProduct(getId)