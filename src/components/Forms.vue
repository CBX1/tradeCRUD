<template>
    <div >
     <input type="text" v-model = "type" placeholder="Enter trade type"/> <br>
     <input type="number" v-model = "quant" placeholder="Quantity"/> <br>
     <select v-model= "buyorsell" name="cars" id="cars"> <br>
    <option value="Buy">Buy</option>
    <option value="Sell">Sell</option>
    </select><br>
     <input type="number" v-model = "price" placeholder="Buy or Sell Price"/> <br>
     <input type="number" v-model = "reprice" placeholder="Rebuy or Resell Price"/> <br>
    <button @click="submit"> Submit </button>
   

    </div>
</template>


<script>
import {mapState, mapActions} from 'vuex';
import trade from '../classes/trades';
export default {
   name: 'Forms',
   props :{
       tradie:{
           type: Object,
           default: () => {}
       }
       
   },
   data() {
       return {
        type: null,
        quant: null,
        price: null,
        reprice: null,
        buyorsell: null,
        clonedtrade: {...this.tradie},
       }
   }, 
   created(){
      this.type = this.clonedtrade.trade;
      this.quant = this.clonedtrade.quantity;
      this.buyorsell = this.clonedtrade.sellorBuy;
      this.reprice = this.clonedtrade.resell;
      this.price = this.clonedtrade.buy;
   },
   computed: {
      ...mapState(['trading']),
   },
   methods: {
       ...mapActions(['addTrade','editTrade','clearTrades','importTrades']),
      async submit(){
           console.log();
           if(typeof this.clonedtrade.buy == 'undefined'){
            const t = new trade(this.type, this.quant, this.reprice, this.price, this.buyorsell,this.trading.length);
            console.log(t);
            this.addTrade(t);              
           }
           else{
               this.tradie.trade = this.type;
               this.tradie.quantity = this.quant;
               this.tradie.sellorBuy = this.buyorsell;
               this.tradie.resell = this.reprice;
               this.tradie.buy = this.price;
               this.editTrade(this.tradie);
           }
           
       }
   },
}
</script>

<style>
    .container{
    }
</style>