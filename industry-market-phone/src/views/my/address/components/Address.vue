<!-- 收货地址 -->
<template lang='html'>
  <div class="w-address">
    <!-- 正文内容 -->
    <div class="address-list">
      <no-data v-if="noData"></no-data>
      <w-loading-row v-if="firstLoading"></w-loading-row>
      <div class="item" v-for="(item, index) in dataList" :key="index" @click.stop="onSelect(item)">
        <div class="title-row">
          <span class="title">
            {{item.consignee}}
            <i v-if="item.isdefault==1">默认</i>
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
            <span>手机：{{item.telephone}}</span>
          </div>
          <p class="row">
            地址：{{item.province}} {{item.address}}
          </p>
        </div>
      </div>
    </div>
    <!-- 正文内容 end -->

    <div class="bottom-btn">
      <button class="gradient-btn" @click="onNew()">
        新增地址
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
      firstLoading: true,
      noData: false,
      pageNum: 1,
      pageSize: 20,
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
      if (to.path !== this.currentPath) return;
      // 重新进入
      if (!this.updateAddress || !this.updateAddress.id) {
        this.editIndex = -1;
        return;
      }

      if (this.editIndex > -1) {
        // 编辑操作
        this.dataList.splice(this.editIndex, 1, this.updateAddress);
        this.editIndex = -1;
      } else {
        // 新增操作
        this.dataList.splice(0, 0, this.updateAddress);

        // if (this.hasNext) {
        //   // 移除最后一个, 防止上拉加载的时候数据重复
        //   this.dataList.pop();
        // }
      }

      if (Number(this.updateAddress.isdefault) === 1) {
        // 新增或者编辑的为默认地址, 那么将其他的设置为非默认
        this.dataList.forEach((item) => {
          if (item.id !== this.updateAddress.id) {
            item.isdefault = 0;
          }
        });
      }

      this.noData = this.dataList.length <= 0;

      this.$store.commit('address/updateAddress');
    },
  },
  computed: {
    ...mapGetters('address', {
      selectAddress: 'selectAddress',
      updateAddress: 'updateAddress',
    }),
  },
  components: {},
  methods: {
    onEditList(isEdit) {
      this.isEdit = isEdit;
    },
    // 点击删除按钮
    onDelete(address, index) {
      Utils.showConfirm({
        title: '提示',
        content: '确定删除该收货地址?',
        onConfirm: () => {
          this.delete(address, index);
        },
        maskClosable: true,
      });
    },
    // 删除
    async delete(address, index) {
      Utils.showLoading();
      const result = await service.deleteAddress({ userid: Utils.getUserId(this), addressId: address.id });
      Utils.hideLoading();
      if (!result) return;
      this.dataList.splice(index, 1);
      Utils.showToast('删除成功');

      this.noData = this.dataList.length <= 0;
    },
    // 编辑
    onEdit(address, index) {
      this.editIndex = index;
      this.$store.commit('address/updateAddress', address);
      this.$router.push(`${this.currentPath}/edit?id=${address.id}`);
    },
    // 新增
    onNew() {
      this.$router.push(`${this.currentPath}/new`);
    },
    // 选择收货地址信息
    onSelect(address) {
      if (!this.isSelect) return;
      // this.selectCustomer = customer;
      this.$store.commit('address/updateSelectAddress', address);
      this.$router.back();
    },
    // 获取收货地址
    async getData() {
      const result = await service.getAddressList({ userid: Utils.getUserId(this) });

      this.firstLoading = false;

      if (!result) {
        this.noData = true;
        return;
      }

      this.dataList = [...result];
      this.noData = !this.dataList.length;
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
    padding: .05rem .1rem;
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