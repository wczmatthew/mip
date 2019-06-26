<!-- 客户列表 -->
<template lang='html'>
  <div class="w-container">
    <!-- 顶部栏 -->
    <w-header>
      <div slot="header-mid" class="header-mid">
        <i class="iconfont icon-jia" @click.stop="onNew()"></i>
        客户列表
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
    };
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.customer && this.$refs.customer.onPullingDown();
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
@import '~@/styles/variable.scss';
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