<!-- 客户列表 -->
<template lang='html'>
  <div class="w-customer">
    <!-- 正文内容 -->
    <w-scroll
      ref="scroll"
      class="scroll-view"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <div class="customer-list">
        <no-data v-if="noData"></no-data>
        <w-loading-row v-if="firstLoading"></w-loading-row>
        <div class="item" v-for="(item, index) in dataList" :key="index" :class="{'actived': !isTabbar && item.id == selectCustomer.id}" @click.stop="onSelect(item)">
          <!-- 选中图标 -->
          <i class="iconfont icon-bottom-select"></i>
          <!-- 选中图标 end -->
          <div class="customer-row">
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
                  {{item.industryName || '--'}}
                </span>
                <span class="label">
                  {{item.areaName || '--'}}
                </span>
              </div>
              <div class="row">
                <span>公司：{{item.companyName}}</span>
              </div>
            </div>
          </div>
          <div class="detail" :class="{'open': item.isOpen}"
          :style="{height: item.height || 0}">
            <p class="row">
              <span>职务：{{item.deptName || '--'}}</span>
            </p>
            <div class="row">
              <span>手机：{{item.phone}}</span>
            </div>
            <p class="row">
              地址：{{item.address}}
            </p>
          </div>

          <div class="status-bar" :class="{'open': item.isOpen}" @click.stop="toggleDetail(item, $event)">
            {{item.isOpen ? '收起详情' : '展开详情'}}
            <i class="iconfont icon-arrow-down"></i>
          </div>

          <!-- 编辑按钮 -->
          <div class="right-icon" @click.stop="onEdit(item, index)"  v-show="!isEdit">
            <i class="iconfont icon-edit"></i>
          </div>
          <div class="right-icon" @click.stop="onDelete(item, index)" v-show="isEdit">
            <i class="iconfont icon-delete"></i>
          </div>
          <!-- 编辑按钮 end -->
          <!-- 洽谈按钮 -->
          <div class="right-icon right-icon2" @click.stop="onChat(item)"  v-show="isTabbar && !isEdit">
            <i class="iconfont icon-chat"></i>
          </div>
          <!-- 洽谈按钮 end -->
        </div>
      </div>
    </w-scroll>
    <!-- 正文内容 end -->

    <div class="bottom-btn">
      <button class="red-btn" @click="onNew()">
        新增客户
      </button>
    </div>
  </div>
