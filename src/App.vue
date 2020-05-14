<template>
  <div id="app">
    <EleSign></EleSign>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import EleSign from "./components/EleSign";

export default {
  name: "app",
  components: {
    // HelloWorld
    EleSign
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
