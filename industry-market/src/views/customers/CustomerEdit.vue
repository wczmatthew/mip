<!-- 编辑客户 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      编辑客户信息
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <customer-form ref="customerForm">
      <button class="blue-btn" @click="onEdit()">
        完成
      </button>
    </customer-form>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import service from '@/services/order.service';
import CustomerForm from './components/CustomerForm.vue';

export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.$refs.customerForm && this.$refs.customerForm.updateCustomer(this.customer);

      // 清空上次的数据
      this.$store.commit('customer/updateCustomer');
    });
  },
  computed: {
    ...mapGetters('customer', {
      customer: 'customer',
    }),
  },
  components: {
    CustomerForm,
  },
  methods: {
    async onEdit() {
      const isValid = this.$refs.customerForm.validForm();
      if (!isValid) return;
      const customer = this.$refs.customerForm.getFormData();
      Utils.showLoading();
      const result = await service.editClient(customer);
      Utils.hideLoading();
      if (!result) return;
      Utils.showToast('编辑客户信息成功');
      this.$store.commit('customer/updateCustomer', result);
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';

.blue-btn {
  width: 1.5rem;
  height: .3rem;
  border-radius: .3rem;
  position: fixed;
  bottom: .1rem;
  left: 50%;
  margin-left: -.75rem;
  font-size: .14rem;
}
</style>