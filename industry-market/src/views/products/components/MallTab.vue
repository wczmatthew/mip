<!-- 商品页面 tabbar -->
<template lang='html'>
  <div class="w-tabbar sticky-header">
    <div class="item" v-for="(item, index) in list" :key="index" @click="toggle(index)" :class="{'actived': tabIndex == index, 'selected': checkTabSelected(item)}">
      <span>
        {{ item.selectTab ? (item.selectTab.name || item.sname) : item.sname }}
      </span>
      <i class="iconfont icon-arrow-down" v-if="item.childList && item.childList.length"></i>
    </div>

    <!-- 展开内容 -->
    <div class="list-bg" v-show="isShow" @click="hide()"></div>
    <div class="popup-down" v-show="isShow">
      <!-- <div class="left">
        <div class="left-item" v-for="(item, index) in menuList" :key="index"
        :class="{'actived': menuIndex == index}">
          {{ item.title }}
        </div>
      </div> -->
      <div class="list">
        <div class="right-item" v-for="(item, index) in categoryList" :key="'detail'+index" v-show="item.childList && item.childList.length">
          <p class="title">
            {{ item.sname }}
          </p>
          <div class="right-list">
            <div class="popup-item"
            @click.stop="onSelect(subItem, index, subIndex)"
            v-for="(subItem, subIndex) in item.childList"
            :key="index + subIndex"
            :class="{'actived': selectItem.value == subItem.sid}">
              {{ subItem.sname }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 展开内容 end -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      tabIndex: -1,
      selectItem: {}, // 选中的详情
      isShow: false,
      list: [],
      categoryList: [],
    };
  },
  created() {},
  mounted() {
    this.list = [
      { sname: '全部' },
      ...this.sortList,
    ];
  },
  computed: {
    ...mapGetters('category', {
      sortList: 'sortList',
    }),
  },
  components: {},
  methods: {
    checkTabSelected(item) {
      if (!item.selectTab) return false;
      return item.value === item.sid;
    },
    hide() {
      this.tabIndex = -1;
      this.isShow = false;
    },
    toggle(index) {
      if (this.tabIndex === index) {
        this.isShow = !this.isShow;
        this.tabIndex = -1;
        this.categoryList = [];
        return;
      }

      if (!this.isShow) this.isShow = true;
      this.tabIndex = index;
      this.categoryList = this.list[index].childList;

      // 设置选中
      this.selectItem = this.list[this.tabIndex].selectTab || {};
    },
    // 选择具体内容
    onSelect(item) {
      this.$emit('select', item);

      if (this.tabIndex !== -1) {
        const selectTab = { ...this.list[this.tabIndex].selectTab };
        this.list[this.tabIndex].selectTab = {
          name: selectTab.name === item.sname ? '' : item.sname,
          value: selectTab.value === item.sid ? '' : item.sid,
        };
        this.selectItem = { ...this.list[this.tabIndex].selectTab };
        // this.list[this.tabIndex].selectTxt = this.list[this.tabIndex].selectTxt === item.sname ? '' : item.sname;
        // this.list[this.tabIndex].selectValue = this.list[this.tabIndex].selectValue === item.sid ? '' : item.sid;
      }
      this.tabIndex = -1;
      this.hide();
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
  padding: 0 .05rem;

  .item {
    color: $color-black;
    line-height: .44rem;
    font-size: .11rem;
    position: relative;
    z-index: 12;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0 .05rem;

    span {
      @include text-ellipsis;
      flex: 1;
    }

    .iconfont {
      width: auto;
      height: auto;
      font-size: .1rem;
      margin: 0;
      margin-left: .05rem;
      flex-shrink: 0;
    }

    &.actived {
      border-radius: .4rem;
      box-shadow: 0 0 .05rem #ccc;
      height: .3rem;
      line-height: .3rem;
      color: $color-blue;
    }

    &.selected {
      color: $color-blue;
    }
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
  background: #fff;
  border-radius: .1rem;
  overflow: auto;
  box-shadow: 0 0 .05rem #ccc;

  .list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: .1rem;
  }

  .right-item {
    width: 100%;
    margin-bottom: .1rem;

    .title {
      font-size: .16rem;
      padding: .1rem 0;
    }

    .right-list {
      display: flex;
      flex-wrap: wrap;
    }

    .popup-item {
      color: $default-color;
      padding: .1rem .07rem;
      background: #fff;
      border-radius: .05rem;
      margin-right: .1rem;
      margin-bottom: .1rem;
      box-shadow: 0 0 .05rem #ccc;
      &.actived {
        color: #fff;
        background: $default-color;
      }
    } // end item

  } // ent right-item
}
</style>