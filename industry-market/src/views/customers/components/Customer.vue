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
        <w-loading-row v-show="firstLoading"></w-loading-row>
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
              <div class="row-label" v-show="item.isTemp == 1">
                <span class="label">
                  {{item.createTime | dateFormat('yyyy-MM-dd')}}
                </span>
                <span class="label">
                  {{item.createTime | dateFormat('HH:mm')}}
                </span>
              </div>
              <div class="row-label" v-show="item.isTemp != 1">
                <span class="label">
                  {{item.industryName || '--'}}
                </span>
                <span class="label">
                  {{item.areaName || '--'}}
                </span>
              </div>
            </div>
          </div>
          <div class="detail" v-show="item.isTemp != 1">
            <p class="row">
              <span>公司：{{item.companyName}}</span>
            </p>
            <p class="row">
              <span>职务：{{item.deptName || '--'}}</span>
              <span>手机：{{item.phone}}</span>
            </p>
            <!-- <div class="row">
              <span>手机：{{item.phone}}</span>
              <p class="price">
                已消费￥{{item.orderAmount || '0'}}
              </p>
            </div> -->
            <p class="row">
              地址：{{item.address}}
            </p>
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

    <div slot="w-footer" class="bottom-btn" v-if="!isTabbar">
      <button class="blue-btn" @click="onNew()">
        新增客户
      </button>
      <button class="blue-btn" @click="onNewTemp()">
        新增临时客户
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
      isEdit: false,
      editIndex: -1,
      customerType: 'odd',
    };
  },
  created() {
  },
  mounted() {
  },
  filters: {
    dateFormat: (val, fmt) => Utils.dateFormat(new Date(Number(val)), fmt),
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
      if (!result) return;
      Utils.hideLoading();
      this.dataList.splice(index, 1);
      Utils.showToast('删除成功');

      if (this.selectCustomer.id === customer.id) {
        // 删除了选中客户, 需要清空选中的客户信息
        this.$store.commit('customer/resetSelectCustomer');
      }
    },
    // 编辑客户信息
    onEdit(customer, index) {
      this.editIndex = index;
      this.$store.commit('customer/updateCustomer', customer);
      this.$router.push(`${this.currentPath}/customerEdit?id=${customer.id}`);
    },
    onNew() {
      this.$router.push(`${this.currentPath}/new`);
    },
    // 新增临时客户
    async onNewTemp() {
      Utils.showLoading();
      const result = await service.addTempClient({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.showToast('新增临时客户成功, 并切换当前客户为新增的客户');
      // 更新选中客户信息
      this.$store.commit('customer/updateSelectCustomer', result);
      // 切换到智能设计界面
      this.$router.back();
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
      if (this.isRate) {
        // 选择优惠率客户
        this.$store.commit('customer/updateSelectRateCustomer', customer);
      } else {
        this.$store.commit('customer/updateSelectCustomer', customer);
      }
      this.$router.back();
    },
    // 切换客户类型
    onChangeCustomer(type) {
      this.customerType = type;
      this.firstLoading = true;
      this.onPullingDown();
    },
    // 下拉刷新
    onPullingDown() {
      // if (this.loading) return;
      // this.loading = true;
      this.$nextTick(() => {
        this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0, 300);
      });
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
      let result;

      if (this.customerType === 'odd') {
        // 获取老客户
        result = await service.getCustomerList({ userid: Utils.getUserId(this), pageNum: this.pageNum, pageSize: this.pageSize });
      } else {
        // 获取临时客户
        result = await service.getTempClientList({ userid: Utils.getUserId(this), pageNum: this.pageNum, pageSize: this.pageSize });
      }

      setTimeout(() => {
        this.firstLoading = false;
      }, 300);

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
    isRate: { // 是否为选择优惠率客户
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';

.customer-list {
  display: flex;
  // align-items: center;
  justify-content: space-between;
  padding: .1rem .12rem;
  flex-wrap: wrap;
  background: $color-bg;

  .item {
    width: 49%;
    background: #fff;
    border-radius: .05rem;
    box-shadow: 0 0 .05rem #ccc;
    padding: .05rem .1rem;
    margin-bottom: .1rem;
    position: relative;
    overflow: hidden;
    transition: all .3s ease;

    .logo {
      width: .35rem;
      height: .35rem;
      border-radius: .35rem;
      background: $color-line;
      border: .02rem solid $color-line;
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
          font-size: 18px;
          color: $color-gold;
          @include text-overflow-muli(2);
          min-height: 20px;
        } // end name

      } // end row-1

      .row-label {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: .1rem;
        .label {
          background: #d1d8ff;
          color: #7989dd;
          padding: .03rem .08rem;
          font-size: 10px;
          border-radius: .05rem;
          margin-right: .05rem;

          &:nth-child(2n) {
            background: #ffe9d7;
            color: #cd9465;
          }
        }
      } // end row-label

      .row {
        font-size: 10px;
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        width: 85%;
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
          font-size: 14px;
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

    .right-icon {
      position: absolute;
      right: 0;
      top: 0;
      width: .25rem;
      height: .25rem;
      line-height: .25rem;
      text-align: center;
      font-size: 26px;
      color: $color-blue;
      z-index: 10;

      &:active {
        background: $color-bg;
      }

      .icon-delete {
        color: $color-red;
      }
    }

    .right-icon2 {
      top: .3rem;

      .iconfont {
        color: $color-gold;
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
      font-size: 22px;
    }
  }
}

.w-customer {
  height: 100%;
}

.scroll-view {
  padding-bottom: .4rem;
}

.bottom-btn {
  position: absolute;
  bottom: .1rem;
  left: 50%;
  margin-left: -1.6rem;
  z-index: 10;
  display: flex;
  height: .22rem;
  align-items: center;
  width: 3.2rem;
  justify-content: space-between;

  button {
    width: 1.5rem;
    font-size: 16px;
    border-radius: .22rem;
    height: .22rem;
  }
}
</style>