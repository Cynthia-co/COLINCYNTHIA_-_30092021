let url = `http://localhost:3000/api/products`;
const newUrl = new URL(window.location.href);
const getId = newUrl.searchParams.get("id");


 fetch(url + getId)    
     .then((data) => data.json().then((data)=> console.log(data)));

function getProduct(getId) {
    fetch(newUrl + getId)
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

    getProduct()