let url = `http://localhost:3000/api/products`;
const newUrl = new URL(location.href);
const id = newUrl.searchParams.get("/_id");


// fetch(url)    
//     .then((data) => data.json().then((data)=> console.log(data)));

function getProduct(id) {
    fetch(newUrl + id)
    .then(data => data.json)
    .then ((data) => {
        let name= data.name;
        let description = data.description;
        let imageUrl = data.imageUrl;
        let altTxt = data.altTxt;
        let colors = data.colors;
        let price = data.price /10;
        let id = data._id; 
        
        document.querySelector('.item__image') += imageUrl;
        document.querySelector('#title') += name;
        document.querySelector('#price') += price;
        document.querySelector('#description') += description;
        document.querySelector('#title') += name;
    
        for (choice in colors){

        }
    
    })}

    getProduct()