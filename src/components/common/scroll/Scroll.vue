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
    props: {
      probeType: {
        type: Number,
        default: 0
      }
    },
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
        click: true,
        probeType: this.probeType
      })
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })
    },
    methods: {
      scrollTo(x, y, time=800) {
        this.scroll.scrollTo(x, y, time)
      }
    }
  }
</script>

<style scoped>

</style>
