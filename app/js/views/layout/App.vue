<template>
    <main>
        <router-view></router-view>
    </main>
</template>

<script>
  export default {
    data: () => {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style lang="scss">
    @import "../../../scss/style";
</style>
