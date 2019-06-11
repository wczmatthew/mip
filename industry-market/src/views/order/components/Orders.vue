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
        <div class="height-10"></div>
        <div class="order-list">
          <no-data v-if="!dataList.length"></no-data>
          <w-loading-row v-if="firstLoading"></w-loading-row>

          <!-- 订单信息 -->
          <div class="item" v-for="(item, index) in dataList" :key="index">
            <div class="store">
              <span class="msg">
                <i class="iconfont icon-store"></i>
                {{item.companyName}}
                <!-- <i class="iconfont icon-arrow-right"></i> -->
              </span>
              <span class="status" :class="[getOrderColor(item)]">
                <!-- 已发货 -->
                {{getOrderText(item)}}
              </span>
            </div>

            <!-- 产品列表 -->
            <div class="product-item" v-for="(product, productIndex) in item.itemList" :key="index+productIndex">
              <div class="img">
                <w-img :src="product.imgPath" alt=""/>
              </div>
              <div class="detail">
                <div class="row">
                  <span>{{product.xhgg}}</span>
                  <!-- <span class="price">
                    ￥{{product.normSum}}
                  </span> -->
                </div>
                <div class="row">
                  <span class="desc">X{{product.qty || 0}}</span>
                  <span class="desc price">
                    ￥{{product.normSum}}
                  </span>
                </div>
              </div>
            </div>
            <!-- 产品列表 end -->

            <!-- 订单总计 -->
            <div class="order-total">
              共{{item.totalCount || 0}}件商品 合计: <span class="price">￥{{item.totalPrice}}</span>
            </div>
            <!-- 订单总计 end -->

            <!-- 按钮区域 -->
            <div class="order-bottom">
              <button v-if="item.billType == 2" @click.stop="onConfirmReceive(item, index)">
                确认收货
              </button>
              <button class="grey" @click.stop="toDetail(item)">查看详情</button>
              <button class="grey" v-if="item.billType == 1" @click.stop="onCloseOrder(item, index)">
                关闭订单
              </button>
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
import service from '@/services/order.service';
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      firstLoading: true,
      loading: false,
      pageNum: 1,
      pageSize: 5,
      hasNext: true,
      noData: false,
      tabValue: -1,
      tabIndex: 0,
      tabList: [
        { title: '全部', value: -1 },
        // { title: '售后中', value: 4, color: 'grey' },
        { title: '待发货', value: 1, color: 'yellow' },
        { title: '待收货', value: 2, color: 'blue' },
        { title: '已完成', value: 3, color: 'green' },
        { title: '已关闭', value: 5, color: 'grey' },
      ],
      lineWidth: 100 / 5,
      dataList: [],
      customer: {},
    };
  },
  created() {},
  mounted() {
    if (this.$route.query.status) {
      this.tabValue = parseInt(this.$route.query.status, 10) || -1;
      const index = this.tabList.findIndex(tab => tab.value === this.tabValue);
      this.tabIndex = index <= 0 ? 0 : index;
    }
    this.onPullingDown();
  },
  components: {},
  methods: {
    // 获取订单状态颜色
    getOrderColor(item) {
      const list = this.tabList.filter(tab => tab.value === item.billType);
      if (!list || !list.length) return '';
      return list[0].color;
    },
    // 获取订单状态文字
    getOrderText(item) {
      const list = this.tabList.filter(tab => tab.value === item.billType);
      if (!list || !list.length) return '';
      return list[0].title;
    },
    onChangeTab(item, index) {
      if (this.tabValue === item.value) return;
      this.tabValue = item.value;
      this.tabIndex = index;
      this.firstLoading = true;
      this.onPullingDown();
    },
    // 下拉刷新
    onPullingDown() {
      this.pageNum = 1;
      this.getData();
    },
    // 上拉加载
    onPullingUp() {
      if (!this.hasNext) {
        // 没有数据
        this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
        return;
      }
      this.getData();
    },
    async getData() {
      const result = await service.getOrderList({ userid: Utils.getUserId(this), pageNum: this.pageNum, pageSize: this.pageSize, type: this.tabValue === -1 ? '' : this.tabValue });
      if (this.firstLoading) {
        this.firstLoading = false;
      }
      if (!result) return;
      // 整理数据
      if (this.pageNum === 1) {
        this.dataList = [...result.rows];
        this.noData = !this.dataList.length;
      } else {
        this.dataList = this.dataList.concat([...result.rows]);
      }
      // 判断是否还有下一页
      this.hasNext = this.dataList.length < result.total;
      if (this.hasNext) {
        this.pageNum += 1;
      }
      this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
    },
    // 查看详情
    toDetail(item) {
      this.$router.push(`${this.currentPath}/orderDetail?id=${item.billNo}`);
    },
    // 确认收货
    async onConfirmReceive(item, index) {
      if (this.loading) return;
      this.loading = true;
      Utils.showLoading();
      const result = await service.changeOrderType({ userid: Utils.getUserId(this), orderId: item.billNo, type: 3 });
      Utils.hideLoading();
      this.loading = false;
      if (!result) return;
      Utils.showToast('确认收货成功');
      if (this.tabValue === -1) {
        // 全部
        item.billType = 3;
        return;
      }

      // 待收货状态
      this.dataList.splice(index, 1);
    },
    // 关闭订单
    async onCloseOrder(item, index) {
      if (this.loading) return;
      this.loading = true;
      Utils.showLoading();
      const result = await service.changeOrderType({ userid: Utils.getUserId(this), orderId: item.billNo, type: 5 });
      Utils.hideLoading();
      this.loading = false;
      if (!result) return;
      Utils.showToast('关闭订单成功');
      if (this.tabValue === -1) {
        // 全部
        item.billType = 5;
        return;
      }

      // 对应状态
      this.dataList.splice(index, 1);
    },
  },
  props: {
    currentPath: {
      type: String,
      default: '',
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

        &.yellow {
          color: $color-yellow;
        }
      }
    } // end store

    .product-item {
      display: flex;
      padding-right: .15rem;
      padding-top: .1rem;

      .img {
        width: .6rem;
        height: .6rem;
        flex-shrink: 0;
        margin-right: .1rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: 100%;
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

          .desc.price {
            color: $color-black;
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