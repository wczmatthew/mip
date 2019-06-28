<!-- 客户列表 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div class="header-btns" slot="header-mid">
      <button :class="[customerType == 'odd' ? 'blue-btn': 'plain-white-btn']" @click.stop="onChangeCustomer('odd')">
        老客户
      </button>
      <button :class="[customerType == 'new' ? 'blue-btn': 'plain-white-btn']" @click.stop="onChangeCustomer('new')">
        临时客户
      </button>
    </div>
    <div class="header-right" :class="{'color-blue': isEdit }" slot="header-right" @click="onEdit()">
      {{ isEdit ? '完成' : '管理' }}
    </div>
    <!-- 顶部栏 end -->

    <customer :current-path="routePath" ref="customer"></customer>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import Customer from './components/Customer.vue';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'customers' }),
      isEdit: false,
      customerType: 'odd',
    };
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.customer.onPullingDown();
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
    onChangeCustomer(type) {
      this.customerType = type;
      this.$refs.customer && this.$refs.customer.onChangeCustomer(type);
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
  }
}


.header-right {
  color: $color-grey;
}

.color-blue {
  color: $color-blue;
}
</style>