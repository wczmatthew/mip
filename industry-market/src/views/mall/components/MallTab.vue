<!-- 商品页面 tabbar -->
<template lang='html'>
  <div class="w-tabbar sticky-header">
    <div class="item" v-for="(item, index) in tabList" :key="index" @click="toggle()">
      {{ item.selectTxt || item.title }}
    </div>

    <!-- 展开内容 -->
    <div class="list-bg" v-show="isShow" @click="hide()"></div>
    <div class="popup-down" v-show="isShow">
      <div class="left">
        <div class="left-item" v-for="(item, index) in menuList" :key="index"
        :class="{'actived': menuIndex == index}">
          {{ item.title }}
        </div>
      </div>
      <div class="right">
        <div class="list">
          <div class="right-item" v-for="(item, index) in detailList" :key="'detail'+index" :class="{'actived': detailIndex == index}"
          @click="onSelect(item)">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <!-- 展开内容 end -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuIndex: 0, // 选中的菜单下标
      detailIndex: 0, // 选中的详情下标
      isShow: false,
      menuList: [
        { title: '电容器', id: '1' },
        { title: '接触器', id: '2' },
      ],
      detailList: [
        { title: 'AZMJ-滤波' },
        { title: 'BAFB智能' },
        { title: 'JKF8控制器' },
        { title: 'BZMJ' },
        { title: 'BKMJ' },
        { title: 'BAGB智能' },
      ],
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {
    show(selectIndex) {
      if (selectIndex != undefined) {
        this.detailIndex = selectIndex;
      }
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
    toggle() {
      this.isShow = !this.isShow;
    },
    // 选择具体内容
    onSelect(item) {
      this.hide();
      this.$emit('select', item);
    },
  },
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.w-tabbar {
  background: #fff;
  border: 0;
  position: relative;

  .item {
    color: $color-black;
    line-height: .44rem;
    font-size: .12rem;
    position: relative;
    z-index: 12;
  }
}

.list-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
}

.popup-down {
  position: absolute;
  top: .48rem;
  left: 1%;
  z-index: 20;
  width: 98%;
  height: 45vh;
  background: #f1f1f1;
  display: flex;
  border-radius: .1rem;
  overflow: hidden;
  box-shadow: 0 0 .05rem #ccc;

  .left {
    width: 30%;
    background: #fff;
    flex-shrink: 0;
    padding: .1rem 0;
    height: 100%;
    overflow: auto;

    .left-item {
      height: .4rem;
      line-height: .4rem;
      text-align: center;
      color: $default-color;
      overflow: hidden;

      &.actived {
        color: #fff;
        background: $default-color;
      }
    }
  }

  .right {
    flex: 1;
    overflow: auto;
    padding-left: .1rem;

    .list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: .1rem 0;
    }

    .right-item {
      color: $default-color;
      padding: .1rem .07rem;
      background: #fff;
      border-radius: .05rem;
      margin-right: .1rem;
      margin-bottom: .1rem;

      &.actived {
        color: #fff;
        background: $default-color;
      }
    }
  }
}
</style>