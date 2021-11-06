//Récupération du numéro de commande en passant par l'URL
const urlConfirm = new URL(window.location.href);
console.log(urlConfirm);
const getOrderId = () => {
    console.log(urlConfirm);
    const params = urlConfirm.searchParams;
    const orderConfirm =params.get('name');
    console.log(orderConfirm);
    document.getElementById('orderId').innerHTML = orderConfirm;
};
getOrderId();