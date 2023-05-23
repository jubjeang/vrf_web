<template>
    <div class="alert-popup" v-if="isOpen_">
      <div class="alert-box">
        <div class="alert-header">แจ้งเตือน</div>
        <div class="alert-body">{{ message }}</div>
        <div class="alert-footer">
          <button @click="onClose">ปิด</button>
          <!-- <button @click="onConfirm">Confirm</button> -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref,toRef } from 'vue';
  
  export default {
    name: 'Alert_popup',
    props: { 
      message: {
        type: String,
        required: true
      },
      isOpen: {
        type: Boolean,
        required: true
      }
    },
    setup(props, { emit }) {
        const isOpen_ref = toRef(props, 'isOpen');
        console.log('typeof isOpen_ref:',typeof isOpen_ref.value)
        console.log('isOpen_ref.value:', isOpen_ref.value)    
        const isOpen_ = ref( true );
        console.log('isOpen :',isOpen_.value) 
        const onClose = () => { 
          console.log('aaa')
          isOpen_.value= false;
          emit('close');
        };  
        const onConfirm = () => {
          onClose();
          emit('confirm');
        };  
        return { isOpen_, onClose, onConfirm };
    }
  };
  </script>
  
  <style scoped>
  .alert-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .alert-box {
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0px 0px 2rem rgba(0, 0, 0, 0.5);
    max-width: 50rem;
    width: auto;
    padding-top: 3rem;
    padding-bottom: 3rem;
    padding-right: 3rem;
    padding-left: 3rem;
  }
  
  .alert-header {
    font-size: 2rem;
    font-weight: bold;
    color: red;
    margin-bottom: 0rem;
    margin-left: 0rem;
    padding-left: 0rem;
    justify-content: left;
    align-items: left;
    padding-bottom: 1rem;
  }
  .alert-body {
    font-size: 20px;
    line-height: 1.5rem;
    margin-bottom: auto;
    padding-bottom: 2rem;
  }
  
  .alert-footer {
    display: flex;
    justify-content: center;
  }
  
  button {
    margin-left: 10px;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #3498db;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>
  