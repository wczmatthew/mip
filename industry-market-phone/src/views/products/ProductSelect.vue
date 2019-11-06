<!-- 产品详情 -->
<template lang='html'>
  <w-container show-back show-header show-footer class="product-detail">
    <!-- 顶部栏 -->
    <template #header-mid>
      产品选型
    </template>
    <template #header-right>
      <div class="header-right">
        <w-cart-icon :current-path="routePath"></w-cart-icon>
      </div>
    </template>
    <!-- 顶部栏 end -->

    <template #header-other>
      <div class="product-top">
        <div class="img">
          <w-img :src="product.imgPath" v-if="product.imgPath"></w-img>
        </div>
        <div class="detail">
          <div class="product-title">
            {{product.XHGG || '暂无'}}
          </div>
          <div class="grid-cell">
            <div class="item">
              <div>
                价格
                <span class="price" style="padding: 0;">
                  <small>￥</small>{{product.DJJ || 0}}
                </span>
              </div>
              <div>
                库存数量
                <span class="red">
                  {{product.store || 0}}
                </span>
              </div>
            </div>
            <div class="item">
              <div class="nums">
                <i class="iconfont icon-circle-reduce2" @click.stop="onReduce()"></i>
                <w-input type="number" v-model="number"/>
                <i class="iconfont icon-circle-add2" @click.stop="onAdd()"></i>
              </div>
            </div>
          </div>
        </div>

      </div>
    </template>

    <!-- 正文内容 -->

    <div class="product-container">
      <!-- 产品图片 -->
      <!-- <div class="product-left">
        <div class="banner-img">
          <w-img :src="product.imgPath" v-if="!firstLoading"></w-img>
        </div>
      </div> -->
      <!-- 产品图片 end -->

      <div class="product-content">
        <!-- 产品参数 -->
        <div class="w-tableview">
          <div class="list-cell" v-for="(item, index) in optionList" :key="index">
            <div class="title">
              <i class="iconfont icon-sort-triangle-up"></i> {{item.name}}
            </div>
            <div class="list">
              <span class="item"  v-for="(option, subIndex) in item.list"
              :key="'options'+subIndex"
              @click.stop="onSelectTag(item, index, subIndex)"
              :class="{'actived': option.isSelected, 'disabled': option.disabled}">
                {{option.name}}
              </span>
            </div>
          </div>
        </div>
        <!-- 产品参数 -->
      </div>

    </div>

    <!-- 正文内容 end -->

    <!-- 底部栏 -->
    <template #w-footer>
      <footer class="footer">
        <div class="left">
          <div class="icon" @click="toIndex()">
            <i class="iconfont icon-home"></i>
            <p>首页</p>
          </div>
          <!-- <div class="icon" @click="onToggleCollect()">
            <i class="iconfont" :class="[product.isCollect ? 'icon-collect' :
            'icon-notcollect']"></i>
            <p>
              {{product.isCollect ? '取消收藏' : '收藏'}}
            </p>
          </div> -->
        </div>

        <!-- <div class="mid">
          数量: <input type="number" v-model="number">
        </div> -->

        <div class="detail">
          <p class="red bold">
            <span>实付: </span>{{(totalPrice).toFixed(2)}}
          </p>
        </div>

        <div class="btns">
          <button @click="onAddCart()" :class="[product.store > 0 ? 'red-btn' : 'grey-btn']">
            {{ product.store > 0 ? '加入购物单' : '无库存' }}
          </button>
          <!-- <button class="blue-btn">
            立即购买
          </button> -->
        </div>
      </footer>
    </template>
    <!-- 底部栏 end -->

  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import service from '@/services/product.service';
import orderService from '@/services/order.service';

