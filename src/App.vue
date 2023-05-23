<template>
      <router-view />
</template>

<script>
  // import { defineComponent } from "vue";
  export default {
  name: 'App'
  // mounted: async () => {
  //   //Animate being hidden after 2500ms and then remove after 500ms
  //   await new Promise((r) => setTimeout(r, 2500));
  //   document.getElementById("white").classList.add("hidden");
  //   await new Promise((r) => setTimeout(r, 500));
  //   document.getElementById("white").remove();
  // },
}
// export default defineComponent({
//   name: 'App'
//   // mounted: async () => {
//   //   //Animate being hidden after 2500ms and then remove after 500ms
//   //   await new Promise((r) => setTimeout(r, 2500));
//   //   document.getElementById("white").classList.add("hidden");
//   //   await new Promise((r) => setTimeout(r, 500));
//   //   document.getElementById("white").remove();
//   // },
// })
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
:root {
  --sidebar-bg-color: #676a6c;
  --sidebar-item-hover: #494b4a;
  --sidebar-item-active: #4b504e;
  /* --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749; */
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
