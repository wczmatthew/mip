<!-- 新增收货地址 -->
<template lang='html'>
  <w-container show-header show-back show-footer>
    <!-- 顶部栏 -->
    <template #header-mid>
      新增收货地址
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <address-form ref="addressForm"></address-form>
    <!-- 正文内容 end -->

    <template #w-footer>
      <button class="bottom-btn gradient-btn" @click="onConfirm()">
        新增收货地址
      </button>
    </template>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import AddressForm from './components/AddressForm.vue';
import service from '@/services/order.service';

export default {
  data() {
    return {
      loading: false,
    };
  },
  created() {},
  mounted() {},
  components: {
    AddressForm,
  },
  methods: {
    async onConfirm() {
      if (this.loading) return;
      const formData = this.$refs.addressForm.validForm();
      if (!formData.isValid) return;
      this.loading = true;

      // 请求数据
      const params = {
        userid: Utils.getUserId(this),
        consignee: formData.data.name, // 收货人姓名
        province: formData.data.addressArea, // 省市区
        address: formData.data.addressDetail, // 具体地址
        zipcode: formData.data.zipcode, // 邮政编码
        telephone: formData.data.phone, // 收货人联系方式
        isdefault: formData.data.isDefault ? '1' : '0',
      };
      Utils.showLoading();
      const result = await service.addAddress(params);
      this.loading = false;
      if (!result) return;
      Utils.hideLoading();
      this.$store.commit('address/updateAddress', result);

      this.loading = false;
      Utils.showToast('新增收货地址成功');
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';
</style>