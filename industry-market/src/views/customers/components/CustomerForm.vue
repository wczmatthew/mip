<!-- 客户信息表单 -->
<template lang='html'>
  <div class="customer-form">
    <form class="form">
      <div class="row">
        <div class="input-item col">
          <p>姓名</p>
          <input type="text" placeholder="请输入姓名">
        </div>
        <div class="input-item col">
          <p>手机号</p>
          <input type="text" placeholder="请输入手机号码">
        </div>
      </div>

      <div class="input-item">
        <p>通讯地址</p>
        <input type="text" placeholder="请输入通讯地址">
      </div>

      <div class="input-item col">
        <p>所属公司</p>
        <input type="text" placeholder="请输入所属公司">
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
          <!-- <select name="">
            <option value="1">职务1</option>
            <option value="2">职务2</option>
            <option value="3">职务3</option>
          </select> -->
        </div>

        <div class="input-item col">
          <p>销售区域</p>
          <cube-select
            class="select"
            placeholder="请选择销售区域"
            v-model="area"
            :options="areaOptions">
          </cube-select>
          <!-- <select name="">
            <option value="1">区域1</option>
            <option value="2">区域2</option>
            <option value="3">区域3</option>
          </select> -->
        </div>
      </div>

      <div class="input-item">
        <p>所属行业</p>
        <div class="row-label">
          <div class="label">
            行业1
            <i class="iconfont icon-close"></i>
          </div>
          <div class="label actived">
            行业1
            <i class="iconfont icon-close"></i>
          </div>
        </div>
      </div>

    </form>
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      duty: '',
      dutyOptions: [
        { text: '职务1', value: '1' },
        { text: '职务2', value: '2' },
      ],
      area: '',
      areaOptions: [
        { text: '区域1', value: '1' },
        { text: '区域2', value: '2' },
      ],
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {},
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
    padding-bottom: .4rem;

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
        height: .3rem;
        display: block;
        border: .01rem solid $color-line;
        border-radius: .05rem;
        padding-left: .08rem;
        font-size: .14rem;

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
        height: .25rem;
        font-size: .12rem;
        border-radius: .25rem;
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