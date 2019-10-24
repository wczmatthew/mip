<!-- 入库单 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      入库单({{totalNum}})
    </template>
    <template #header-right>
      <div class="header-right" :class="{'color-active': isEdit }" @click="onEdit()">
        {{ isEdit ? '完成' : '管理' }}
      </div>
    </template>
    <!-- 顶部栏 end -->

    <div class="w-tableview" slot="header-other">
      <div class="cell">
        <span class="title">入库单来源: {{vendorName || ''}}</span>
      </div>
    </div>
    <!-- 正文内容 -->
    <cart :current-path="routePath" ref="cart" hide-bottom-price @getData="getData" is-receive confirmBtnTxt="提交" @confirm="onConfirm"></cart>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import Cart from '../cart/components/Cart.vue';
import service from '@/services/order.service';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'cart' }),
      isEdit: false,
      totalNum: 0,
      vendorName: '',
      orderId: '',
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  watch: {
    '$route'(to) {
      if (to.path === this.routePath && this.$refs.cart) {
        // 重新进入页面
        this.$refs.cart.$data.isFirstLoading = true;
        this.$refs.cart.onPullingDown();
      }
    },
  },
  computed: {
  },
  components: {
    Cart,
  },
  methods: {
    updateSelectNum(num) {
      this.selectNum = num;
    },
    getTotalNum(totalNum) {
      this.totalNum = totalNum;
    },
    onEdit() {
      this.isEdit = !this.isEdit;
      this.$refs.cart && this.$refs.cart.onEdit(this.isEdit);
    },
    onPay() {
      this.$refs.cart && this.$refs.cart.onPay();
    },
    onDelete() {
      this.$refs.cart && this.$refs.cart.onDelete();
    },
    async getData() {
      Utils.showLoading();
      const params = {
        url: Utils.getLocalStorageItem('receiveUrl'),
      };
      const result = await service.getReceiveOrderItemList(params);
      if (!result) {
        this.$refs.cart && this.$refs.cart.updateData([]);
        return;
      }
      Utils.removeLocalStorageItem('receiveUrl');
      Utils.hideLoading();
      // 供应商名称
      this.vendorName = result.vendorName || '';
      this.orderId = result.orderId || '';

      this.$refs.cart && this.$refs.cart.updateData(result.itemList);
      this.$refs.cart && this.$refs.cart.onToggleAllChecked();
      this.totalNum = result.itemList && result.itemList.length ? result.itemList.length : 0;
    },
    // 确认入库
    async onConfirm(list) {
      const itemList = [];
      list.forEach((item) => {
        itemList.push({
          prodId: item.bm,
          qty: item.qty,
          discountPrice: item.discountPrice || '',
          price: item.price || '',
          spec: item.spec || '',
        });
      });
      const params = {
        itemList: JSON.stringify(itemList),
        orderId: this.orderId,
        userid: Utils.getUserId(this),
      };
      console.log(params);
      Utils.showLoading();
      const result = await service.inStore(params);
      if (!result) return;
      Utils.showToast('入库成功');
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.header-right {
  font-size:  13px;
  color: $color-grey;
}

.color-active {
  color: $color-default;
}

.cart-bottom .bottom-btn {
  width: 100%;
  margin: 0;
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
  border-radius: 0;
  height: .44rem;
  font-size: 15px;
}


.w-tableview .cell {
  min-height: .4rem;
  height: auto;
  padding-top: .05rem;
  padding-bottom: .05rem;
}

.w-tableview .cell .title {
  max-width: 100%;
}
</style>