export default {
  data() {
    return {
      product: {},
      number: 1, // 产品数量
      loading: false,
      firstLoading: true,
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'productSelect' }), // 获取当前路由
      sessionId: '',
      optionList: [],
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  watch: {
    '$route'(to) {
      if (to.path === this.routePath) {
        // 重新进入页面
        this.$store.dispatch('user/getCartNum');
      }
    },
  },
  computed: {
    ...mapGetters('user', {
      userId: 'userId',
      customerId: 'customerId',
      isBind: 'isBind',
    }),
    totalPrice() {
      const price = this.product.DJJ || 0;
      return this.number * price || 0;
    },
  },
  components: {
  },
  methods: {
    onReduce() {
      if (this.number <= 1) return;
      this.number -= 1;
    },
    onAdd() {
      this.number += 1;
    },
    toIndex() {
      this.$router.push('/market/home');
    },
    // 获取初始数据
    async getData() {
      if (!this.$route.query.seriesId) {
        Utils.showToast('无法获取数据, 请重试');
        this.$router.back();
        return;
      }

      this.firstLoading = true;
      Utils.showLoading();
      const result = await service.productSelectInfo({ seriesId: this.$route.query.seriesId, userid: Utils.getUserId(this) });
      if (!result) {
        this.firstLoading = false;
        return;
      }
      Utils.hideLoading();
      // this.product.isCollect = !!this.product.isCollect;
      this.firstLoading = false;

      this.sessionId = result.sessionId || '';

      this.product = { ...result.product };

      // 数据处理
      const optionSelectList = [...result.light];
      this.optionList = [];
      result.propertyList.forEach((item, index) => {
        const list = [];
        item.propertyValueList.forEach((property, subIndex) => {
          let isSelected = false;
          let disabled = false;
          if (index < optionSelectList.length && subIndex < optionSelectList[index].length) {
            if (Number(optionSelectList[index][subIndex]) === 2) {
              // 选中状态
              isSelected = true;
            } else if (Number(optionSelectList[index][subIndex]) === 0) {
              // 不可选
              disabled = true;
            }
          }
          list.push({
            name: property.show_name,
            value: property.property_name,
            isSelected,
            disabled,
            x: index,
            y: subIndex,
          });
        });

        this.optionList.push({
          name: item.name,
          list,
        });
      });
    },
    // 加入购物单
    onAddCart() {
      if (!this.product.store) return;

      this.number = parseInt(this.number, 10);
      if (!this.number) {
        Utils.showToast('请先输入数量');
        return;
      }

      if (this.number > this.product.store) {
        Utils.showToast('超过库存数量, 请重新输入');
        return;
      }

      // 判断是否选择了型号之类数据
      let isAllSelect = true;
      for (let i = 0; i < this.optionList.length; i++) {
        const item = this.optionList[i];
        const selectList = item.list.filter(option => option.isSelected);
        if (!selectList || !selectList.length) {
          Utils.showToast(`请先选择${item.title}`);
          isAllSelect = false;
          break;
        }
      }

      if (!isAllSelect) return;

      // TODO: 判断是否绑定经销商
      Utils.hideLoading();
      if (!this.customerId) {
        Utils.showAlert({
          title: '提醒',
          content: '您还未绑定经销商, 不能进行下单操作?',
          maskClosable: true,
        });
        return;
      }

      if (!this.isBind) {
        Utils.showAlert({
          title: '提醒',
          content: '请先绑定手机号码?',
          maskClosable: false,
          onConfirm: () => {
            this.$store.commit('user/toggleRegisterModal', true);
          },
        });
        return;
      }

      this.addProductToCart();
    },
    // 将产品加入到购物单中
    async addProductToCart() {
      if (this.product.store <= 0) return;
      if (this.loading) {
        Utils.showToast('正在加入购物单, 请勿频繁操作');
        return;
      }
      if (this.number > this.product.store) {
        Utils.showToast('超过库存数量, 请重新输入');
        return;
      }
      this.loading = true;
      const result = await orderService.addToShopCarWithClient({ userid: this.userId, bm: this.product.BM, qty: this.number || 1, clientId: this.customerId });
      this.loading = false;
      if (!result) return;
      Utils.showToast('加入购物单成功');
      this.$store.dispatch('user/getCartNum');
    },
    // 添加收藏或者取消收藏
    onToggleCollect() {
      if (!this.product.isCollect) {
        this.addCollect();
        return;
      }

      this.deleteCollect();
    },
    // 添加收藏
    async addCollect() {
      if (this.loading) {
        Utils.showToast('正在添加到收藏夹, 请勿频繁操作');
        return;
      }
      this.loading = true;
      const result = await orderService.addCollect({ userid: this.userId, bm: this.$route.query.bm });
      this.loading = false;
      if (!result) return;
      this.product.isCollect = true;
      Utils.showToast('添加收藏成功');
    },
    // 取消收藏
    async deleteCollect() {
      if (this.loading) {
        Utils.showToast('正在取消收藏, 请勿频繁操作');
        return;
      }
      this.loading = true;
      const result = await orderService.deleteCollect({ userid: this.userId, bm: this.$route.query.bm });
      this.loading = false;
      if (!result) return;
      this.product.isCollect = false;
      Utils.showToast('取消收藏成功');
    },
    // 选项更换
    async onSelectTag(item, index, subIndex) {
      // 判断是否可以选择
      if (item.list[subIndex].isSelected) return;
      // if (item.list[subIndex].disabled) {
      //   Utils.showConfirm({
      //     title: '提醒',
      //     content: '该操作会更换产品型号, 确认更换?',
      //     maskClosable: true,
      //     onConfirm: () => {
      //       this.startChangePorperty(item, index, subIndex);
      //     },
      //   });
      //   return;
      // }

      this.startChangePorperty(item, index, subIndex);
    },
    async startChangePorperty(item, index, subIndex) {
      const option = item.list[subIndex];
      if (item.loading) return;
      item.loading = true;

      // 获取上一个选中选项
      const selectList = this.optionList[index].list.filter(option => option.isSelected);
      let prevSelectItem = {};
      if (selectList && selectList.length) {
        prevSelectItem = selectList[0];
      }

      Utils.showLoading();
      const result = await service.propertyChange({ x: option.x, y: option.y, sbX: prevSelectItem.x || 0, sbY: prevSelectItem.y || 0, action: 'add', sessionId: this.sessionId });
      item.loading = false;
      if (!result) return;

      // 数据处理
      const optionSelectList = [...result.light];
      this.optionList.forEach((item, index) => {
        item.list.forEach((property, subIndex) => {
          let isSelected = false;
          let disabled = false;
          if (index < optionSelectList.length && subIndex < optionSelectList[index].length) {
            if (Number(optionSelectList[index][subIndex]) === 2) {
              // 选中状态
              isSelected = true;
            } else if (Number(optionSelectList[index][subIndex]) === 0) {
              // 不可选
              disabled = true;
            }
          }

          property.isSelected = isSelected;
          property.disabled = disabled;
        });
      });

      this.getProductData(item);
    },
    // 获取产品信息
    async getProductData(item) {
      const sku = [];
      this.optionList.forEach((item) => {
        item.list.forEach((option) => {
          if (option.isSelected) {
            sku.push(option.value === '无' ? '' : option.value);
          }
        });
      });

      const result = await service.getSelectProductDetail({ sku: sku.toString(), seriesId: this.$route.query.seriesId, userid: Utils.getUserId(this) });
      item.loading = false;
      if (!result) return;
      Utils.hideLoading();

      this.product = { ...result };
    },
  },
};
</script>
<style lang="scss" scoped>

