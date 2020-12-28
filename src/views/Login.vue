<template class="test">
    <div class="back">
    <div class="container">
        <form class="container"><br>
        <span id="signin"> Sign in</span><br>
        <br><span class="par"> Username </span> <br><br>
        <input v-model="username" class="inputText" type="text"/><br><br><br> <br>
        <span class="par"> Password </span> <br><br>
        <input v-model="password" class="inputText" type="password"/><br> <br><br>
    <br> <button class="buttonclass" type="button" @click="loginCheck">  Login </button><br> <br>
    <button class="buttonclass1" @click="register"> Don't have an account? </button>
        </form>
            <br>
        <p v-if="incorrect_password"> incorrect password </p>
    <br>
     </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import user from '../classes/User';
import axios from 'axios'
    export default {
        name: 'Login',
        data() {
            return {
                username: null,
                password: null,
                incorrect_password: false

            }
        },
        created() {
            this.checkifLogin();
        },
        computed: {
            ...mapState(['user','userLogin']),
        },
        methods: {
                   ...mapActions(['loginUser','loginChange']),
        register(){
             this.$router.push({name:'newaccount'})
        },
        checkifLogin(){
      if(this.userLogin){
        this.$router.push({name:'about'})
      }
    },
          async  loginCheck(){
              console.log(this.username + "test" )
              if((this.username != "" && this.username != null) && (this.password != "" && this.password != null)   ){
                    await axios({
      method: 'POST',
      url: 'https://graphql.fauna.com/graphql',
      headers: {
         "authorization": "Basic Zm5BRC1BQ0NJOUFDQU1lQkZhbEl5LWVzTFJqdTNkNDlMUFMtMXhwWjp0cmFkZXM6c2VydmVy",
      },
      data:{
        query:
            `query findProfile{
                accountsByPassword(
                    email:"`+this.username + `"
                    password:"` + this.password + `"
                ){
                    data {
                    email
                    password
                    _id
                    }
                }
            
            }`
      }
          }).then(response => { 
              var data = response.data.data.accountsByPassword.data;
           if(Number(data.length) == 0){
               this.incorrect_password = true;
               

           }
           else{
                const t = new user(data[0].email,data[0].password, data[0]._id);
                console.log(t)
                this.loginUser(t);
                console.log(this.user)
                this.loginChange();
                console.log(data[0]._id)
                this.$router.push({name:'about'})
           }
         });

              }
              else{
                  this.incorrect_password=true;
              }
        }
        },
    }
</script>

<style scoped>
.back{
    display:flex;
      align-items: center;
  justify-content: center;
}
.buttonclass{
    background-color:#FF8E3C;
    color:#001e1d;
    border:none;
    justify-content:center;
    padding:15px;
    font-size: 25px;
    font-family: "Segoe UI", Segoe, UI;
}

.buttonclass1{
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
    color:grey;
    font-size: 15px;
    font-family: "Segoe UI", Segoe, UI;
}


.container{
    display:flex;
    flex-direction:column;
    background-color:#EFF0F3;
    align-items: center;
  justify-content: center;
    width:75%;
    height:100%;
}
test{
    width:100%;
}
.par{
    color:##0D0D0D;
     font-size: 30px;
    font-family: "Segoe UI", Segoe, UI;
}
.inputText{
    width:100%;
    font-size:25px;
    text-align:center;

 
}
input[type=text] {
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;
}
input[type=password] {
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}
#signin{
    font-size: 90px;
    font-family: "Segoe UI", Segoe, UI;
}
#register{
    color:grey;
}
</style>