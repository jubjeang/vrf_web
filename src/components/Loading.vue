<template>
  <div>
    <div class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script> 
import { ref } from "vue";
export default { 
    name: 'Loading'
//     ,props: {loading:{type: Boolean,required:true}}
//     ,setup(props) {
//     const loading_ = ref(false)
//     loading_.value = props.loading
//     // setup() receives props as the first argument.
//     console.log(loading_.value)
//     return {loading_}
//   }
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>