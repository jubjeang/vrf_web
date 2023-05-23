<template>
<nav class="navbar navbar-expand-sm navbar-dark">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="mynavbar">
      <div class="navbar-nav me-auto">
         &nbsp;
      </div>
      <div class="d-flex">
        <div>
         <span class="text-white h6">{{ user_name }}</span> <span class="text-white h6">|</span>  <router-link to="/" class="link h6 text-white text-decoration-none" >ออกจากระบบ</router-link>
      </div>
      </div>
    </div>
  </div>
</nav>

</template>
<script>
import { useRoute } from 'vue-router'
export default {
  name: 'HeaderMain',
  data() {
    return {
      user_id: "",
      user_name: "",
      message: "",
    }
  },
    created() {
    try {
      this.user_name= localStorage.getItem('user_name')
      this.user_id= localStorage.getItem('user_id')
    }
    catch (err) {
      console.log(err)
      this.message = "Something went wrong"
      this.error = true
    }
  }
}
</script>
<style scoped>
nav{  background-color:darkgrey}

#nav {
  padding: 0px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: whitesmoke;
  background: crimson;
  border-radius: 0.5rem;
}
</style>
