<!-- 客户列表 -->
<template lang='html'>
  <w-container show-header :show-back="!isTabbar" show-footer :footer-class="['w-footer-bg-transparent']">
    <!-- 顶部栏 -->
    <div slot="header-mid">
      选择客户
    </div>
    <div class="header-right" slot="header-right" v-if="isTabbar">
      <w-msg-icon color="blue"></w-msg-icon>
      <w-cart-icon color="blue"></w-cart-icon>
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <w-scroll
      ref="scroll"
      class="scroll-view"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <div class="customer-list">
        <no-data v-if="noData"></no-data>
        <w-loading-row v-if="firstLoading"></w-loading-row>
        <div class="item" v-for="(item, index) in dataList" :key="index" :class="{'actived': item.id == selectCustomer.id}" @click.stop="onSelect(item)">
          <!-- 选中图标 -->
          <i class="iconfont icon-bottom-select"></i>
          <!-- 选中图标 end -->
          <div class="left">
            <div class="logo">
              <img src="~@/assets/common/user-logo.png" alt="">
            </div>
          </div>
          <div class="detail">
            <div class="row-1">
              <span class="name">
                {{item.name}}
              </span>
            </div>
            <div class="row-label">
              <span class="label">
                美食爱好者
              </span>
              <span class="label">
                电力行业
              </span>
            </div>

            <p class="row">
              <span>公司：李四电器有限责任公司</span>
            </p>
            <p class="row">
              <span>职务：公司采购</span>
            </p>
            <div class="row">
              <span>手机：{{item.phone}}</span>
            </div>
            <p class="row">
              地址：{{item.address}}
            </p>
            <p class="price">
              已累计消费￥199999.00
            </p>
          </div>

          <!-- 编辑按钮 -->
          <div class="right-icon" @click.stop="onEdit(item)">
            <i class="iconfont icon-edit"></i>
          </div>
          <!-- 编辑按钮 end -->
        </div>
      </div>
    </w-scroll>
    <!-- 正文内容 end -->

    <button class="blue-btn bottom-btn" slot="w-footer" @click="onNew()">
      新增客户
    </button>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import service from '@/services/order.service';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'customers' }),
      selectCustomer: {},
      dataList: [],
      firstLoading: true,
      noData: false,
      pageNum: 1,
      pageSize: 20,
      hasNext: true,
    };
  },
  created() {
    this.$nextTick(() => {
      this.onPullingDown();
    });
  },
  mounted() {
  },
  components: {},
  methods: {
    // 编辑客户信息
    onEdit(customer) {
      const path = this.currentPath || this.routePath;
      this.$router.push(`${path}/edit?id=${customer.id}`);
    },
    onNew() {
      const path = this.currentPath || this.routePath;
      this.$router.push(`${path}/new`);
    },
    // 选择客户信息
    onSelect(customer) {
      if (this.isTabbar) return;
      this.selectCustomer = customer;
      this.$store.commit('customer/updateSelectCustomer', this.selectCustomer);
      this.$router.back();
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
        this.$refs.scroll.forceUpdate();
        return;
      }
      this.getData();
    },
    async getData() {
      const result = await service.getCustomerList({ userid: Utils.getUserId(this), pageNum: this.pageNum, pageSize: this.pageSize });
      if (!result) return;

      if (this.pageNum === 1) {
        this.dataList = [...result.rows];
        this.noData = !this.dataList.length;
      } else {
        this.dataList = this.dataList.concat([...result.rows]);
      }

      this.hasNext = this.dataList.length < result.total;
      if (this.hasNext) {
        this.pageNum += 1;
      }
      this.$refs.scroll.forceUpdate(true);

      if (this.firstLoading) {
        this.firstLoading = false;
      }
    },
  },
  props: {
    isTabbar: { // 是否是tabbar内容
      type: Boolean,
      default: false,
    },
    currentPath: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
@import '~@/styles/components/button.scss';

.customer-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .1rem .12rem;

  .item {
    width: 49%;
    background: #fff;
    border-radius: .05rem;
    box-shadow: 0 0 .05rem #ccc;
    padding: .05rem .1rem;
    display: flex;
    margin-bottom: .1rem;
    position: relative;
    overflow: hidden;
    transition: all .3s ease;

    .logo {
      width: .5rem;
      height: .5rem;
      border-radius: .5rem;
      background: $color-line;
      border: .03rem solid $color-line;
      flex-shrink: 0;
      margin-right: .1rem;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .detail {
      flex: 1;
      overflow: hidden;
      position: relative;

      .row-1 {
        display: flex;
        align-items: center;
        padding: .05rem 0;
        padding-right: .4rem;
        .name {
          font-size: .18rem;
          color: $color-gold;
          @include text-overflow-muli(2);
        } // end name

      } // end row-1

      .row-label {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: .05rem;
        .label {
          background: #d1d8ff;
          color: #7989dd;
          padding: .05rem .08rem;
          font-size: .1rem;
          border-radius: .05rem;
          margin-right: .05rem;

          &:nth-child(2n) {
            background: #ffe9d7;
            color: #cd9465;
          }
        }
      } // end row-label

      .row {
        font-size: .1rem;
        margin-bottom: .05rem;

        span {
          margin-right: .05rem;
        }
      } // end row

      .price {
        color: $color-red;
        @include text-ellipsis;
        padding: .06rem 0;
        font-weight: 700;
      }
    } // end detail

    .right-icon {
      position: absolute;
      right: 0;
      top: 0;
      width: .4rem;
      height: .4rem;
      text-align: center;
      line-height: .4rem;
      font-size: .22rem;
      color: $color-blue;
      z-index: 10;

      &:active {
        background: $color-bg;
      }
    }

    .icon-bottom-select {
      display: none;
    }
  } // end item

  .item.actived {
    box-shadow: 0 0 .05rem $color-blue;

    .icon-bottom-select {
      display: block;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 10;
      color: $color-blue;
      font-size: .22rem;
    }
  }
}

.bottom-btn {
  width: 1.5rem;
  font-size: .14rem;
  border-radius: .3rem;
  height: .3rem;
  margin-top: .1rem;
}
</style>