import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import trade from '../classes/trades';
import {ADD_TRADE, CLEAR_TRADES, DEL_TRADE, EDIT_TRADE, IMPORT_TRADES, LOGIN_USER, LOGIN_CHANGE, USER_LOGOUT} from './mutation-types';
Vue.use(Vuex)
const state = {
  trading: [],
  user: null,
  userLogin: false,
};
const mutations = {
  async [ADD_TRADE](state, trad){
    console.log(trad.quantity)
    await axios({
      method: 'POST',
      url: 'https://graphql.fauna.com/graphql',
      headers: {
         "authorization": "Basic Zm5BRC1BQ0NJOUFDQU1lQkZhbEl5LWVzTFJqdTNkNDlMUFMtMXhwWjp0cmFkZXM6c2VydmVy",
      },
      data:{
        query:
        `mutation addTrade{
          updateAccount(id: "`+state.user.tid + `"
          data: {
            email:"` + state.user.getUsername() + `"
            password:"` + state.user.getPassword() + `"
            trade: {create: [ { type: "` + trad.trade + `"
            quantity:` + Number(trad.quantity)+`
            price:` + trad.buy + `
            buyosell:` + `"` + trad.sellorBuy + `"` + `
            id:` + trad.count + `
            display: false
            reprice:` + trad.resell + `}]}
          }
          ){
            email
            trade {
              data {
                type
              }
            }
          }
        }`
      }
          }).then(response => { 
           console.log(response);   
                
          }
         );
         state.trading = [];
         var importData;
         await axios({
           method: 'POST',
           url: 'https://graphql.fauna.com/graphql',
           headers: {
              "authorization": "Basic Zm5BRC1BQ0NJOUFDQU1lQkZhbEl5LWVzTFJqdTNkNDlMUFMtMXhwWjp0cmFkZXM6c2VydmVy",
           },
           data:{
             query:
             `query findTrades{
                 accountsByPassword(email:"`+ state.user.getUsername() + `",password:"` + state.user.getPassword() + `"){
                   data{
                     email
                     _id
                     trade{
                       data{
                         type
                         quantity
                         price
                         buyosell
                         id
                         display
                         reprice
                         _id
                       }
                     }
                   }
                 }
               }`
           }
               }).then(response => { 
                importData = response;
              })
              .catch(error => {
                  console.log(error.response)
              }).then(response=> {
                console.log(response);
               var x = importData.data.data.accountsByPassword.data[0].trade.data.length;
               console.log(x);
               for(var z = 0; z < x; z++){
                 var y = importData.data.data.accountsByPassword.data[0].trade.data[z]
                 console.log(y)
                 const t = new trade(y.type,y.quantity,y.reprice,y.price,y.buyosell,Number(y.id), y._id);
                 console.log(t);
                 state.trading.push(t);
                 console.log(state.user);
               }
              });

  },
  async [DEL_TRADE](state,trad){
    var x = trad.tid;
    await axios({
      method: 'POST',
      url: 'https://graphql.fauna.com/graphql',
      headers: {
         "authorization": "Basic Zm5BRC1BQ0NJOUFDQU1lQkZhbEl5LWVzTFJqdTNkNDlMUFMtMXhwWjp0cmFkZXM6c2VydmVy",
      },
      data:{
        query:
        `mutation deleteTrade{
          deleteTrade(id:"`+ x.toString() + `"){
            type
            }
          }`
      }
          }).then(response => { 
            console.log(`mutation deleteTrade{
              deleteTrade(id:"`+ trad.tid.toString() +`"){
                type
                }
              }`);
              console.log(response);
            console.log(trad.tid.toString());
            state.trading = [...state.trading.filter(h=> h.tid !== trad.tid)];
            alert("Data has been deleted");
            
          
          }
         )
         .catch(error => {
             alert(error.response);
         });
  },
  async [EDIT_TRADE](state,trad){
    await axios({
      method: 'POST',
      url: 'https://graphql.fauna.com/graphql',
      headers: {
         "authorization": "Basic Zm5BRC1BQ0NJOUFDQU1lQkZhbEl5LWVzTFJqdTNkNDlMUFMtMXhwWjp0cmFkZXM6c2VydmVy",
      },
      data:{
        query:
       `mutation editTrade{
          updateTrade(id:"` + trad.tid + `"
            data :{
              type: "` + trad.trade + `"
              quantity:` + trad.quantity + `
              price:` + trad.buy + `
              buyosell:"`+ trad.sellorBuy + `"
              id:` + trad.count + `
              display: false
              reprice:` + trad.count +`}
          ){
            type
          }
          
        }`
      }
          }).then(response => { 
           console.log(response);
            
          
          }
         )
         .catch(error => {
             alert(error.response);
         });
   },
   [CLEAR_TRADES](state){
     state.trading = [];
   },
  async [IMPORT_TRADES](state){
    state.trading = [];
    var importData;
    await axios({
      method: 'POST',
      url: 'https://graphql.fauna.com/graphql',
      headers: {
         "authorization": "Basic Zm5BRC1BQ0NJOUFDQU1lQkZhbEl5LWVzTFJqdTNkNDlMUFMtMXhwWjp0cmFkZXM6c2VydmVy",
      },
      data:{
        query:
        `query findTrades{
            accountsByPassword(email:"`+ state.user.getUsername() + `",password:"` + state.user.getPassword() + `"){
              data{
                email
                _id
                trade{
                  data{
                    type
                    quantity
                    price
                    buyosell
                    id
                    display
                    reprice
                    _id
                  }
                }
              }
            }
          }`
      }
          }).then(response => { 
           importData = response;
         })
         .catch(error => {
             console.log(error.response)
         }).then(response=> {
           console.log(response);
          var x = importData.data.data.accountsByPassword.data[0].trade.data.length;
          console.log(x);
          for(var z = 0; z < x; z++){
            var y = importData.data.data.accountsByPassword.data[0].trade.data[z]
            console.log(y)
            const t = new trade(y.type,y.quantity,y.reprice,y.price,y.buyosell,Number(y.id), y._id);
            console.log(t);
            state.trading.push(t);
            console.log(state.user);
          }
         });
        

        
   },
  async [LOGIN_USER](state, user){
     state.user = user;
   },
   [LOGIN_CHANGE](state){
    state.userLogin = !state.userLogin;
   },
   [USER_LOGOUT](state){
     state.userLogin=false;
     state.trading = [];
     state.user = null;
     localStorage.username = "null";
     localStorage.password = "null";
     localStorage.tid = "null";
   }

};
const actions = {
async addTrade({commit}, tr){
    commit(ADD_TRADE,tr);

  },
async deleteTrade({commit}, tr){
  commit(DEL_TRADE,tr);
},
async editTrade({commit}, tr){
  commit(EDIT_TRADE, tr);
},
clearTrades({commit}){
  commit(CLEAR_TRADES);
},
async importTrades({commit}){
  commit(IMPORT_TRADES);

},
async loginUser({commit}, user){
  commit(LOGIN_USER, user);
},

loginChange({commit}){
commit(LOGIN_CHANGE);
},

userLogout({commit}){
  commit(USER_LOGOUT);
}

};
const getters = {
  getTradeById : state => id => state.trading[id],

};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