@import '~@/styles/components/button.scss';

.product-detail {

  .product-container {
    display: flex;
    min-height: 100%;
    background: #fff;
  }

  .product-top {
    display: flex;
    align-items: center;
    background: #fff;

    .img {
      width: .8rem;
      height: .8rem;
      flex-shrink: 0;
      text-align: center;
      padding: .05rem;

      img {
        height: 100%;
      }
    }

    .detail {
      flex: 1;
      overflow: hidden;
    }

    .grid-cell {
      display: flex;
      justify-content: space-between;
      padding: 0 .12rem;
      font-size: 14px;
      color: $color-grey;

      .item {
        max-width: 50%;
        min-height: .2rem;
        line-height: .18rem;
        padding: .1rem 0;
        font-size: 12px;

        .red {
          color: $color-red;
        }

        .nums {
          width: 100%;
          margin-left: 0;
        }
      }
    }
  }

  .product-left {
    width: 50%;
    border-right: 1px solid $color-line;
    padding-top: .2rem;
    .banner-img {
      width: 90%;
      height: 65vh;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      overflow: hidden;

      img {
        max-width: 100%;
        height: 100%;
      }
    }
  }

  .product-content {
    width: 100%;
    overflow: auto;
    padding: .1rem 0;
  }

  .price {
    color: $color-red;
    font-size: 18px;
    @include text-ellipsis;
    padding: .05rem .12rem;
    background: #fff;
  }

  .product-title {
    // font-weight: 700;
    @include break-word;
    padding: .1rem $spacing-lr;
    background: #fff;
    font-size: 18px;
  }

  .w-tableview {
    margin-bottom: .1rem;
  }


  .w-tableview .cell .desc.price,
  .w-tableview .cell .desc.red {
    color: $color-red;
  }

  .list-cell {
    margin-bottom: .1rem;
    .title {
      font-size: 14px;
      height: .25rem;
      padding-left: .05rem;
      position: relative;
      // font-weight: 700;
      display: flex;
      align-items: center;

      .icon-sort-triangle-up {
        display: block;
        transform: rotate(90deg);
        margin-right: .08rem;
        color: $color-default;
      }
    }

    .list {
      display: flex;
      align-items: center;
      margin-top: .05rem;
      flex-wrap: wrap;
      padding-left: .1rem;

      .item {
        margin-bottom: .05rem;
        margin-left: .08rem;
        // border: 1px solid $color-black;
        border-radius: .03rem;
        padding: .06rem .08rem;
        font-size: 12px;
        line-height: 16px;
        background: $color-line;

        &.actived {
          border-color: $color-default;
          color: #fff;
          background: $color-default;
        }

        &.disabled {
          border-color: $color-line;
          color: $color-grey;
          background:  $color-line;
        }
      }
    } // end list
  } // end list-cell

  .footer {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-top: 1px solid $color-line;

    .left {
      display: flex;
      height: 100%;
      .icon {
        display: block;
        height: 100%;
        text-align: center;
        color: $color-grey;
        padding: 0 .1rem;
        padding-top: .06rem;

        .iconfont {
          display: block;
          margin-bottom: .02rem;
          font-size:  20px;
        }

        .icon-collect {
          color: $color-yellow;
        }

        p {
          font-size: 10px;
          text-align: center;
        }
      }
    }

    .detail {
      flex: 1;
      text-align: right;
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding-right: .1rem;
      font-size: 16px;

      p {
        @include text-ellipsis;

        span {
          color: $color-black;
          font-size: 14px;
        }
      }

      .grey {
        color: $color-grey-6;
      }

      .bold {
        font-weight: 700;
      }

      // .small {
      //   font-size: 12px;
      // }

      .red {
        color: $color-red;
      }
    }

    .btns {
      width: 1rem;
      height: .3rem;
      border-radius: .3rem;
      margin-right: .05rem;
      display: flex;
      overflow: hidden;
      button {
        flex: 1;
        border-radius: 0;
        height: 100%;
        font-size: 16px;
      }
    }
  } // end footer
}

.nums {
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-left: 40%;

  .iconfont {
    color: $color-grey-6;
    flex-shrink: 0;
    width: .2rem;
    font-size:  20px;
    line-height: 1;
  }

  input {
    flex: 1;
    display: block;
    overflow: hidden;
    text-align: center;
    font-size:  16px;
  }
}
</style>