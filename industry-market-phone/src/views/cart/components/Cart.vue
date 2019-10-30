<!--  -->
<template lang='html'>
  <!-- 正文内容 -->
  <div class="cart-container">
    <!-- 购物单信息 -->
    <div class="product-list">
      <w-scroll
        ref="scroll"
        class="scroll-view"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">

        <no-data v-if="noData"></no-data>
        <w-loading-row v-if="isFirstLoading"></w-loading-row>
        <div style="width: 100%; height: .1rem;"></div>
        <div v-for="(item, index) in productList" :key="index" class="item">
          <div class="disabled-bg" v-if="item.store <= 0"></div>
          <div class="radio" @click.stop="onToggleChecked(item)">
            <i class="iconfont" :class="[allChecked || selectProducts[item.id] ? 'icon-radio-checked': 'icon-radio']"></i>
          </div>
          <div class="img" v-if="item.imgPath !== undefined">
            <w-img :src="item.imgPath"></w-img>
          </div>
          <div class="detail">
            <p class="product-title">
              {{item.spec}}
            </p>
            <p class="desc" v-if="item.store !== undefined">
              (库存: {{item.store || 0}})
            </p>
            <div class="bottom">
              <div class="price">
                <div>
                  <small>￥</small>{{item.discountPrice || '0'}}
                </div>
                <div class="grey">
                  <small>￥</small>{{item.price || '0'}}
                </div>
              </div>
              <div class="num" @click.stop="stopProp()">
                <i class="iconfont icon-jian" :class="{'disabled': item.qty == 1}" @click.stop="onReduce(item)"></i>
                <w-input type="number" v-model="item.qty" @keyup="onChangeNum(item)"/>
                <i class="iconfont icon-jia" :class="{'disabled': item.qty >= item.store}" @click.stop="onAdd(item)"></i>
              </div>
            </div>
          </div>
        </div>
      </w-scroll>
    </div>
    <!-- 购物单信息 end -->

    <!-- 底部价格 -->
    <div class="cart-bottom">
      <div class="radio" @click="onToggleAllChecked()">
        <i class="iconfont" :class="[allChecked ? 'icon-radio-checked': 'icon-radio']"></i>全选
      </div>

      <div class="detail" v-show="!hideBottomPrice">
        <p class="red bold">
          <span>合计: </span>{{(totalPrice).toFixed(2)}}
        </p>
        <div class="msg">
          <!-- <p class="bold grey">合计: {{totalPrice.toFixed(2)}}</p> -->
          <p class="red small">
            优惠: {{discountPrice.toFixed(2)}}
          </p>
        </div>
      </div>
      <button type="button" class="orange-btn" v-show="!isEdit" @click="onPay()">
        {{ confirmBtnTxt }}({{selectNum}})
      </button>
      <button type="button" class="red-btn" v-show="isEdit" @click="onDelete()">
        删除
      </button>
    </div>
    <!-- 底部价格 end-->
  </div>
  <!-- 正文内容 end -->
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import service from '@/services/order.service';
import { USER_ROLE } from '@/common/Constants';

