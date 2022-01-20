const appendCurreny = (price)=> {
    var currency = JSON.parse(localStorage.getItem("currency"));
    return `${currency.symbol} ${ price * currency.rateFromDollar }`
};

export default appendCurreny;
