<!-- 新增收货地址 -->
<template lang='html'>
  <w-container show-header show-back show-footer>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      编辑收货地址
    </div>
    <div class="header-right" slot="header-right">
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <address-form ref="addressForm"></address-form>
    <!-- 正文内容 end -->

    <button class="bottom-btn gradient-btn" slot="w-footer" @click="onConfirm()">
      编辑收货地址
    </button>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import { mapGetters } from 'vuex';
import AddressForm from './components/AddressForm.vue';
import service from '@/services/order.service';

export default {
  data() {
    return {
      loading: false,
      addressData: null,
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.$refs.addressForm && this.$refs.addressForm.updateData(this.updateAddress);
    });
  },
  computed: {
    ...mapGetters('address', {
      selectAddress: 'selectAddress',
      updateAddress: 'updateAddress',
    }),
  },
  components: {
    AddressForm,
  },
  methods: {
    // async getData() {
    //   Utils.showLoading();
    //   const result = await service.getBanner({ userid: Utils.getUserId(this) });
    //   if (!result) return;
    //   Utils.hideLoading();
    //   this.addressData = result;
    // },
    async onConfirm() {
      if (this.loading) return;

      const formData = this.$refs.addressForm.validForm();
      if (!formData.isValid) return;
      this.loading = true;

      // 请求数据
      const params = {
        addressId: this.updateAddress.id,
        userid: Utils.getUserId(this),
        consignee: formData.data.name, // 收货人姓名
        province: formData.data.addressArea, // 省市区
        address: formData.data.addressDetail, // 具体地址
        zipcode: formData.data.zipcode, // 邮政编码
        telephone: formData.data.phone, // 收货人联系方式
        isdefault: formData.data.isDefault ? '1' : '0',
      };


      Utils.showLoading();
      const result = await service.editAddress(params);
      this.loading = false;
      if (!result) return;
      Utils.hideLoading();
      this.$store.commit('address/updateAddress', result);

      if (this.selectAddress && this.selectAddress.id === this.updateAddress.id) {
        // 编辑的是选中的地址
        this.$store.commit('address/updateSelectAddress', params);
      }

      Utils.showToast('编辑收货地址成功');
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';
</style>