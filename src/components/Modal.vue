<template>
<div class= "container">
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription">
          
            <Forms :tradie="tradie"> </Forms>
              <button
              type="button"
              class="btn-g"
              @click="close"
              aria-label="Close modal"
            >
              Close
              
            </button>
      </div>
    </div>
    
  </transition>
  </div>
</template>

<script>
import Forms from './Forms.vue';
  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
    props :{
       tradie:{
           type: Object,
           default: () => {}
       }
       
   },
    components: {
    Forms,
  },
  } 
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow:hidden;
  }

  .modal {
    box-shadow: 2px 2px 20px 1px;
    background-color:white; 
    box-shadow: 13px 13px 20px;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-g-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }


  .container{
    display:flex
  }
  .btn-g {
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

label{
  font-size:20px;
}
</style>