export default {
  data() {
    return {
      isFirstLoading: true,
      pageNum: 1,
      pageSize: 15,
      productList: [],
      selectProducts: {}, // 选择的产品
      noData: true,
      hasNext: true,
      allChecked: false,
      isEdit: false,
      selectNum: 0,
      totalPrice: 0,
      discountPrice: 0,
      tips: '',
      payWay: -1, // 支付方式
      sendType: -1, // 配送方式
      fileMsg: -1, // 相关文件
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'cart' }),
      orderDetail: {},
      reducePrice: 0, // 抹零价格
      isChangeNum: false, // 编辑价格的产品, 用来判断价格修改是否已经执行
    };
  },
  created() {},
  mounted() {
    // 清空选中的客户信息
    this.$store.commit('customer/resetSelectCustomer');
    if (this.isReceive) return;
    this.onPullingDown();
  },
  watch: {
    '$route'(to) {
      if (to.path === this.currentPath) {
        // 重新进入购物单页面
        this.hasNext = true;
      }
    },
  },
  computed: {
    ...mapGetters('user', {
      customerId: 'customerId',
      isBind: 'isBind',
      cartNum: 'cartNum',
      role: 'role',
    }),
  },
  components: {},
  methods: {
    // 更新数据
    updateData(list) {
      this.productList = list || [];
      this.noData = !this.productList.length;
      this.isFirstLoading = false;
    },
    scrollTop() {
      this.$refs.scroll.scrollTop();
    },
    stopProp() {}, // 阻止事件冒泡
    onEdit(isEdit) {
      this.isEdit = isEdit;
      if (!this.isEdit) {
        // 非编辑状态, 将库存小于等于0的选中产品去除
        this.selectNum = 0;
        this.productList.forEach((item) => {
          if (Number(item.store || 0) <= 0) {
            this.selectProducts[item.id] = false;
          }

          if (Number(item.store || 0) > 0 && this.selectProducts[item.id]) {
            this.selectNum += 1;
          }
        });

        this.calcPrice();
        this.allChecked = this.selectNum === this.cartNum;
      } else if (this.allChecked) {
        // 编辑状态下, 如果是全选就将全部商品选中
        this.productList.forEach((item) => {
          this.selectProducts[item.id] = true;
        });
        this.selectNum = this.productList.length;
        this.calcPrice();
      }
    },
    // 全选或者取消全选
    onToggleAllChecked() {
      if (!this.productList.length) return;
      this.allChecked = !this.allChecked;

      this.selectNum = 0;
      this.productList.forEach((item) => {
        if (this.isReceive) {
          this.selectProducts[item.id] = this.allChecked;
          this.selectNum += 1;
        } else if (this.isEdit || Number(item.store || 0) > 0) {
          this.selectProducts[item.id] = this.allChecked;
          this.selectNum += 1;
        }
      });

      if (!this.selectNum) {
        this.allChecked = false;
      }

      if (!this.allChecked) {
        this.totalPrice = 0;
        this.selectNum = 0;
        return;
      }
      // 计算选择产品的金额
      this.calcPrice();
    },
    // 选择或者取消选择产品
    onToggleChecked(item) {
      // 没有库存不可选中结算
      if (!this.isReceive && !this.isEdit && Number(item.store || 0) <= 0) return;

      this.selectProducts[item.id] = !this.selectProducts[item.id];

      // 计算总价格
      this.calcPrice();

      if (!this.selectProducts[item.id] && this.allChecked) {
        this.allChecked = false;
      }

      if (this.isReceive) {
        // 入库单的相关操作
        const list = this.productList.filter(product => !this.selectProducts[product.id]);
        this.allChecked = !!(!list || !list.length);
      } else if (this.cartNum === this.productList.length) {
        const list = this.productList.filter(product => !this.selectProducts[product.id]);
        if (this.selectProducts[item.id]) {
          // 最后一页, 判断是否已经全部选择
          this.allChecked = !!(!list || !list.length);
        }
      }

      // 判断选择的数量
      const list = this.productList.filter(product => this.selectProducts[product.id]);
      this.selectNum = list && list.length ? list.length : 0;
    },
    // 计算总金额
    calcPrice() {
      let total = 0;
      let totalDiscountPrice = 0;
      this.productList.forEach((item) => {
        if (this.selectProducts[item.id]) {
          total += parseFloat(item.price || 0) * parseInt(item.qty || 1, 10);
          const discountPrice = item.discountPrice || item.price || 0;
          totalDiscountPrice += parseFloat(discountPrice || 0) * parseInt(item.qty || 1, 10);
        }
      });
      this.totalPrice = totalDiscountPrice;
      this.discountPrice = total - totalDiscountPrice;
    },
    // 下拉刷新
    onPullingDown() {
      if (this.isReceive) {
        this.$emit('getData', { pageNum: 1 });
        return;
      }
      this.pageNum = 1;
      this.getData();
    },
    // 上拉加载
    onPullingUp() {
      if (this.isReceive) {
        this.$emit('getData');
        return;
      }
      if (!this.hasNext) {
        // 没有数据
        this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
        return;
      }
      this.getData();
    },
    // 获取购物单数据
    async getData() {
      const result = await service.getShopCarListByClient({ userid: Utils.getUserId(this), pageNum: this.pageNum, pageSize: this.pageSize, clientId: this.customerId });
      this.isFirstLoading = false;
      if (!result) return;

      // if (this.pageNum === 1 && this.beforeCustomerId !== this.customerId) {
      //   // 第一个页, 并且切换了一个客户, 需要重新更新选择数据
      //   for (const key in this.selectProducts) {
      //     this.selectProducts[key] = false;
      //   }
      // }

      // 判断是否选中
      if (this.allChecked) {
        result.rows = result.rows.map((item) => {
          if (Number(item.store || 0) > 0) {
            this.selectProducts[item.id] = true;
          }
          return item;
        });
      }
      if (this.pageNum === 1) {
        this.$refs.productList && this.$refs.productList.updateList([]);
        this.productList = result.rows;
      } else {
        this.productList = this.productList.concat([...result.rows]);
      }

      // 设置选中数量
      if (this.allChecked) {
        this.selectNum = this.productList.length;
        this.calcPrice();
      }

      this.$refs.productList && this.$refs.productList.updateList(this.productList);
      this.noData = !this.productList.length;
      this.hasNext = this.productList.length < result.total;
      if (this.hasNext) {
        this.pageNum += 1;
      }
      this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
    },
    // 数量减少1
    async onReduce(item) {
      if (parseInt(item.qty, 10) === 1) return;
      if (this.isReceive) {
        // 入库单直接操作
        item.qty -= 1;
        return;
      }

      if (item.loading) {
        Utils.showToast('正在调整数量, 请不要重复操作');
        return;
      }
      item.loading = true;
      const num = item.qty;
      const result = await service.editCartNum({ userid: Utils.getUserId(this), bm: item.prodId, qty: num - 1, clientId: this.customerId });
      item.loading = false;
      if (!result) return;
      item.qty = num - 1;

      // 计算总价格
      this.calcPrice();
    },
    // 数量增加1
    async onAdd(item) {
      if (this.isReceive) {
        // 入库单直接操作
        item.qty += 1;
        return;
      }
      if (item.qty >= item.store) return;

      if (item.loading) {
        Utils.showToast('正在调整数量, 请不要重复操作');
        return;
      }
      item.loading = true;
      const num = item.qty;
      const result = await service.editCartNum({ userid: Utils.getUserId(this), bm: item.prodId, qty: num + 1, clientId: this.customerId });
      item.loading = false;
      if (!result) return;
      item.qty = num + 1;

      // 计算总价格
      this.calcPrice();
    },
    onChangeNum(item) {
      if (this.isReceive) return;
      Utils.throttle(() => {
        if (this.isChangeNum) return;
        if (item.qty > item.store) {
          item.qty = item.store;
        }
        this.startChangeNum(item);
        this.isChangeNum = true;
      }, 500, { leading: false })();
    },
    // 直接调整价格
    async startChangeNum(item) {
      const num = item.qty;
      const result = await service.editCartNum({ userid: Utils.getUserId(this), bm: item.prodId, qty: num, clientId: this.customerId });
      setTimeout(() => {
        this.isChangeNum = false;
      }, 500);
      if (!result) {
        return;
      }
      // 计算总价格
      this.calcPrice();
    },
    // 从购物单中删除
    async onDelete() {
      const delList = this.productList.filter(item => this.selectProducts[item.id]);
      if (!delList || !delList.length) {
        Utils.showToast('请先选择需要删除的产品');
        return;
      }

      if (this.isReceive) {
        // 入库单直接操作
        this.productList = this.productList.filter(item => !this.selectProducts[item.id]);
        this.noData = !this.productList.length;
        return;
      }
      if (this.loading) return;
      this.loading = true;
      // 获取需要删除的产品id
      const bm = [];
      delList.forEach((item) => {
        bm.push(item.prodId);
      });
      Utils.showLoading();
      const result = await service.deleteShopCarWithClient({ userid: Utils.getUserId(this), bm: bm.toString(), clientId: this.customerId });
      this.loading = false;
      if (!result) return;
      Utils.hideLoading();

      // 重置全选和选中数量
      this.allChecked = false;
      this.selectNum = 0;

      this.productList = this.productList.filter(item => !this.selectProducts[item.id]);
      this.noData = !this.productList.length;

      // this.productList.splice(index, 1);
      Utils.showToast('删除成功');
      // 计算选择产品的金额
      this.calcPrice();

      this.$store.dispatch('user/getCartNum');
    },
    // 付款
    onPay() {
      const list = this.productList.filter(item => this.selectProducts[item.id]);
      if (!list || !list.length) {
        Utils.showToast('请先选择产品');
        return;
      }

      if (this.isReceive) {
        // 入库单直接操作
        this.$emit('confirm', list);
        return;
      }

      // 判断是否绑定经销商
      if (!this.customerId) {
        Utils.showAlert({
          title: '提醒',
          content: '您还未绑定经销商, 不能进行下单操作',
          maskClosable: true,
        });
        return;
      }

      if (!this.isBind) {
        Utils.showAlert({
          title: '提醒',
          content: '请先绑定手机号码',
          maskClosable: false,
          onConfirm: () => {
            this.$store.commit('user/toggleRegisterModal', true);
          },
        });
        return;
      }

      this.$store.commit('order/updateSelectProducts', list);

      if (this.role === USER_ROLE.seller || this.role === USER_ROLE.viewer) {
        // 开单员/数据查看员
        this.$router.push(`${this.currentPath || this.routePath}/confirmSaleOrder`);
        return;
      }

      this.$router.push(`${this.currentPath || this.routePath}/confirmOrder`);
    },
    toDetail(item) {
      if (this.isReceive) {
        // 入库单
        return;
      }
      this.$router.push(`${this.currentPath}/productDetail?bm=${item.bm}`);
    },
  },
  props: {
    currentPath: { // 当前路由, 作为组件时需要传
      type: String,
      default: '',
    },
    hideBottomPrice: { // 底部价格是否显示
      type: Boolean,
      default: false,
    },
    isReceive: { // true: 是入库单
      type: Boolean,
      default: false,
    },
    confirmBtnTxt: {
      type: String,
      default: '结算',
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/cart.scss';
</style>