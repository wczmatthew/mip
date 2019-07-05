<!-- 客户信息表单 -->
<template lang='html'>
  <div class="customer-update">
    <form class="customer-form">
      <div class="row">
        <div class="input-item col">
          <p>姓名</p>
          <div class="input">
            <input type="text" placeholder="请输入姓名" v-model="name" maxlength="20" @focus="onFocusName()" @blur="onBlurName()" ref="nameInput">
            <i class="iconfont icon-circle-add" v-show="isShowClear" @click.stop="onClearName()"></i>
          </div>
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

      <div class="input-item" style="margin-bottom: 0;">
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

    <div class="chat-form chat-content">
      <div class="title">
        洽谈内容
      </div>

      <div class="content">
        <div v-for="(item, index) in questionList" :key="index">
          <p class="question">
            {{index + 1}}. {{item.title}}
          </p>
          <p class="answer edit-answer">
            <!-- <input type="text" v-model="item.answer"> -->
            <!-- <cube-textarea v-model="item.answer" :maxlength="500" placeholder="请输入内容..." :auto-expand="true"></cube-textarea> -->
            <cube-select
              :title="item.title"
              v-model="item.answer"
              style="width: 100%;"
              :options="item.answerList">
            </cube-select>
          </p>
        </div>
        <p class="question">
          {{questionList.length + 1}}. 其他
        </p>
        <p class="answer edit-answer">
          <cube-textarea v-model="desc" :maxlength="500" placeholder="请输入内容..." :auto-expand="true"></cube-textarea>
        </p>
      </div>
    </div>

    <slot></slot>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import service from '@/services/common.service';

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
      questionList: [],
      desc: '',
      tempName: '', // 临时客户名称
      isTemp: 0,
      isShowClear: false,
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
    onClearName() {
      if (!this.name) return;
      this.name = '';
      this.$refs.nameInput && this.$refs.nameInput.focus();
    },
    onFocusName() {
      setTimeout(() => {
        this.isShowClear = true;
      }, 100);
      if (this.isTemp !== 1) return;
      // 临时客户, 判断是否有填写过内容
      if (this.name !== this.tempName) return;
      this.name = '';
    },
    onBlurName() {
      setTimeout(() => {
        this.isShowClear = false;
      }, 100);
      if (this.isTemp !== 1) return;
      // 临时客户, 判断是否有填写过内容
      if (this.name) return;
      this.name = this.tempName;
    },
    onSelectIndustry(item) {
      if (item.value === this.selectIndustry.value) {
        this.selectIndustry = { text: '', value: '' };
        return;
      }

      this.selectIndustry = item;
    },
    // 更新客户名片上的内容
    updateCustomerCardMsg(resultList) {
      if (!resultList || !resultList.length) return;
      this.name = '';
      this.phone = '';
      this.address = '';
      this.company = '';
      resultList.forEach((res) => {
        if (res.item.indexOf('姓名') > -1) {
          this.name = res.value;
        }

        if (res.item.indexOf('手机') > -1) {
          this.phone = res.value;
        }

        if (res.item.indexOf('地址') > -1) {
          this.address = res.value;
        }

        if (!this.company && res.item.indexOf('公司') > -1) {
          this.company = res.value;
        }
      });

      if (!this.phone) {
        // 没有获取到手机, 查找是否有电话
        resultList.forEach((res) => {
          if (res.item === '电话') {
            this.phone = res.value;
          }
        });
      }
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
      this.getQuestions();
      this.isTemp = Number(customer.isTemp);
      if (this.isTemp === 1) {
        // 临时客户
        this.tempName = this.name;
      }
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
      const questionList = [];
      for (let i = 0; i < this.questionList.length; i++) {
        const item = this.questionList[i];
        questionList.push({
          qid: item.id,
          aid: item.answer,
        });
      }

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
        questionList: JSON.stringify(questionList),
        otherDesc: this.desc,
      };
    },
    async getQuestions() {
      Utils.showLoading();
      let result;
      if (!this.customerId) {
        // 新增客户
        result = await service.getQuestionListNoAnswer();
      } else {
        // 编辑客户
        result = await service.getQuestionList({ clientId: this.customerId });
      }
      if (!result) return;
      Utils.hideLoading();
      // 处理问题列表
      this.desc = result.otherDesc || '';
      this.questionList = [];
      result.questionList.forEach((item) => {
        const answerList = [];
        let answerValue = '';
        let answerText = '';
        item.answerList.forEach((answer) => {
          answerList.push({
            value: answer.id,
            text: answer.title,
          });
          if (parseInt(answer.selected, 10) === 1) {
            answerValue = answer.id;
            answerText = answer.title;
          }
        });
        this.questionList.push({
          title: item.title,
          id: item.id,
          answer: answerValue,
          answerText: answerText,
          answerList,
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.customer-update {
  display: flex;
  height: 100%;
  overflow: hidden;
  padding-top: .1rem;
}

.customer-form {
  flex: 1;
  height: 100%;
  overflow: auto;
  margin-left: 2%;
  background: #fff;
  box-shadow: 0 0 .05rem #ccc;
  border-top-left-radius: .05rem;
  border-top-right-radius: .05rem;
  padding: .1rem;
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
      margin-bottom: .05rem;
      font-size: 14px;
    }

    input,
    .select {
      width: 100%;
      height: .22rem;
      display: block;
      // border: 1px solid $color-line;
      border-radius: .03rem;
      padding-left: .08rem;
      font-size: 14px;
      border: 0;
      background: #f5f5f5;

      &:focus {
        border-color: #4e9ff0;
        box-shadow: 0 0 .02rem #a3cffb;
      }
    }

    .input {
      display: flex;
      height: .22rem;
      border-radius: .03rem;
      font-size: 14px;
      border: 0;
      background: #f5f5f5;
      position: relative;

      input {
        width: 100%;
        display: block;
        padding-right: .2rem;
      }

      .iconfont {
        width: .15rem;
        line-height: .22rem;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 16px;
        @include flex-center;
        overflow: hidden;

        &::before {
          transform: rotate(45deg);
          display: block;
        }
      }
    }
  } // end input-item

  .row-label {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .label {
      background: #f5f5f5;
      padding: 0 .1rem;
      height: .17rem;
      font-size: 12px;
      border-radius: .2rem;
      display: flex;
      align-items: center;
      box-shadow: .015rem .015rem .03rem #ccc;
      margin-right: .1rem;
      margin-bottom: .08rem;

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
} // customer-form

.chat-form {
  flex: 1;
  height: 100%;
  overflow: auto;
  margin: 0 2%;
  background: #fff;
  box-shadow: 0 0 .05rem #ccc;
  border-top-left-radius: .05rem;
  border-top-right-radius: .05rem;
  padding: .1rem;
  padding-bottom: .3rem;
  padding-top: 0;
}

.chat-content {
  // flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;

  .title {
    text-align: center;
    height: .25rem;
    line-height: .25rem;
    position: relative;
    font-size: 16px;
    border-bottom: 1px solid $color-line;
  } // end title

  .content {
    // overflow-y: auto;
    // overflow-x: hidden;
    @include break-word;
    padding-top: .15rem;

    .question {
      font-size: 15px;
      margin-bottom: .05rem;
      @include break-word;
      display: flex;
      align-items: center;

      input {
        flex: 1;
        // border: 1px solid $color-line;
        height: .3rem;
        padding: 0 .05rem;
        margin-left: .05rem;
        border-radius: .03rem;
        border: 0;
        background: #f5f5f5;
      }
    }

    .answer {
      color: $color-grey;
      margin-bottom: .05rem;
      @include break-word;
      line-height: .18rem;
      width: 100%;
      margin-bottom: .1rem;
      text-indent: .15rem;
    } // end answer

    .edit-answer {
      text-indent: 0;
      width: 100%;
      display: flex;

      input {
        flex: 1;
        display: block;
        border: 1px solid $color-line;
        height: .3rem;
        padding: 0 .05rem;
        margin-left: .17rem;
        border-radius: .03rem;
      }
    }
  }
} // end chat-content
</style>

<style lang="scss">
.edit-answer {
  .cube-textarea-wrapper {
    width: 100%;
    display: flex;
    border: 1px solid #e2e2e2;
    border-radius: .03rem;
    font-size: 14px;
    line-height: .18rem;
    height: .3rem;
    color: #333;
    background: #f5f5f5;
    border: 0;

    textarea {
      flex: 1;
      color: #333;
      background: #f5f5f5;
      border: 0;
      border-radius: .03rem;
    }
  }

  .cube-textarea_expanded {
    height: .8rem;
  }

  .cube-select {
    background: #f5f5f5;
    border: 0;
    border-radius: .03rem;

    &::after {
      display: none;
    }
  }
}
</style>