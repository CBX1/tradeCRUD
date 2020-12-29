<template width:100%>
<div class="background">

      <button 
    type="button"
    class="btn"
    @click="showModal()"
  >
 
    Add Trade
  </button>
    <modal
                      v-show="isModalVisibleN"
                      @close="closeModal"
                    />
     <button class="logout" @click="logout()"> Logout </button>
       <div class="container">
  <table ref="tablerow" rel="tablerow" class="neumorphic">


         <thead>
                <tr>
                    <th>Trade</th>
                    <th>Quantity</th>
                    <th>Trade Type</th>
                    <th> Price </th>
                    <th> Resell Price</th>
                    <th> Profit </th>
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
                   <td> <img class="iconClass" src="../assets/edit.svg" @click="showModall(info)"> 
                                      
                     <img class="iconClass" src="../assets/delete.svg" @click="delTrade(info)">  </td>
                       <div v-if="info.display" > 
                       <modal
                      v-show="isModalVisible"
                      :tradie="info"
                      @close="closeModal"
                    />
                        </div>
                </tr>
              
                    
            </tbody>
  </table>
  <br> <br> <br>



  </div>
</div>
</template>

<script>

import {mapState,mapActions} from 'vuex';
import Modal from '../components/Modal.vue';
export default {
  name: 'Hello',
  data() {
    return {
       isModalVisible: false,
       isModalVisibleN: false,
       isvis:false,
       truarr: null,
       curplace: null,
    }
  },
  components: {
    Modal,
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
        this.isModalVisibleN = true;
      },
       showModall(info) {
         info.display = true;
        this.isModalVisible = true;

        console.log(info)
      },
      closeModal() {
        this.isModalVisible = false;
        this.isModalVisibleN = false;
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
     async logout(){
        await this.userLogout();
        console.log(this.user);
        console.log(this.userLogin)
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

   body {
            background: #fb887c;
            color: #fff;
            font-family: 'Lato', Arial, sans-serif;
        }

        h1 {
            font-family: "proxima-nova",sans-serif;
            letter-spacing: -0.01em;
            font-weight: 700;
            font-style: normal;
            font-size: 60px;
            margin-left: -3px;
            line-height: 1em;
            color: #fff;
            text-align: center;
            margin-bottom: 8px;
            text-rendering: optimizeLegibility;
        }

        table {
            width: 80%;
            margin: auto;
        }

        table, th, td {
            border: 1px solid #fff;
            border-collapse: collapse;
        }

        th, td {
            padding: 15px;
        }
.logout{
  position: fixed;
  bottom: 30px;
  left: 2px;
}
.btn{
  position: fixed;
  bottom: 30px;
  right:2px
}
.btn:hover {
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
}

.logout:hover {
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
}

button {
  width: 170px;
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
.incorrectPassword{
    color:red;
}
button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

table.neumorphic{
  width: 80%;
  border-spacing: 0;
  color: #212121;
  text-align: center;
  box-shadow: 9px 9px 16px rgba(163, 177, 198, 0.6),
  -9px -9px 16px rgba(255, 255, 255, 0.6);
}
table.neumorphic thead{
  box-shadow: 9px 9px 16px rgba(163, 177, 198, 0.6);
}
table.neumorphic th{
  padding: 7px;
}

table.neumorphic>tbody>tr>td {
  padding: 10px;
  font-size: 20px;
}


table.neumorphic>tbody>tr:hover {
  padding: 20px;
  box-shadow: 9px 9px 16px rgba(163, 177, 198, 0.6),
  -9px -9px 16px rgba(255, 255, 255, 0.6);
}





</style>
