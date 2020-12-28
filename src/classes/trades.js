export default class trade {
    constructor(trade,quantity,resell,buy, sellorBuy,count,tid){
        this.trade = trade;
        this.quantity = quantity;
        this.sellorBuy = sellorBuy;
        this.resell = resell;
        this.buy = buy;
        this.count = count;
        this.display = false;
        this.tid = tid;
    }
}


