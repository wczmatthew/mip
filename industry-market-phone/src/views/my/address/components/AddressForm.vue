<!-- 收货地址表单 -->
<template lang='html'>
  <div class="w-tableview">
    <div class="cell">
      <span class="title">
        联系人
      </span>
      <input type="text" class="desc" placeholder="请输入联系人" v-model.trim="name">
    </div>

    <div class="cell">
      <span class="title">
        联系方式
      </span>
      <input type="tel" class="desc" placeholder="请输入联系方式" v-model.trim="phone">
    </div>

    <div class="cell">
      <span class="title">
        省市区
      </span>
      <input type="text" readonly class="desc" @click="showAddressPicker()" placeholder="请选择省市区" v-model="addressArea"/>
    </div>

    <div class="cell">
      <span class="title">详细地址</span>
      <input type="text" class="desc" placeholder="请输入详细地址" v-model.trim="addressDetail">
    </div>

    <div class="cell">
      <span class="title">
        设为默认地址
      </span>
      <div class="desc">
        <cube-switch v-model="isDefault" style="justify-content: flex-end;"></cube-switch>
      </div>
    </div>
  </div>
</template>
<script>
import Utils from '@/common/Utils';
import { provinceList, cityList, areaList } from '../data/area';

const addressData = provinceList;
addressData.forEach((province) => {
  province.children = cityList[province.value];
  province.children.forEach((city) => {
    city.children = areaList[city.value];
  });
});

export default {
  data() {
    return {
      addressArea: '',
      addressPicker: null,
      isDefault: false,
      name: '',
      phone: '',
      addressDetail: '',
    };
  },
  created() {},
  mounted() {
    this.addressPicker = this.$createCascadePicker({
      title: '省市区',
      data: addressData,
      onSelect: this.selectHandle,
      onCancel: this.cancelHandle,
    });
  },
  components: {},
  methods: {
    showAddressPicker() {
      this.addressPicker.show();
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      console.log('selectedVal: ', selectedVal);
      this.addressArea = selectedText.join(' ');
    },
    updateData(data) {
      this.name = data.name || '';
      this.phone = data.phone || '';
      this.addressArea = data.addressArea || '';
      this.addressDetail = data.addressDetail || '';
      this.isDefault = data.isDefault || '';
    },
    // 校验表单是否填写完毕
    validForm() {
      if (!this.name) {
        Utils.showToast('请输入联系人');
        return { isValid: false };
      }

      if (!this.phone) {
        Utils.showToast('请输入联系方式');
        return { isValid: false };
      }

      if (!this.addressArea) {
        Utils.showToast('请选择省市区');
        return { isValid: false };
      }

      if (!this.addressDetail) {
        Utils.showToast('请输入详细地址');
        return { isValid: false };
      }

      return {
        isValid: true,
        data: {
          name: this.name,
          phone: this.phone,
          addressArea: this.addressArea,
          addressDetail: this.addressDetail,
          isDefault: this.isDefault,
        },
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.w-tableview .cell .desc {
  color: $color-black;
}
</style>