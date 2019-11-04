<!-- 收货地址 -->
<template lang='html'>
  <div class="w-address">
    <!-- 正文内容 -->
    <w-scroll
      ref="scroll"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
      class="address-list">

      <!-- 商品列表 -->
      <no-data v-if="noData"></no-data>
      <w-loading-row v-if="firstLoading"></w-loading-row>
      <div class="item" v-for="(item, index) in dataList" :key="index" @click.stop="onSelect(item)">
        <div class="title-row">
          <span class="title">
            {{item.name}}
          </span>
          <div class="right-icon">
            <span class="icon" @click.stop="onEdit(item, index)">
              编辑
            </span>
            <span class="icon"  @click.stop="onDelete(item, index)">
              <i class="iconfont icon-delete"></i>
            </span>
          </div>
        </div>
        <div class="detail">
          <div class="row">
            <span>手机：{{item.phone}}</span>
          </div>
          <p class="row">
            地址：{{item.address}}
          </p>
        </div>
      </div>
      <!-- 商品列表 end -->

    </w-scroll>
    <!-- 正文内容 end -->

    <div class="bottom-btn" v-if="!hideBottom">
      <button class="gradient-btn" @click="onNew()">
        新增客户
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import service from '@/services/order.service';

export default {
  data() {
    return {
      dataList: [],
      firstLoading: false,
      noData: true,
      pageNum: 1,
      pageSize: 20,
      hasNext: true,
      loading: false,
      isEdit: false,
      editIndex: -1,
      keywords: '',
    };
  },
  created() {
  },
  mounted() {
  },
  watch: {
    '$route'(to) {
      if (to.path !== this.currentPath) return;
      // 重新进入
      if (!this.updateCustomer || !this.updateCustomer.id) {
        this.editIndex = -1;
        return;
      }

      if (this.editIndex > -1) {
        // 编辑操作
        this.dataList.splice(this.editIndex, 1, this.updateCustomer);
        this.editIndex = -1;
      } else {
        // 新增操作
        this.dataList.splice(0, 0, this.updateCustomer);

        // if (this.hasNext) {
        //   // 移除最后一个, 防止上拉加载的时候数据重复
        //   this.dataList.pop();
        // }
      }

      this.noData = this.dataList.length <= 0;

      this.$store.commit('customer/updateCustomer');
    },
  },
  computed: {
    ...mapGetters('customer', {
      selectCustomer: 'selectCustomer',
      updateCustomer: 'updateCustomer',
    }),
  },
  components: {},
  methods: {
    onEditList(isEdit) {
      this.isEdit = isEdit;
    },
    // 点击删除按钮
    onDelete(data, index) {
      Utils.showConfirm({
        title: '提示',
        content: '确定删除该客户?',
        onConfirm: () => {
          this.delete(data, index);
        },
        maskClosable: true,
      });
    },
    // 删除
    async delete(data, index) {
      Utils.showLoading();
      const result = await service.delSaleClient({ userid: Utils.getUserId(this), saleClientId: data.id });
      if (!result) return;
      this.dataList.splice(index, 1);
      Utils.showToast('删除成功');

      this.noData = this.dataList.length <= 0;
    },
    // 编辑
    onEdit(data, index) {
      this.editIndex = index;
      this.$store.commit('customer/updateCustomer', data);
      this.$router.push(`${this.currentPath}/edit?id=${data.id}`);
    },
    // 新增
    onNew() {
      this.$router.push(`${this.currentPath}/new`);
    },
    // 选择收货地址信息
    onSelect(data) {
      if (!this.isSelect) return;
      this.$store.commit('customer/updateSelectCustomer', data);

      const confirmPath = Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'confirmSaleOrder' });

      const pathList = this.$route.matched;
      const index = pathList.findIndex(item => item.path === confirmPath);
      if (index >= 0) {
        // 判断确认订单在前几页, 直接返回这一页
        const goIndex = index - pathList.length + 1;
        this.$router.go(goIndex);
        return;
      }

      // 没有确认订单返回上一页
      this.$router.back();
    },
    // 下拉刷新
    onPullingDown(keywords) {
      this.keywords = keywords || '';
      this.pageNum = 1;
      this.isFirstLoading = true;
      this.$refs.scroll && this.$refs.scroll.scrollTop();
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
    // 获取收货地址
    async getData() {
      const result = await service.getSaleClientList({ userid: Utils.getUserId(this), pageNum: this.pageNum, pageSize: this.pageSize, keyword: this.keywords });
      this.firstLoading = false;
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
  },
  props: {
    isSelect: {
      type: Boolean,
      default: false,
    },
    currentPath: {
      type: String,
      default: '',
    },
    hideBottom: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';

.address-list {
  padding-bottom: .1rem;
  flex-wrap: wrap;
  background: $color-bg;

  .item {
    width: 100%;
    background: #fff;
    padding: .05rem $spacing-lr;
    margin-bottom: .1rem;
    position: relative;
    overflow: hidden;
    transition: all .3s ease;

    .title-row {
      display: flex;
      padding-bottom: .05rem;
      position: relative;
      z-index: 10;
      background: #fff;

      .title {
        flex: 1;
        padding-top: .06rem;
        @include text-overflow-muli(2);
        line-height: 1.3;
        display: flex;
        align-items: center;

        i {
          font-size: 10px;
          background: #ffcbcb;
          margin-left: .05rem;
          padding: .02rem .05rem;
          color: #e43d2e;
          border-radius: .05rem;
        }
      }

      .right-icon {
        flex-shrink: 0;
        display: flex;
        .icon {
          width: .35rem;
          height: .3rem;
          @include flex-center;
          font-size:  12px;
          color: $color-grey;

          .icon-delete {
            color: $color-red;
            font-size: 15px;
          }
        }
      } // end right-icon
    } // end title-row

    .row {
      color: $color-grey;
      font-size:  12px;
      @include text-overflow-muli(2);
      padding-bottom: .05rem;
    }
  } // end item

}

.w-address {
  height: 100%;
  padding-bottom: .4rem;
}

.bottom-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  height: .4rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  button {
    width: 100%;
    font-size:  14px;
    border-radius: 0;
  }
}
</style>