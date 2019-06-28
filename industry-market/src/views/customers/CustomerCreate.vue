<!-- 新增客户 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      新增客户信息
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <customer-update ref="customerForm">
      <div class="bottom-btns">
        <button class="blue-btn" @click="onCreate()">
          新增客户
        </button>
        <!-- <button class="blue-btn" @click="onChat()">
          新增并开始洽谈
        </button> -->
      </div>
    </customer-update>
    <!-- 正文内容 end -->

  </w-container>
</template>
<script>
import CustomerUpdate from './components/CustomerUpdate.vue';
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
    this.$refs.customerForm && this.$refs.customerForm.getQuestions();
  },
  components: {
    CustomerUpdate,
  },
  methods: {
    async onCreate() {
      const isValid = this.$refs.customerForm.validForm();
      if (!isValid) return;

      const customer = this.$refs.customerForm.getFormData();
      Utils.showLoading();
      const result = await service.addClientWithQA(customer);
      if (!result) return;
      Utils.showToast('新增客户成功');
      this.$store.commit('customer/updateCustomer', result);
      this.$router.back();
    },
    async onChat() {
      const isValid = this.$refs.customerForm.validForm();
      if (!isValid) return;

      const customer = this.$refs.customerForm.getFormData();
      Utils.showLoading();
      const result = await service.addClient(customer);
      if (!result) return;
      this.$store.commit('customer/updateCustomer', result);
      this.$router.replace('/market/chat');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';

.bottom-btns {
  position: fixed;
  bottom: .1rem;
  width: 2.6rem;
  height: .2rem;
  left: 50%;
  margin-left: -1.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.blue-btn {
  width: 40%;
  height: .2rem;
  border-radius: .2rem;
}
</style>