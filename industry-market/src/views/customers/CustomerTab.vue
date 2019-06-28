<!-- 客户列表 -->
<template lang='html'>
  <div class="w-container">
    <!-- 顶部栏 -->
    <w-header>
      <div slot="header-mid" class="header-mid">
        <i class="iconfont icon-jia" @click.stop="onNew()"></i>

        <div class="header-btns">
          <button :class="[customerType == 'odd' ? 'blue-btn': 'plain-white-btn']" @click.stop="onChangeCustomer('odd')">
            老客户
          </button>
          <button :class="[customerType == 'new' ? 'blue-btn': 'plain-white-btn']" @click.stop="onChangeCustomer('new')">
            临时客户
          </button>
        </div>
      </div>
      <div class="header-right" :class="{'color-blue': isEdit }" slot="header-right" @click="onEdit()">
        {{ isEdit ? '完成' : '管理' }}
      </div>
      <!-- <div class="header-right" slot="header-right">
        <w-msg-icon color="blue"></w-msg-icon>
        <w-cart-icon color="blue"></w-cart-icon>
      </div> -->
    </w-header>
    <!-- 顶部栏 end -->

    <customer class="w-content" :is-tabbar="true" :current-path="currentPath" ref="customer"></customer>
  </div>
</template>
<script>
// import Utils from '@/common/Utils';
import Customer from './components/Customer.vue';

export default {
  data() {
    return {
      isEdit: false,
      customerType: 'odd',
      isRequest: false,
    };
  },
  created() {
  },
  watch: {
    '$route'(to) {
      if (to.path === '/market' && to.query.tab === 'customer' && !this.isRequest) {
        this.$nextTick(() => {
          this.$refs.customer && this.$refs.customer.onPullingDown();
        });
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.isRequest = true;
      this.$refs.customer && this.$refs.customer.onPullingDown();

      setTimeout(() => {
        this.isRequest = false;
      }, 300);
    });
  },
  components: {
    Customer,
  },
  methods: {
    onEdit() {
      this.isEdit = !this.isEdit;
      this.$refs.customer && this.$refs.customer.onEditList(this.isEdit);
    },
    onNew() {
      this.$router.push('/market/customerNew');
    },
    onChangeCustomer(type) {
      this.customerType = type;
      this.$refs.customer && this.$refs.customer.onChangeCustomer(type);
    },
  },
  props: {
    currentPath: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';

.header-btns {
  width: 40%;
  height: 40px;
  border-radius: 40px;
  display: flex;
  margin: 7.5px auto;
  overflow: hidden;
  border: 1px solid $color-blue;

  button {
    width: 50%;
    border-radius: 0;
    height: 40px;
    border: 0;

    &:active {
      opacity: 1;
    }
  }
}

.header-right {
  color: $color-grey;
}

.header-mid {
  position: relative;

  .iconfont {
    position: absolute;
    top: 0;
    left: 0;
    width: .3rem;
    height: 100%;
    @include flex-center;
    font-size: 18px;
    color: $color-blue;
  }
}

.color-blue {
  color: $color-blue;
}
</style>