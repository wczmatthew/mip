<!-- 底部栏 -->
<template lang='html'>
  <div class="w-footer w-tabbar">
    <div class="item" v-for="(item, index) in tablist" :key="index"
    :class="{'actived': $route.path == item.url}"
    @click="onChangeTab(index, item)">
      <template v-if="item.url == '/market/home'">
        <div class="tab-icon" v-if="$route.path == item.url">
          <img src="~@/assets/common/c.png" alt="" class="">
        </div>
        <i class="iconfont" :class="[item.icon]" v-if="$route.path != '/market/home'"></i>
        <p v-if="$route.path != '/market/home'">{{item.title}}</p>
      </template>
      <template v-else>
        <i class="iconfont" :class="[item.icon]">
          <i class="num" v-if="item.url == '/market/cartTab' && cartNum > 0">{{cartNum}}</i>
        </i>
        <p>{{item.title}}</p>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import service from '@/services/common.service';
// import { USER_ROLE } from '@/common/Constants';

export default {
  data() {
    return {
      tablist: [
        {
          title: '首页',
          icon: 'icon-shouye',
          url: '/market/home',
          doubleRefresh: true,
        },
        { title: '分类', icon: 'icon-cgdh', url: '/market/categoryTab' },
        // { title: '分析', icon: 'icon-fenxi', url: '/market/analyzeTab' },
        {
          title: '发现',
          icon: 'icon-faxian1',
          url: '/market/activity',
          doubleRefresh: true,
        },
        { title: '购物单', icon: 'icon-gouwuche', url: '/market/cartTab' },
        { title: '我的', icon: 'icon-my', url: '/market/my' },
      ],
      initTabList: [],
      clickNum: 0,
      refreshViewsPath: [],
    };
  },
  created() {},
  mounted() {
    this.initTabList = this.tablist;
    this.getTabbar();
  },
  computed: {
    ...mapGetters('user', {
      cartNum: 'cartNum',
      userId: 'userId',
      role: 'role',
      refreshAllTab: 'refreshAllTab',
    }),
  },
  watch: {
    refreshAllTab() {
      if (this.refreshAllTab) {
        this.refreshViewsPath = this.initTabList.map(item => item.url);
      }
    },
  },
  components: {},
  methods: {
    async getTabbar() {
      const result = await service.getNavigationList({ userid: Utils.getUserId(this) });
      if (!result) return;
      if (result.navigation && result.navigation.length) {
        this.tablist = [];
        result.navigation.forEach((item) => {
          const tabs = this.initTabList.filter(tab => tab.url === item.url);
          this.tablist.push({
            title: item.title,
            icon: tabs && tabs.length ? tabs[0].icon : 'icon-fenxi',
            url: item.url,
            doubleRefresh: true,
          });
        });
      }
    },
    onChangeTab(index, item) {
      // 判断是否是双击
      this.clickNum += 1;
      if (this.clickNum > 1) {
        this.refreshViews();
        return;
      }

      this.timer = setTimeout(() => {
        this.clickNum = 0;
      }, 300);

      if (this.$route.path === item.url) {
        // 滚动到顶部
        return;
      }

      this.$router.push(item.url);

      setTimeout(() => {
        // 等待转场动画结束后请求接口
        this.checkRefresh();
      }, 300);
      // console.log(document.URL);
    },
    // 绑定手机号码后需要刷新界面: 检查是否需要更新
    checkRefresh() {
      if (!this.refreshViewsPath.length) return;
      if (this.refreshViewsPath.includes(this.$route.path)) {
        // 当前页面需要刷新
        this.refreshViews();
        this.refreshViewsPath = this.refreshViewsPath.filter(item => item !== this.$route.path);

        if (!this.refreshViewsPath.length) {
          // 全部刷新完毕
          this.$store.commit('user/updateRefreshAllTab', false);
        }
      }
    },
    refreshViews() {
      this.clickNum = 0;
      this.$store.commit('user/updateRefreshView', this.$route.path);
    },
  },
};
</script>
<style lang="scss" scoped>
.w-tabbar {
  background: #fff;
  overflow: visible;

  .tab-icon {
    width: .3rem;
    height: .3rem;
    background: $color-default;
    box-shadow: 0 0 5px $color-default;
    margin: .03rem auto;
    border-radius: .3rem;
    overflow: hidden;
    @include flex-center;

    img {
      width: auto;
      height: 58%;
      margin: 0;
    }
  }

  .item {
    .iconfont {
      position: relative;

      .num {
        background: $color-red;
        color: #fff;
        min-width: .15rem;
        height: .15rem;
        line-height: .15rem;
        border-radius: .15rem;
        position: absolute;
        top: -.02rem;
        left: 58%;
        font-size: 10px;
        z-index: 10;
        padding: 0 .02rem;
      }
    }
  }
}
</style>