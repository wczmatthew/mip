<!-- 新增客户 -->
<template lang='html'>
  <w-container show-header show-back show-footer>
    <!-- 顶部栏 -->
    <template #header-mid>
      新增客户
    </template>
    <template #header-right>
      <div class="header-right">
        <w-scan-card-icon @upload="onUpload"></w-scan-card-icon>
      </div>
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <customer-form ref="customerForm"></customer-form>
    <!-- 正文内容 end -->

    <template #w-footer>
      <button class="bottom-btn gradient-btn" @click="onConfirm()">
        新增
      </button>
    </template>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import service from '@/services/order.service';
import WScanCardIcon from '@/components/WScanCardIcon.vue';
import CustomerForm from './components/CustomerForm.vue';

export default {
  data() {
    return {
      loading: false,
    };
  },
  created() {},
  mounted() {},
  components: {
    CustomerForm,
    WScanCardIcon,
  },
  methods: {
    onUpload({ type, data }) {
      if (type !== 'success') return;
      // 更新客户信息
      this.$refs.customerForm && this.$refs.customerForm.updateCustomerCardMsg(data);
    },
    async onConfirm() {
      if (this.loading) return;
      const formData = this.$refs.customerForm.validForm();
      if (!formData.isValid) return;
      this.loading = true;

      // 请求数据
      const params = {
        userid: Utils.getUserId(this),
        name: formData.data.name, // 姓名
        address: `${formData.data.addressArea} ${formData.data.addressDetail}`, // 具体地址
        phone: formData.data.phone, // 联系方式
      };
      Utils.showLoading();
      const result = await service.addSaleClient(params);
      this.loading = false;
      if (!result) return;
      Utils.hideLoading();
      this.$store.commit('customer/updateCustomer', result);

      this.loading = false;
      Utils.showToast('新增客户成功');
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';
</style>