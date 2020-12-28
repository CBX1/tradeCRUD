<template>
    <div>
      <form>
    Create Account <br>
    Username<br>
    <input v-model="username" type="text"/><br>
    Password <br>
    <input v-model="password" type="text"/><br>
    <button type="button" @click="createAccount"> Login </button>
    </form>
    </div>
</template>

<script>
import axios from 'axios';
import user from '../classes/User';
import {mapActions} from 'vuex';
    export default {
        data() {
            return {
                username: null,
                password: null
            }
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
                this.$router.push({name:'about'})
             }
         });


            }
        },
    }
</script>

<style scoped>

</style>