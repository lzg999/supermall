<template>
  <div class="container">
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: "home",
  data() {
    return {

    }
  },
  components: {
    NavBar
  },
  methods: {

  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
