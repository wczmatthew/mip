<!-- 收藏夹 -->
<template lang='html'>
  <w-container show-header show-back class="collect-container">
    <!-- 顶部栏 -->
    <template #header-mid>
      收藏夹
    </template>
    <template #header-right>
      <div class="header-right" @click="onToggleEdit()" :class="{'color-red': isEdit}">
        {{isEdit ? '删除' : '编辑'}}
      </div>
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <w-scroll
      ref="scroll"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">

      <!-- 商品列表 -->
      <no-data v-if="noData"></no-data>
      <product-list ref="productList" route-path="collections" v-else @add-cart="addCart" @select-change="onSelectChange"></product-list>
      <!-- 商品列表 end -->

    </w-scroll>

    <!-- 数量弹窗 -->
    <w-num-modal ref="numModal"></w-num-modal>
    <!-- 数量弹窗 end -->
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import WNumModal from '@/components/WNumModal.vue';
import service from '@/services/order.service';
import Utils from '@/common/Utils';
import ProductList from '@/views/products/components/ProductList.vue';

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      isFirstLoading: false,
      hasNext: true,
      productList: [],
      noData: false,
      isEdit: false,
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'collections' }), // 获取当前路由
      selectProductList: [],
    };
  },
  created() {},
  mounted() {
    this.onPullingDown();
  },
  components: {
    WNumModal,
    ProductList,
  },
  computed: {
    ...mapGetters('user', {
      customerId: 'customerId',
    }),
  },
  methods: {
    onToggleEdit() {
      if (this.isEdit && this.selectProductList.length) {
        // 删除状态下, 有删除的产品, 进行删除操作
        Utils.showConfirm({
          title: '提醒',
          content: '确定取消收藏选中产品?',
          maskClosable: true,
          onConfirm: () => {
            // 进行取消收藏操作
            this.cancleCollect();
          },
        });
        return;
      }
      this.isEdit = !this.isEdit;
      this.$refs.productList && this.$refs.productList.changeEditType(this.isEdit);
    },
    onSelectChange(list) {
      this.selectProductList = list;
    },
    addCart(item) {
      this.$refs.numModal.show({
        callback: async (type, num) => {
          if (type !== 'confirm') return;
          // 已经选择了客户, 直接将产品加入购物单
          this.$refs.productList && this.$refs.productList.addCart(item, num);
        },
      });
    },
    // 取消收藏
    async cancleCollect() {
      const bm = [];
      this.selectProductList.forEach((item) => {
        bm.push(item.prodId);
      });
      Utils.showLoading();
      const result = await service.deleteCollectWithClient({ userid: Utils.getUserId(this), bm: bm.toString(), clientId: this.customerId });
      if (!result) return;
      Utils.showToast('取消收藏成功');
      // 移除取消收藏的产品
      this.productList = this.productList.filter(item => !bm.includes(item.prodId));
      this.$refs.productList && this.$refs.productList.updateList(this.productList);

      // 取消收藏成功, 重置为编辑状态
      this.isEdit = !this.isEdit;
      this.$refs.productList && this.$refs.productList.changeEditType(this.isEdit);
    },
    // 下拉刷新
    onPullingDown() {
      this.pageNum = 1;
      this.isFirstLoading = true;
      this.$refs.scroll && this.$refs.scroll.scrollTop();
      this.getData();
    },
    // 上拉加载
    onPullingUp() {
      if (!this.hasNext) {
        // 没有数据
        this.$refs.scroll.forceUpdate(true);
        return;
      }
      this.getData();
    },
    async getData() {
      // Utils.showLoading();
      const params = { pageNum: this.pageNum, pageSize: this.pageSize, userid: Utils.getUserId(this), clientId: this.customerId };
      const result = await service.getCollectListByClient(params);
      if (!result) {
        this.noData = !this.productList.length;
        return;
      }

      if (this.pageNum === 1) {
        // 第一页
        this.productList = result.rows || [];
      } else {
        this.productList = this.productList.concat([...result.rows]);
      }

      this.noData = !this.productList.length;
      this.hasNext = this.productList.length < result.total;
      if (this.hasNext) {
        this.pageNum += 1;
      }
      this.$nextTick(() => {
        this.$refs.productList && this.$refs.productList.updateList(this.productList);
        this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.header-right {
  font-size:  14px;
}
</style>
<style lang="scss">
.collect-container {
  .product-list .item {
    width: 97%;
    margin: .1rem auto 0;
    border-radius: .1rem;
    border-bottom: 1px solid #e3e3e3;
    box-shadow: 0 2px 5px #e3e3e3;
  }
}
</style>