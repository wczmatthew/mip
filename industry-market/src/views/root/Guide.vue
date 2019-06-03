<!-- 导购页面 -->
<template lang='html'>
  <div class="w-container">
    <!-- 顶部栏 -->
    <header class="w-header">

      <div class="w-header-mid">
        店内模式
      </div>

      <div class="header-right">
        <w-msg-icon color="blue"></w-msg-icon>
        <i class="iconfont icon-cart"></i>
      </div>
    </header>
    <!-- 顶部栏 end -->

    <div class="w-content">
      <div class="w-grid-list">
        <div class="item" v-for="(item, index) in list" :key="index" @click="toCategory(item)">
          <div class="img">
            <w-img :src="item.imgUrl"/>
          </div>
          <div class="detail">
            <p>{{item.area}}</p>
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>

      <!-- 按钮区域 -->
      <div class="icon-list">
        <!-- <div class="icon">
          <i class="iconfont icon-store"></i>
        </div> -->
        <div class="icon">
          <i class="iconfont icon-daogou" @click="toProductList()"></i>
        </div>
        <div class="icon" @click="toCategory()">
          <i class="iconfont icon-fenlei"></i>
        </div>
      </div>
      <!-- 按钮区域 end -->
    </div>
  </div>
</template>
<script>
import img from '@/assets/guide/img.png';

export default {
  data() {
    return {
      list: [
        { imgUrl: img, area: 'A区', content: '控制电器区' },
        { imgUrl: img, area: 'B区', content: '控制电器区1' },
        { imgUrl: img, area: 'C区', content: '控制电器区2' },
        { imgUrl: img, area: 'D区', content: '控制电器区3' },
        { imgUrl: img, area: 'E区', content: '控制电器区4' },
      ],
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {
    toCategory(item) {
      if (item) {
        this.$router.push(`/market/category?id=${item.id}`);
        return;
      }
      this.$router.push('/market/category');
    },
    toProductList() {
      this.$router.push('/market/productList');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.w-content {
  background: url('~@/assets/guide/bg.png') no-repeat;
  background-size: cover;
}

.w-grid-list {
  width: 80%;
  margin: 0 auto;
  justify-content: space-between;
  padding-top: .2rem;

  .item {
    width: 45%;
    height: .6rem;
    border-radius: .05rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0;
    background: $color-blue;
    margin-bottom: .2rem;
    box-shadow: 0 .02rem .05rem #000;

    .img {
      width: 50%;
      height: 100%;
      overflow: hidden;
      background: #fff;
      img {
        height: 100%;
        display: block;
        margin: 0 auto;
      }
    }

    .detail {
      flex: 1;
      overflow: hidden;
      p {
        color: #fff;
        margin-bottom: .05rem;
        text-align: center;
      }
    }
  } // end item
}

.icon-list {
  position: fixed;
  z-index: 20;
  right: .1rem;
  bottom: .5rem;

  .icon {
    width: .4rem;
    height: .4rem;
    border-radius: .4rem;
    background: $color-blue;
    color: #fff;
    text-align: center;
    line-height: .4rem;
    font-size: .22rem;
    margin-bottom: .1rem;

    &:active {
      opacity: .6;
    }
  }
}
</style>