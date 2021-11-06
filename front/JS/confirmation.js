//Récupération du numéro de commande en passant par l'URL
//Déclaration de la constante url
const urlConfirm = new URL(window.location.href);
//Fonction pour récupérer l'orderId de l'url
const getOrderId = () => {
    console.log(urlConfirm);
    const params = urlConfirm.searchParams;
    const orderConfirm =params.get('name');
    console.log(orderConfirm);
    document.getElementById('orderId').innerHTML = orderConfirm;
};
getOrderId();