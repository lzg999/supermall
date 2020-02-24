<template>
  <div class="wrapper" ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    components: {

    },
    created() {

    },
    mounted() {
      this.scroll = new BScroll(this.$refs.scroll, {

      })
    }
  }
</script>

<style scoped>

</style>
