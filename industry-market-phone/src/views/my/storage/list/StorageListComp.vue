<!-- 库存信息 -->
<template lang='html'>
  <w-scroll
    ref="scroll"
    class="storage-list"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">

    <!-- 列表 -->
    <no-data v-if="noData"></no-data>
    <w-loading-row v-if="isFirstLoading"></w-loading-row>

    <div style="height: .1rem;"></div>

    <div class="item w-underline" v-for="(item, index) in dataList" :key="index">
      <div class="row1">
        {{ item.spec }}
      </div>
      <div class="row2 text-center">
        个
      </div>
      <div class="row2 num" @click="onChangeNum(item)">
        {{item.qty}}
        <i class="iconfont icon-edit"></i>
      </div>
    </div>
    <!-- 列表 end -->

  </w-scroll>
</template>
<script>
import service from '@/services/order.service';
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 20,
      isFirstLoading: false,
      hasNext: true,
      dataList: [],
      noData: false,
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {
    onChangeNum(item) {
      Utils.showPrompt({
        title: '盘点库存',
        placeholder: (item.qty).toString(),
        value: '',
        onConfirm: ({ promptValue }) => {
          if (!promptValue) return;
          console.log(promptValue);
          this.changeStore(item, promptValue);
        },
      });
    },
    // 检查库存中是否已经变更
    checkItemChange(item) {
      for (let i = 0; i < this.dataList.length; i++) {
        const data = this.dataList[i];
        if (data.prodId === item.prodId) {
          // this.dataList[i] = item;
          this.dataList.splice(i, 1, item);
          break;
        }
      }
      // 调整好后清空
      this.$store.commit('storage/updateEditStorageItem', null);
    },
    async changeStore(item, qty) {
      Utils.showLoading();
      const itemList = [{
        inveQty: qty,
        storeQty: item.qty,
        prodId: item.prodId,
      }];
      const result = await service.checkWareHouse({ userid: Utils.getUserId(this), itemList: JSON.stringify(itemList) });
      if (!result) return;
      Utils.showToast(`${item.spec}库存盘点成功`);
      item.qty = qty;
      this.$store.commit('storage/updateEditStorageItem', item);
    },
    // 下拉刷新
    onPullingDown(keywords) {
      this.pageNum = 1;
      this.keywords = keywords;
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
      const params = { pageNum: this.pageNum, pageSize: this.pageSize, userid: Utils.getUserId(this), keyword: this.keywords };
      const result = await service.getStoreInfoList(params);
      this.isFirstLoading = false;
      if (!result) {
        this.noData = !this.dataList.length;
        return;
      }

      if (this.pageNum === 1) {
        // 第一页
        this.dataList = result.rows || [];
      } else {
        this.dataList = this.dataList.concat([...result.rows]);
      }

      this.noData = !this.dataList.length;
      this.hasNext = this.dataList.length < result.total;
      if (this.hasNext) {
        this.pageNum += 1;
      }
      this.$nextTick(() => {
        this.$refs.dataList && this.$refs.dataList.updateList(this.dataList);
        this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.storage-list {
  .item {
    display: flex;
    align-items: center;
    background: #fff;
    padding: .1rem 0;

    .row1 {
      width: 48%;
      @include break-word();
      padding-left: .12rem;
    }

    .row2 {
      width: 26%;
      @include break-word();
    }

    .num {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $color-red;
      padding-left: .08rem;
      padding-right: .12rem;

      .iconfont {
        color: $color-grey;
        font-size: 16px;
      }
    }

    .text-center {
      text-align: center;
    }
  } // end item
} // end storage-list
</style>