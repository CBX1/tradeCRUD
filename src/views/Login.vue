<template class="test">
<div class="back">

 <div class="container" ref="container" rel="container" id="container">

	<div class="form-container sign-up-container">
		<form>
			<h1>Create Account</h1> <br><br>
			<input v-model="username" type="text" placeholder="Username" />
			<input v-model="password" type="password" placeholder="Password" /><br><br>
			<button type="button" @click="createAccount()">Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form >
			<h1>Sign in</h1> <br><br>
			<input v-model="username" type="text" placeholder="Username" />
			<input v-model="password" type="password" placeholder="Password" /><br>  <span class="incorrectPassword" v-if="incorrect_password"> Wrong username or password </span> <br>
          
			<button type="button" @click="loginCheck()">Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Have an Account?</h1><br><br>
				<br><br><button class="ghost" @click="signIn()" ref="signIn" rel="signIn">Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Don't have an account?</h1> <br> <br>
				<br><button class="ghost" @click="signUp()" id="signUp" ref="signUp" rel="signUp">Sign Up</button>
			</div>
		</div>
	</div>
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
          
              if (localStorage.tid !== "null") {
                  const t = new user(localStorage.username, localStorage.password, localStorage.tid);
                this.loginUser(t);
                this.loginChange();
              //  // console.log(localStorage.tid);
                // // console.log(data[0]._id)
                this.$router.push({name:'list'})
                  // console.log(t);
            this.loginUser(t);
            }
            else{
                // console.log("nay")
            }
              this.checkifLogin();
        },
        computed: {
            ...mapState(['user','userLogin']),
        },
        methods: {
                   ...mapActions(['loginUser','loginChange']),
                   async  createAccount(){
                await axios({
      method: 'POST',
      url: 'https://graphql.fauna.com/graphql',
      headers: {
         "authorization": "Basic Zm5BRC1BQ0NJOUFDQU1lQkZhbEl5LWVzTFJqdTNkNDlMUFMtMXhwWjp0cmFkZXM6c2VydmVy",
      },
      data:{
        query:
            `mutation createProfile{
                createAccount(data:{
                    email:"` + this.username + `"
                    password:"` + this.password + `"
                }){
                    _id
                }
                
                }`
      }
          }).then(response => { 
             if(response.data.errors){
                 console.log("hey")
             }
             else{
                 const t = new user(this.username, this.password, response.data.data.createAccount._id)
                 this.loginUser(t);
                this.loginChange();
                this.$router.push({name:'list'})
             }
         });


            },
                   signIn(){
                       this.$refs['container'].classList.remove("right-panel-active");
                    
               

                   },
                   signUp(){
                       this.username=null;
                       this.password = null;
                       this.$refs['container'].classList.add("right-panel-active");
                       this.incorrect_password = false;

                   },
        checkifLogin(){
      if(this.userLogin){
        this.$router.push({name:'list'})
      }
    },
          async  loginCheck(){
            //  // console.log(this.username + "test" )
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
               // // console.log(t)
                this.loginUser(t);
               // // console.log(this.user)
                this.loginChange();
                // // console.log(data[0]._id)
                this.$router.push({name:'list'})
                  localStorage.username = t.username;
                localStorage.password = t.password;
                localStorage.tid = t.tid;
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

@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
	box-sizing: border-box;
}

body {
	background: #f6f5f7;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: 'Montserrat', sans-serif;
	height: 100vh;
	margin: -20px 0 50px;
}

h1 {
	font-weight: bold;
	margin: 0;
}

h2 {
	text-align: center;
}

p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}

span {
	font-size: 12px;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}

button {
	border-radius: 20px;
	border: 1px solid #FF4B2B;
	background-color: #FF4B2B;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
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

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}
.back{
    display:flex;
      align-items: center;
  justify-content: center;
}
.container {
	background-color: #fff;
	border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}

.overlay {
	background: #FF416C;
	background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
	background: linear-gradient(to right, #FF4B2B, #FF416C);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
    transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}

.social-container {
	margin: 20px 0;
}

.social-container a {
	border: 1px solid #DDDDDD;
	border-radius: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 5px;
	height: 40px;
	width: 40px;
}

footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
}

footer p {
    margin: 10px 0;
}

footer i {
    color: red;
}

footer a {
    color: #3c97bf;
    text-decoration: none;
}
</style>