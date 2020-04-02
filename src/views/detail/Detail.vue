<template>
  <div id="detail">
    <detail-nav-bar class="detail-bar"></detail-nav-bar>
    <Scroll class="scroll" ref="scroll">
      <detail-swiper :top-imgs="topImgs"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
    </Scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {itemListenerMixin} from 'common/mixin'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImgs: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: []
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList
  },
  mixins: [itemListenerMixin],
  created() {
    this.iid = this.$route.query.iid
    getDetail(this.iid).then(res => {
      // 2.1.获取结果
      const data = res.result;

      // 2.2.获取顶部信息
      this.topImgs = data.itemInfo.topImages;

      // 2.3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      // 2.4.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 2.5.获取商品详情信息
      this.detailInfo = data.detailInfo;

      // 2.6. 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // 2.7. 获取评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    }),
    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
    }
  },
  destroyed() {
    this.$bus.$off('imgLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 11;
    background-color: #fff;
    height: 100vh;
  }
  .detail-bar {
    position: relative;
    top: 0;
    background-color: #fff;
    z-index: 9;
  }
  .scroll {
    height: calc(100% - 44px)
  }
</style>
