let url = ` http://localhost:3000/api/product`;

function getKanap(){   
    fetch(url)    
     
        .then((data)=> console.log(JSON.parse(JSON.stringify(data)))

     .then((data) => data.json))
}
