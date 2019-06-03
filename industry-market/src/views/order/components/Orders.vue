<!-- 订单列表 -->
<template lang='html'>
  <div class="w-container">
    <nav class="w-tabbar">
      <div class="item txt" v-for="(item, index) in tabList" :key="index"
      :class="{'actived': item.value == tabValue}" @click="onChangeTab(item, index)">
        {{ item.title }}
      </div>
      <div class="line" :style="{'width': lineWidth + '%', 'left': tabIndex * lineWidth + '%'}"></div>
    </nav>

    <div class="w-content">
      <!-- 正文内容 -->
      <w-scroll
        ref="scroll"
        class="scroll-view"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <div class="order-list">
          <no-data v-if="noData"></no-data>
          <w-loading-row v-if="firstLoading"></w-loading-row>

          <!-- 订单信息 -->
          <div class="item">
            <div class="store">
              <span class="msg">
                <i class="iconfont icon-store"></i>
                xxxxx店铺
                <i class="iconfont icon-arrow-right"></i>
              </span>
              <span class="status">
                已发货
              </span>
            </div>

            <!-- 产品列表 -->
            <div class="product-item">
              <div class="img">
                <w-img src="/assets/mall/product.png" alt=""/>
              </div>
              <div class="detail">
                <div class="row">
                  <span>空气开关NXB2LB-2P</span>
                  <span class="price">
                    ￥200.00
                  </span>
                </div>
                <div class="row">
                  <span class="desc">2P</span>
                  <span class="desc">
                    X1
                  </span>
                </div>
              </div>
            </div>
            <!-- 产品列表 end -->

            <!-- 订单总计 -->
            <div class="order-total">
              共1件商品 合计: <span class="price">￥200.00</span>
            </div>
            <!-- 订单总计 end -->

            <!-- 按钮区域 -->
            <div class="order-bottom">
              <button>申请售后</button>
              <button class="grey">查看详情</button>
              <button class="grey">删除订单</button>
            </div>
            <!-- 按钮区域 end -->
          </div>
          <!-- 订单信息 end -->
        </div>
      </w-scroll>
      <!-- 正文内容 end -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      firstLoading: false,
      pageNum: 1,
      pageSize: 10,
      hasNext: true,
      noData: false,
      tabValue: -1,
      tabIndex: 0,
      tabList: [
        { title: '全部', value: -1 },
        { title: '售后中', value: 1 },
        { title: '待支付', value: 2 },
        { title: '待收货', value: 3 },
        { title: '待发货', value: 4 },
        { title: '已完成', value: 5 },
        { title: '已关闭', value: 6 },
      ],
      lineWidth: 100 / 7,
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {
    onChangeTab(item, index) {
      if (this.tabValue === item.value) return;
      this.tabValue = item.value;
      this.tabIndex = index;
    },
    // 下拉刷新
    onPullingDown() {
      this.pageNum = 1;
      // this.getData();
    },
    // 上拉加载
    onPullingUp() {
      if (!this.hasNext) {
        // 没有数据
        this.$refs.scroll.forceUpdate(true);
        return;
      }
      console.log('111');
      // this.getData();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.w-tabbar {
  background: #fff;
  border-top: 0;
  transition: all .3s ease;
  position: relative;

  .item {
    color: $color-black;
  }

  .item.actived {
    color: $color-blue;
  }

  .line {
    height: .01rem;
    background: $color-blue;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    transition: all .3s ease;
  }
}

.order-list {
  width: 80%;
  margin: 0 auto;
  padding-top: .2rem;

  .item {
    background: #fff;
    border-radius: .05rem;
    padding: .1rem .15rem;
    padding-right: 0;
    padding-bottom: 0;
    margin-bottom: .1rem;

    .store {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: .15rem;

      .msg {
        color: $color-grey-6;
        @include text-ellipsis;
        display: flex;
        align-items: center;
        height: .3rem;

        .iconfont {
          margin-right: .05rem;
        }

        .icon-store {
          font-size: .16rem;
        }

        .icon-arrow-right {
          font-size: .1rem;
          font-weight: 700;
          margin-left: .03rem;
        }
      }

      .status {
        font-size: .16rem;
        flex-shrink: 0;
        color: $color-blue;

        &.red {
          color: $color-red;
        }

        &.grey {
          color: $color-grey;
        }

        &.green {
          color: $color-green;
        }
      }
    } // end store

    .product-item {
      display: flex;
      padding-right: .15rem;

      .img {
        width: 20%;
        flex-shrink: 0;
        margin-right: .1rem;
        img {
          width: 100%;
        }
      } // end img

      .detail {
        flex: 1;
        overflow: hidden;
        padding: .15rem 0;

        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          @include text-ellipsis;
          margin-bottom: .05rem;
          .price {
            max-width: 40%;
          }

          .desc {
            color: $color-grey;
            font-size: .12rem;
          }
        } // end row
      }
    } // end product-item

    .order-total {
      text-align: right;
      @include text-ellipsis;
      padding-right: .15rem;
      font-size: .12rem;

      .price {
        color: $color-red;
        font-size: .16rem;
      }
    } // end order-total

    .order-bottom {
      display: flex;
      justify-content: flex-end;
      margin-top: .1rem;
      padding-right: .05rem;

      button {
        display: block;
        padding: .1rem .1rem ;
        color: $color-blue;
        border: 0;
        font-size: .12rem;

        &.grey {
          color: $color-grey-6;
        }

        &:active {
          background: $color-bg;
        }
      }
    } // end order-button
  } // end item
}// end order-list
</style>