<template>
  <div class="container">
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
    </nav-bar>
    <tab-control class="tab-a" :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabcontrol1" v-show="isTabFixed"/>
    <scroll class="content-scroll" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="scrollTop" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperLoad="swiperLoad"/>
      <Recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabcontrol2"/>
      <goods-list :goods="showgoods"/>
    </scroll>
    <back-top @click.native="backclick" v-show="isShow"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from 'common/until'

  export default {
    name: "home",
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop':{page: 0, list: []},
          'new':{page: 0, list: []},
          'sell':{page: 0, list: []}
        },
        currentType: 'pop',
        isShow: false,
        taboffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    computed:{
      showgoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch(index) {
          case 0: 
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2: 
            this.currentType = 'sell'
            break
        }
        this.$refs.tabcontrol1.currentIndex = index
        this.$refs.tabcontrol2.currentIndex = index
      },
      backclick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      scrollTop(position) {
        // 1.判断backTop是否显示
        this.isShow = (-position.y) > 200
        
        // 2.判断tabcontrol是否吸顶（position: fixed）
        this.isTabFixed = (-position.y) > (this.taboffsetTop - 42)
      },
      loadMore() {
        this.getHomeGoods(this.currentType)  
      },
      swiperLoad() {
        this.taboffsetTop = this.$refs.tabcontrol2.$el.offsetTop
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page +=1

          this.$refs.scroll.finishPullUp()
        })
      }
    },
    destroyed() {
      console.log('Home已销毁')
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    created() {
      this.getHomeMultidata(),
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('imgLoad', () => {
        refresh()
      })
    }
  }
</script>

<style scoped>
  .container {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .content-scroll {
    height: calc(100% - 93px);
    overflow: hidden;
  }
  .tab-a {
    position: fixed;
    width: 100%;
    z-index: 9;
  }
</style>
