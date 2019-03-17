<template>
  <div id="app">
    <h1>{{ msg }} {{love}}</h1>
    <button v-on:click="count()" class="mdc-fab" aria-label="Favorite">
      <span class="mdc-fab__icon material-icons">favorite</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "How Much You Love Pixel Fight? ",
      love: 0
    };
  },
  methods: {
    count: function() {
      this.love += 1;
    }
  }
};
</script>

<style lang="css">
#app {
  color: #56b983;
}
</style>