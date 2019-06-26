<!-- 客户信息表单 -->
<template lang='html'>
  <div class="customer-form">
    <form class="form">
      <div class="row">
        <div class="input-item col">
          <p>姓名</p>
          <input type="text" placeholder="请输入姓名" v-model="name" maxlength="20">
        </div>
        <div class="input-item col">
          <p>手机号</p>
          <input type="text" placeholder="请输入手机号码" v-model="phone" maxlength="15">
        </div>
      </div>

      <div class="input-item">
        <p>通讯地址</p>
        <input type="text" placeholder="请输入通讯地址" v-model="address" maxlength="50">
      </div>

      <div class="input-item col">
        <p>所属公司</p>
        <input type="text" placeholder="请输入所属公司" v-model="company" maxlength="50">
      </div>

      <div class="row">
        <div class="input-item col">
          <p>担任职务</p>
          <cube-select
            class="select"
            placeholder="请选择担任职务"
            v-model="duty"
            :options="dutyOptions">
          </cube-select>
        </div>

        <div class="input-item col">
          <p>销售区域</p>
          <cube-select
            class="select"
            placeholder="请选择销售区域"
            v-model="area"
            :options="areaOptions">
          </cube-select>
        </div>
      </div>

      <div class="input-item">
        <p>所属行业</p>
        <div class="row-label">
          <div class="label" v-for="(item, index) in industryOptions"
          :key="index" :class="{'actived': item.value == selectIndustry.value}"
          @click.stop="onSelectIndustry(item)">
            {{item.text}}
            <i class="iconfont icon-close"></i>
          </div>
        </div>
      </div>

    </form>
    <slot></slot>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      customerId: '',
      name: '', // 客户名称
      phone: '', // 客户手机
      address: '', // 客户地址
      company: '', // 所属公司
      duty: '', // 职务
      area: '', // 销售区域
      selectIndustry: { text: '', value: '' },
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch('options/getAreaOptions');
    this.$store.dispatch('options/getDutyOptions');
    this.$store.dispatch('options/getIndustryOptions');
  },
  computed: {
    ...mapGetters('options', {
      areaOptions: 'areaOptions',
      dutyOptions: 'dutyOptions',
      industryOptions: 'industryOptions',
    }),
  },
  components: {},
  methods: {
    onSelectIndustry(item) {
      if (item.value === this.selectIndustry.value) {
        this.selectIndustry = { text: '', value: '' };
        return;
      }

      this.selectIndustry = item;
    },
    // 更新客户信息
    updateCustomer(customer) {
      if (!customer) return;
      this.name = customer.name;
      this.phone = customer.phone;
      this.address = customer.address;
      this.duty = parseInt(customer.deptId, 10) || 0;
      this.name = customer.name;
      this.area = parseInt(customer.areaId, 10) || 0;
      this.company = customer.companyName;
      this.selectIndustry = { text: customer.industryName, value: parseInt(customer.industryId, 10) || 0 };
      this.customerId = customer.id;
    },
    // 校验form表单
    validForm() {
      if (!this.name) {
        Utils.showToast('请输入客户姓名');
        return false;
      }

      if (this.name.length > 20) {
        Utils.showToast('客户姓名最大为20字');
        return false;
      }

      if (!this.phone) {
        Utils.showToast('请输入客户手机号');
        return false;
      }

      if (!Utils.checkPhoneNum(this.phone)) {
        Utils.showToast('手机号格式错误');
        return false;
      }

      if (!this.address) {
        Utils.showToast('请输入通讯地址');
        return false;
      }

      if (this.address.length > 50) {
        Utils.showToast('通讯地址最大为50字');
        return false;
      }

      if (!this.company) {
        Utils.showToast('请输入客户所属公司');
        return false;
      }

      if (this.company.length > 50) {
        Utils.showToast('所属公司最大为5字');
        return false;
      }

      if (!this.duty) {
        Utils.showToast('请输入客户担任职务');
        return false;
      }

      if (!this.area) {
        Utils.showToast('请输入客户销售区域');
        return false;
      }

      if (!this.selectIndustry.value) {
        Utils.showToast('请输入客户所属行业');
        return false;
      }
      return true;
    },
    // 获取表单数据
    getFormData() {
      return {
        userid: Utils.getUserId(this),
        name: this.name,
        phone: this.phone,
        address: this.address,
        deptId: this.duty,
        industryId: this.selectIndustry.value,
        areaId: this.area,
        companyName: this.company,
        clientId: this.customerId,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.customer-form {
  padding-top: .1rem;
  height: 100%;
  overflow: hidden;

  .form {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 0 .05rem #ccc;
    border-top-left-radius: .05rem;
    border-top-right-radius: .05rem;
    overflow: auto;
    padding: .2rem .1rem .1rem;
    padding-bottom: .3rem;

    .row-1 {
      display: flex;

      .left {
        flex: 1;
      }

      .logo {
        width: 40%;
        flex-shrink: 0;
      }
    }

    .row {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .col {
        width: 49%;
      }
    }

    .input-item {
      width: 100%;
      margin-bottom: .13rem;
      color: #666;
      p {
        font-weight: 700;
        margin-bottom: .08rem;
      }

      input,
      .select {
        width: 100%;
        height: .25rem;
        display: block;
        border: .01rem solid $color-line;
        border-radius: .05rem;
        padding-left: .08rem;
        font-size: 14px;

        &:focus {
          border-color: #4e9ff0;
          box-shadow: 0 0 .05rem #a3cffb;
        }
      }
    } // end input-item

    .row-label {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .label {
        background: #fff;
        padding: 0 .1rem;
        height: .2rem;
        font-size: 12px;
        border-radius: .2rem;
        display: flex;
        align-items: center;
        box-shadow: .02rem .02rem .05rem #ccc;
        margin-right: .1rem;
        margin-bottom: .1rem;

        &:active {
          opacity: .8;
        }

        .icon-close {
          display: none;
          margin-left: .05rem;
          color: #fff;
          font-size: .08rem;
          font-weight: 700;
        }

        &.actived {
          background: $color-blue;
          color: #fff;

          .icon-close {
            display: block;
          }
        }
      }
    }
  } // end form
}
</style>