<!-- 新增客户 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      新增客户信息
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <customer-form ref="customerForm">
      <button class="blue-btn" @click="onCreate()">
        新增客户
      </button>
    </customer-form>
    <!-- 正文内容 end -->

  </w-container>
</template>
<script>
import CustomerForm from './components/CustomerForm.vue';
import service from '@/services/order.service';
import Utils from '@/common/Utils';

export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {
    // 清空上次的数据
    this.$store.commit('customer/updateCustomer');
  },
  components: {
    CustomerForm,
  },
  methods: {
    async onCreate() {
      const isValid = this.$refs.customerForm.validForm();
      if (!isValid) return;

      const customer = this.$refs.customerForm.getFormData();
      Utils.showLoading();
      const result = await service.addClient(customer);
      if (!result) return;
      Utils.hideLoading();
      Utils.showToast('新增客户成功');
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