let url = `http://localhost:3000/api/products`;

function getProducts(){
    fetch(url)    
    .then((data) =>
        data.json()
        //.then((data)=> console.log(data)));
    .then(data => {
        for (let i=0 ; i < data.length; i++){
            let name = data[i].name;
            let description = data[i].description;
            let imageUrl = data[i].imageUrl;
            let altTxt = data[i].altTxt;
            let price = data[i].price /10;
            let id = data[i]._id;

            let items = 
            `<a href="./product.html?id=${id}">
                <article>
                <img src="${imageUrl}" alt="${altTxt}">
                <h3 class="productName">${name}</h3>
                <p class="productDescription">${description}</p>
                <p>Prix : ${price}</p>
                </article>
            </a> `

          document.querySelector('.items').innerHTML += items
        }
    }
    
    ))
}

getProducts();