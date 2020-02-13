<template>
  <div id="app">
    <header>
      <div>
        <i class="el-icon-s-home">English Number</i>
      </div>
      <div>
        <router-link to="/number" tag="el-button">Number</router-link>
        <router-link to="/date" tag="el-button">Date</router-link>
      </div>
    </header>
    <router-view></router-view>
    <input-box></input-box>
  </div>
</template>

<script>
export default {
  name: 'App',
  el:'#app'
}
</script>

<style>
header{
  display: flex;
  justify-content: space-between;
}
</style>
