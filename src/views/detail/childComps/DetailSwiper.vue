<template>
  <div class="detail-swiper">
    <swiper class="swiper-box">
      <swiper-item v-for="(item, index) in topImgs" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  props: {
    topImgs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
  .swiper-box {
    height: 300px;
    overflow: hidden;
  }
</style>
