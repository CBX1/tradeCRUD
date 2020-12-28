<template>
  <div id="app">
  <br>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
    top:0;
  left:0;
  width:100%;
  padding: 0px;

}
* {
    margin: 0;
    padding: 0;
  }

    body {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fffffe;
    }
#nav {
  color: #716040;
}

#nav a {
  font-weight: bold;
}
.newcolor{
  color:#fffffe
}

</style>
