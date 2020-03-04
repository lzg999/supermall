<template>
  <div>
详情页
{{iid}}
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      iid: null
    }
  },
  components: {

  },
  created() {
    this.iid = this.$route.query.iid
    console.log('接收的id：' + this.$route.query.iid)
  }
}
</script>

<style scoped>

</style>
