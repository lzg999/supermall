<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-imgs="topImgs"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'

  import {getDetail, Goods} from 'network/detail'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImgs: [],
      goods: {}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  },
  created() {
    this.iid = this.$route.query.iid
    getDetail(this.iid).then(res => {
      // 2.1.获取结果
      const data = res.result;
      // 2.2.获取顶部信息
      this.topImgs = data.itemInfo.topImages;
      // 2.3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
    })
  },
  
}
</script>

<style scoped>

</style>
