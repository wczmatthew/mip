<!-- 导购页面 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      展厅导购
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <div class="guide-container">
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
    </div>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
// import img from '@/assets/guide/img.png';
import Utils from '@/common/Utils';
import service from '@/services/product.service';

export default {
  data() {
    return {
      list: [],
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'guide' }), // 获取当前路由
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
        this.$router.push(`${this.routePath}/guideCategory?id=${item.id}`);
        return;
      }
      this.$router.push(`${this.routePath}/guideCategory`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.guide-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: url('~@/assets/guide/bg.jpg') no-repeat;
  background-size: cover;
  background-position: center;
}

.w-grid-list {
  width: 90%;
  margin: 0 auto;
  padding-top: 57vh;
  justify-content: space-between;

  .item {
    width: 46%;
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

    &:nth-child(2n) {
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
