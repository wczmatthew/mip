<!-- 导购页面 -->
<template lang='html'>
  <div class="w-container">
    <!-- 顶部栏 -->
    <!-- <header class="w-header">

      <div class="w-header-mid">
        店内模式
      </div>

      <div class="header-right">
        <w-msg-icon color="blue"></w-msg-icon>
        <i class="iconfont icon-cart"></i>
      </div>
    </header> -->
    <!-- 顶部栏 end -->

    <div class="w-content">
      <div class="w-grid-list">
        <div class="item" v-for="(item, index) in list" :key="index" @click="toCategory(item)">
          <div class="img">
            <w-img :src="item.image"/>
          </div>
          <div class="detail">
            <p>{{item.name}}</p>
            <p>{{item.memo}}</p>
          </div>
        </div>
      </div>

      <!-- 按钮区域 -->
      <!-- <div class="icon-list">
        <div class="icon">
          <i class="iconfont icon-daogou" @click="toProductList()"></i>
        </div>
        <div class="icon" @click="toCategory()">
          <i class="iconfont icon-fenlei"></i>
        </div>
      </div> -->
      <!-- 按钮区域 end -->
    </div>
  </div>
</template>
<script>
// import img from '@/assets/guide/img.png';
import Utils from '@/common/Utils';
import service from '@/services/product.service';

export default {
  data() {
    return {
      list: [],
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  components: {},
  methods: {
    async getData() {
      Utils.showLoading();
      const result = await service.getTopShelfList({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      this.list = [...result];
    },
    toCategory(item) {
      if (item) {
        this.$router.push(`/market/category?id=${item.id}`);
        return;
      }
      this.$router.push('/market/category');
    },
    toProductList() {
      this.$router.push('/market/productCategory');
      // this.$router.push('/market/productList');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.w-content {
  background: url('~@/assets/guide/bg.jpg') no-repeat;
  background-size: cover;
}

.w-grid-list {
  width: 80%;
  margin: 0 auto;
  padding-top: 57vh;

  .item {
    width: 26%;
    margin-right: 11%;
    height: .4rem;
    border-radius: .05rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0;
    background: $color-blue;
    margin-bottom: .15rem;
    box-shadow: 0 .02rem .05rem #313131;
    opacity: .85;

    &:nth-child(3n) {
      margin-right: 0;
    }

    .img {
      width: 50%;
      height: 100%;
      overflow: hidden;
      background: #fff;
      padding: .05rem 0;
      img {
        height: 100%;
        display: block;
        margin: 0 auto;
      }
    }

    .detail {
      flex: 1;
      overflow: hidden;
      padding-top: .05rem;
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
  bottom: .4rem;

  .icon {
    width: .3rem;
    height: .3rem;
    border-radius: .3rem;
    background: $color-blue;
    color: #fff;
    text-align: center;
    line-height: .3rem;
    font-size: 22px;
    margin-bottom: .1rem;

    &:active {
      opacity: .6;
    }
  }
}
</style>