<!-- 编辑客户 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      编辑客户信息
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <customer-update ref="customerForm">
      <button class="blue-btn" @click="onEdit()">
        完成
      </button>
    </customer-update>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import service from '@/services/order.service';
import CustomerUpdate from './components/CustomerUpdate.vue';

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
    CustomerUpdate,
  },
  methods: {
    async onEdit() {
      const isValid = this.$refs.customerForm.validForm();
      if (!isValid) return;
      const customer = this.$refs.customerForm.getFormData();
      Utils.showLoading();
      const result = await service.editClientWithQA(customer);
      if (!result) return;
      Utils.hideLoading();
      Utils.showToast('编辑客户信息成功');
      if (parseInt(this.$route.query.isUpdateTemp, 10) === 1) {
        // 更新临时客户信息
        this.$store.commit('customer/updateSelectCustomer', result);
      } else {
        this.$store.commit('customer/updateCustomer', result);
      }
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';

.blue-btn {
  width: 1.5rem;
  height: .2rem;
  border-radius: .25rem;
  position: fixed;
  bottom: .1rem;
  left: 50%;
  margin-left: -.75rem;
}
</style>