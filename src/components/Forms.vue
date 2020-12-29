<template>
<div class="container">
    <div class="login"><br>
    <label for="tradet"> Trade Type </label>
     <input type="text" id="tradet" v-model = "type" placeholder="Enter trade type"/> <br>
      <label for="quant"> Quantity </label>
     <input type="number" id="quant" v-model = "quant" placeholder="Quantity"/> <br>
       <label class="slightpadding" for="cars"> Transaction? </label> 
     <select v-model= "buyorsell" name="cars" id="cars"> <br>
    <option value="Buy">Buy</option>
    <option value="Sell">Sell</option>
    </select><br>
    <label for="price"> Price </label>
     <input type="number" id="price" v-model = "price" placeholder="Buy or Sell Price"/> <br>
     <label for="reprice"> Sell Price </label>
     <input type="number" id="reprice" v-model = "reprice" placeholder="Rebuy or Resell Price"/> <br>
    <button class="submit" @click="submit"> Submit Trade </button>
    </div>
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
    display:flex;
    align-content:center;
    justify-content:center;
}
.login{
    display:flex;
    flex-direction:column;
    border-radius: 40px;
    width:80%
}
.slightpadding{
    padding:5px;
}
.fields {
  width: 100%;
  padding: 75px 5px 5px 5px;
}
.fields input {
  border: none;
  outline:none;
  background: none;
  font-size: 18px;
  color: #555;
  padding:20px 10px 20px 5px;
}
.submit {
  border: none;
  border-radius: 5000px;
  padding: 1em;
  background: #efeeee;
  box-shadow:
    inset 4px 4px 6px #ccc,
    inset -4px -4px 6px #fff;
  margin-bottom: 2em;
  color: #888;
  font-family: 'Poppins', sans-serif;
}
</style>