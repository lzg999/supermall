<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommendItem">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommondView',
  props: {
    recommends: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {

  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    padding: 6px 0 10px;
    border-bottom: 8px solid #eee;
  }
  .recommendItem {
    flex: 1;
  }
  .recommendItem img{
    width: 80%;
    margin-bottom: 5px;
  }
</style>
