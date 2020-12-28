<template width:100%>
<div class="background">

      <button
    type="button"
    class="btn"
    @click="showModal"
  >
 
    Add Trade
  </button>
     <button @click="logout()"> Logout </button>
       <div class="container">
  <table ref="tablerow" rel="tablerow" class="tableC">


         <thead>
                <tr>
                    <th>Trade</th>
                    <th>Quantity</th>
                    <th>Trade Type</th>
                    <th>Price </th>
                    <th> Resell Price</th>
                    <th> Profit </th>
                    <th> </th>
                </tr>
            </thead>
            <tbody class="tableB">
                <tr v-for="info in trading" :key="info.tid">
                    <td>{{info.trade}}</td>
                    <td>{{info.quantity}}</td>
                    <td> {{info.sellorBuy}} </td>
                    <td>{{info.buy}} $ </td>
                    <td>{{info.resell}} $</td>
                    <td> {{profit(info)}} $ </td>
                   <td> <img class="iconClass" src="../assets/edit.svg" @click="change(info)"> 
                     <img class="iconClass" src="../assets/delete.svg" @click="delTrade(info)">  </td>
                       <div v-if="info.display" > <Form :tradie="info"/> </div>
                </tr>
              
                    
            </tbody>
  </table>
  <br> <br> <br>


  <modal
    v-show="isModalVisible"
    @close="closeModal"
  />
  </div>
</div>
</template>

<script>

import {mapState,mapActions} from 'vuex';
import Modal from './Modal.vue';
import Form from './Forms.vue';
export default {
  name: 'Hello',
  data() {
    return {
       isModalVisible: false,
       isvis:false,
       truarr: null,
       curplace: null,
    }
  },
  components: {
    Modal,
    Form,
  },
  computed: {
      ...mapState(['trading','user','userLogin']),

     
   },
   
created() {
  this.checkifLogin();
  this.importData();
},
mounted(){
  this.checkifLogin();
},
  methods: {
    ...mapActions(['deleteTrade','editTrade','importTrades','userLogout','loginUser']),
     profit(info){
        return (info.resell - info.buy) * info.quantity;
      },
    checkifLogin(){
      if(!this.userLogin){
        this.$router.push({name:'login'})
      }
    },
  
    showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      delTrade(place){
        this.deleteTrade(place);
      },
      change(place){
         place.display = !place.display;
      },
      test(place){
        if(this.curplace !== null){
          console.log(place.trade);
        }
      },
      importData(){
        this.importTrades()
      },
      logout(){
        this.userLogout();
          this.$router.push({name:'login'})
      },
      insertrow(){
       var x =  this.$refs['tablerow'].insertRow(5);
       x.innerHTML = "hello";
      }


},
 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.background{
  background-color:#EFF0F3;

}
.iconClass{
  height:50px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.list{
  display:block;
  background-color:#DCFFCF;
}

.container{
  display:flex;
  flex-direction:column;
}
.tableC{
  font-size:35px;
}
.tableB{
   font-size:25px;
}
</style>
