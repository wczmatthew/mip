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
          <div class="item" v-for="(item, index) in dataList" :key="index" @click.stop="toDetail(item)">
            <div class="store">
              <span class="msg">
                <i class="iconfont icon-store"></i>
                {{item.name || item.companyName}}
                <!-- <i class="iconfont icon-arrow-right"></i> -->
              </span>
              <span class="status" :class="[getOrderColor(item)]">
                <!-- 已发货 -->
                {{getOrderText(item)}}
              </span>
            </div>

            <div class="product-list">
              <!-- 产品列表 -->
              <div class="product-item" v-for="(product, productIndex) in item.itemList" :key="index+productIndex">
                <div class="img">
                  <w-img :src="product.imgPath" alt=""/>
                </div>
                <div class="detail">
                  <div class="row" style="width: 55%; display: block;">
                    {{product.xhgg}}
                    <!-- <span></span> -->
                    <!-- <span class="price">
                      ￥{{product.normSum}}
                    </span> -->
                  </div>
                  <div class="row">
                    <span class="desc">X{{product.qty || 0}}</span>
                    <span class="desc price">
                      ￥{{product.discountSum || product.normSum}}
                    </span>
                  </div>
                </div>
              </div>
              <!-- 产品列表 end -->

              <!-- 二维码 -->
              <div class="code-img">
                <w-img :src="item.qrCodeStr"></w-img>
              </div>
              <!-- 二维码 -->
            </div>

            <!-- 订单总计 -->
            <div class="order-total">
              共{{item.totalCount || 0}}件商品 合计: <span class="price">￥{{item.totalDiscountPrice || item.totalPrice}}</span>
            </div>
            <!-- 订单总计 end -->

            <!-- 按钮区域 -->
            <div class="order-bottom">
              <!-- <button class="grey" @click.stop="showCode(item)">
                查看二维码
              </button> -->
              <button v-if="item.billType == 2" @click.stop="onConfirmReceive(item, index)">
                确认收货
              </button>
              <button v-if="item.billType == 6" @click.stop="onConfirmPay(item, index)">
                确认付款
              </button>
              <button class="grey" @click.stop="toDetail(item)">
                查看详情
              </button>
              <button class="grey" v-if="item.billType == 1 || item.billType == 6" @click.stop="onCloseOrder(item, index)">
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

    <!-- 弹窗内容 -->
    <w-modal ref="onlinePayModal">
      <div class="online-pay">
        <p class="price">
          ￥{{orderPrice.toFixed(2)}}
        </p>
        <div class="code-list">
          <div class="code-img">
            <img src="~@/assets/common/zhifubao.png" alt="">
            <p>支付宝付款</p>
          </div>
          <div class="code-img">
            <img src="~@/assets/common/weixin.png" alt="">
            <p>微信付款</p>
          </div>
        </div>
      </div>
    </w-modal>

    <w-modal ref="offlinePayModal">
      实付金额为<span class="price">￥{{orderPrice.toFixed(2)}}</span>, 请前往柜台完成付款
    </w-modal>

    <w-modal ref="resultModal">
      <div class="pay-success">
        <div class="icon">
          <img src="~@/assets/common/order-success.png" alt="">
        </div>
        <div class="detail">
          <p class="title">
            订单支付成功！
          </p>
          <div class="desc">
            <span class="sub-title">订单号：</span>
            <span class="black">{{orderDetail.billNo || '--'}}</span>
          </div>
          <div class="desc">
            <span class="sub-title">已付款：</span>
            <span class="price">￥{{orderDetail.totalDiscountPrice || orderDetail.totalPrice || 0}}</span>
          </div>
        </div>
      </div>
    </w-modal>

    <w-modal ref="imgModal" class="img-modal">
      <div class="img-container">
        <img :src="codeImg" alt="">
      </div>
    </w-modal>
    <!-- 弹窗内容 end -->
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
        { title: '待付款', value: 6, color: 'red' },
        { title: '待发货', value: 1, color: 'blue' },
        { title: '待收货', value: 2, color: 'blue' },
        { title: '已完成', value: 3, color: 'green' },
        { title: '已关闭', value: 5, color: 'grey' },
      ],
      lineWidth: 100 / 5,
      dataList: [],
      customer: {},
      orderPrice: 0,
      orderDetail: {},
      codeImg: '',
    };
  },
  created() {},
  mounted() {
    this.lineWidth = 100 / this.tabList.length;
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
      this.$nextTick(() => {
        this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0, 300);
      });
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
    // 查看二维码图片
    showCode(item) {
      this.codeImg = item.qrCodeStr;
      this.$refs.imgModal.show({
        showBtns: false,
      });
    },
    // 确认付款, 付款成功
    onConfirmPay(item, index) {
      this.orderDetail = item;
      this.orderPrice = Number(item.totalDiscountPrice || item.totalPrice);
      // 老客户
      if (Number(item.payType) === 1) {
        // 在线支付
        this.$refs.onlinePayModal.show({
          title: '扫描二维码进行付款',
          confirmTxt: '完成付款',
          cancleTxt: '取消付款',
          callback: (res) => {
            if (res !== 'confirm') return;
            // 点击完成付款, 生成订单信息
            this.payOrder(item, index);
          },
        });
        return;
      }

      // 柜台付款
      this.$refs.offlinePayModal.show({
        title: '现金刷卡',
        content: '',
        confirmTxt: '完成付款',
        cancleTxt: '取消付款',
        callback: (res) => {
          if (res !== 'confirm') return;
          // 点击完成付款, 生成订单信息
          this.payOrder(item, index);
        },
      });
    },
    async payOrder(item, index) {
      if (this.loading) return;
      this.loading = true;
      Utils.showLoading();
      const result = await service.changeOrderType({ userid: Utils.getUserId(this), orderId: item.billNo, type: 1 });
      this.loading = false;
      if (!result) return;
      Utils.hideLoading();
      this.$refs.resultModal.show({
        showBtns: true,
        confirmTxt: '查看订单',
        cancleTxt: '继续操作',
        callback: (res) => {
          if (this.tabValue === -1) {
            // 全部
            item.billType = 1;
            return;
          }

          // 待收货状态
          this.dataList.splice(index, 1);

          if (res === 'confirm') {
            // 查看订单详情
            this.$router.push(`${this.currentPath || this.routePath}/orderDetail?id=${item.billNo}`);
          }
        },
      });
    },
    // 确认收货
    async onConfirmReceive(item, index) {
      if (this.loading) return;
      this.loading = true;
      Utils.showLoading();
      const result = await service.changeOrderType({ userid: Utils.getUserId(this), orderId: item.billNo, type: 3 });
      this.loading = false;
      if (!result) return;
      Utils.hideLoading();
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
    onCloseOrder(item, index) {
      Utils.showConfirm({
        title: '提醒',
        content: '确定关闭此订单?',
        confirmBtn: '确定',
        cancelBtn: '取消',
        maskClosable: true,
        onConfirm: async() => {
          if (this.loading) return;
          this.loading = true;
          Utils.showLoading();
          const result = await service.changeOrderType({ userid: Utils.getUserId(this), orderId: item.billNo, type: 5 });
          this.loading = false;
          if (!result) return;
          Utils.hideLoading();
          Utils.showToast('关闭订单成功');
          if (this.tabValue === -1) {
            // 全部
            item.billType = 5;
            return;
          }

          // 对应状态
          this.dataList.splice(index, 1);
        },
      });
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
@import '~@/styles/components/order-modal.scss';
.price {
  font-size: 16px;
  color: $color-red;
  @include text-ellipsis;

  .grey {
    font-size: 10px;
    color: $color-grey;
    margin-left: .05rem;
  }

  .line-through {
    text-decoration: line-through;
  }
}

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
    padding: 0 .12rem;
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
          font-size: 18px;
        }

        .icon-arrow-right {
          font-size: 10px;
          font-weight: 700;
          margin-left: .03rem;
        }
      }

      .status {
        font-size: 14px;
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
      padding-top: .06rem;

      .img {
        width: .3rem;
        height: .3rem;
        flex-shrink: 0;
        margin-right: .05rem;
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
        padding-top: .05rem;
        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          @include text-ellipsis;
          margin-bottom: .05rem;

          &:last-child {
            margin-bottom: 0;
          }
          .price {
            max-width: 40%;
          }

          .desc {
            color: $color-grey;
            font-size: 14px;
          }

          .desc.price {
            color: $color-black;
          }
        } // end row
      }
    } // end product-item

    .product-list {
      position: relative;

      .code-img {
        position: absolute;
        top: 50%;
        right: 20%;
        width: .45rem;
        height: .45rem;
        margin-top: -.22rem;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .order-total {
      text-align: right;
      @include text-ellipsis;
      padding-right: .15rem;
      font-size: 14px;
      margin-top: .1rem;

      .price {
        color: $color-red;
        font-size: 18px;
      }
    } // end order-total

    .order-bottom {
      display: flex;
      justify-content: flex-end;
      padding-right: .05rem;

      button {
        display: block;
        padding: .1rem .1rem ;
        color: $color-blue;
        border: 0;

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
<style lang="scss">
@import '~@/styles/components/order-modal.scss';
</style>