</template>
<script>
import Utils from '@/common/Utils';
import service from '@/services/order.service';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      dataList: [],
      firstLoading: true,
      noData: false,
      pageNum: 1,
      pageSize: 10,
      hasNext: true,
      loading: false,
      isEdit: false,
      editIndex: -1,
    };
  },
  created() {
  },
  mounted() {
  },
  watch: {
    '$route'(to) {
      this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
      if (to.path !== this.currentPath) return;
      // 重新进入
      if (!this.customer || !this.customer.id) {
        this.editIndex = -1;
        return;
      }

      if (this.editIndex > -1) {
        // 编辑操作
        this.dataList.splice(this.editIndex, 1, this.customer);
        this.editIndex = -1;
      } else {
        // 新增操作
        this.dataList.splice(0, 0, this.customer);
      }
      this.$store.commit('customer/updateCustomer');
      this.$refs.scroll.forceUpdate(true);

      if (this.hasNext) {
        this.dataList.pop();
      }
    },
  },
  computed: {
    ...mapGetters('customer', {
      customer: 'customer',
      selectCustomer: 'selectCustomer',
    }),
  },
  components: {},
  methods: {
    toggleDetail(item, e) {
      this.$set(item, 'isOpen', !item.isOpen);
      // console.log(e.target);
      if (item.isOpen) {
        // 展开状态
        if (!item.detailHeight) {
          const detailNode = e.target.previousElementSibling;
          let height = 0;
          detailNode.childNodes.forEach(child => height += child.clientHeight);
          item.detailHeight = height;
        }
        this.$set(item, 'height', `${item.detailHeight}px`);
      } else {
        // 闭合状态
        this.$set(item, 'height', '0');
      }
    },
    onEditList(isEdit) {
      this.isEdit = isEdit;
    },
    // 上次客户信息
    onDelete(customer, index) {
      Utils.showConfirm({
        title: '提示',
        content: '确定删除该客户?',
        onConfirm: () => {
          this.deleteCustomer(customer, index);
        },
        maskClosable: true,
      });
    },
    // 删除客户
    async deleteCustomer(customer, index) {
      Utils.showLoading();
      const result = await service.deleteClient({ userid: Utils.getUserId(this), clientId: customer.id });
      Utils.hideLoading();
      if (!result) return;
      this.dataList.splice(index, 1);
      Utils.showToast('删除成功');
    },
    // 编辑客户信息
    onEdit(customer, index) {
      this.editIndex = index;
      this.$store.commit('customer/updateCustomer', customer);
      this.$router.push(`${this.currentPath}/edit?id=${customer.id}`);
    },
    onNew() {
      this.$router.push(`${this.currentPath}/new`);
    },
    // 开始洽谈
    onChat(item) {
      this.$store.commit('customer/updateSelectCustomer', item);
      this.$router.push(`${this.currentPath}/chat`);
    },
    // 选择客户信息
    onSelect(customer) {
      if (this.isTabbar) return;
      // this.selectCustomer = customer;
      this.$store.commit('customer/updateSelectCustomer', customer);
      this.$router.back();
    },
    // 下拉刷新
    onPullingDown() {
      // if (this.loading) return;
      // this.loading = true;
      this.pageNum = 1;
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
      const result = await service.getCustomerList({ userid: Utils.getUserId(this), pageNum: this.pageNum, pageSize: this.pageSize });

      this.loading = false;

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
      this.$refs.scroll && this.$refs.scroll.forceUpdate(true);

      if (this.firstLoading) {
        this.firstLoading = false;
      }
    },
  },
  props: {
    isTabbar: {
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
@import '~@/styles/components/button.scss';

.customer-list {
  padding: .1rem .12rem;
  flex-wrap: wrap;
  background: $color-bg;

  .item {
    width: 100%;
    background: #fff;
    border-radius: .05rem;
    box-shadow: 0 0 .05rem #ccc;
    padding: .05rem .1rem;
    margin-bottom: .1rem;
    position: relative;
    overflow: hidden;
    transition: all .3s ease;

    .logo {
      width: .6rem;
      height: .6rem;
      border-radius: .6rem;
      background: #fff;
      border: 1px solid $color-line;
      flex-shrink: 0;
      margin-right: .1rem;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .customer-row {
      display: flex;
      overflow: hidden;
      border-bottom: 1px solid $color-line;
      align-items: center;
      padding-bottom: .05rem;
      position: relative;
      z-index: 10;
      background: #fff;

      .detail {
        padding-top: 0;
      }
    }

    .detail {
      flex: 1;
      overflow: hidden;
      position: relative;
      transition: all .3s ease;

      &.open {
        height: 0;
      }

      .row-1 {
        display: flex;
        align-items: center;
        padding: .05rem 0;
        padding-right: .4rem;
        line-height: .18rem;
        .name {
          font-size: 15px;
          @include text-overflow-muli(2);
        } // end name

      } // end row-1

      .row-label {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .label {
          background: $color-red;
          color: #fff;
          padding: .05rem .08rem;
          font-size: 10px;
          border-radius: .05rem;
          margin-right: .05rem;

          &:nth-child(2n) {
            background: $color-orange;
          }
        }
      } // end row-label

      .row {
        font-size: 10px;
        line-height: .16rem;
        display: flex;
        justify-content: space-between;
        padding-top: .05rem;
        // align-items: center;

        span {
          margin-right: .05rem;
          flex-shrink: 0;
        }

        .price {
          flex: 1;
          text-align: right;
          padding-left: .05rem;
          padding: 0;
          font-size:  14px;
          padding-bottom: .02rem;
        }
      } // end row

      .price {
        color: $color-red;
        @include text-ellipsis;
        padding: .06rem 0;
        font-weight: 700;
      }
    } // end detail

    .status-bar {
      width: 100%;
      @include flex-center;
      height: .25rem;
      font-size:  12px;
      color: $color-grey;

      .iconfont {
        margin-left: .05rem;
        transition: all .3s ease;
      }

      &.open {
        .iconfont {
          transform: rotate(180deg);
        }
      }
    }

    .right-icon {
      position: absolute;
      right: 0;
      top: 0;
      width: .4rem;
      height: .4rem;
      text-align: center;
      line-height: .4rem;
      font-size: .22rem;
      color: $color-black;
      z-index: 10;

      &:active {
        background: $color-bg;
      }

      .icon-delete {
        color: $color-red;
      }
    }

    .right-icon2 {
      top: .4rem;

      .iconfont {
        color: $color-gold;
      }
    }

    .icon-bottom-select {
      display: none;
    }
  } // end item

  .item.actived {
    box-shadow: 0 0 .05rem $color-default;

    .icon-bottom-select {
      display: block;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 10;
      color: $color-default;
      font-size: .22rem;
    }
  }
}

.w-customer {
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