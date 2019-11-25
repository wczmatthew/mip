<!-- 留言 -->
<template lang='html'>
  <w-container show-header show-back show-footer>
    <!-- 顶部栏 -->
    <template #header-mid>
      留言
    </template>
    <template #header-right>
      <div class="header-right">
      </div>
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <w-scroll
      ref="scroll"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">

      <!-- 列表 -->
      <no-data v-if="noData"></no-data>
      <w-loading-row v-if="isFirstLoading"></w-loading-row>

      <div style="height: .1rem;"></div>

      <div class="feedback-card" v-for="(item, index) in dataList" :key="index" @click="toDetail(item)">
        <div class="row1 w-underline">
          <span class="name">
            {{ item.acceptPerson }}
          </span>
          <span class="status">
            {{ item.finnishFlagName }}
          </span>
        </div>
        <div class="title">
          {{ item.problemTitle }}
        </div>
        <div class="content">
          {{ item.problem }}
        </div>
      </div>
      <!-- 列表 end -->

    </w-scroll>
    <!-- 正文内容 end -->
    <button slot="w-footer" class="bottom-btn gradient-blue-btn" @click="onContact()">
      新增留言
    </button>
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import service from '@/services/user.service';

export default {
  data() {
    return {
      pageNum: 1,
      noData: false,
      dataList: [],
      hasNext: false,
      isFirstLoading: true,
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'feedback' }), // 获取当前路由
    };
  },
  created() {},
  mounted() {
    // Utils.showLoading();
    this.onPullingDown();
  },
  computed: {
    ...mapGetters('user', {
      userData: 'userData',
    }),
  },
  components: {},
  methods: {
    onContact() {
      this.$router.push(`${this.routePath}/createFeedback`);
    },
    toDetail(item) {
      this.$store.commit('user/updateFeedback', item);
      this.$router.push(`${this.routePath}/detail`);
    },
    // 下拉刷新
    onPullingDown() {
      this.pageNum = 1;
      this.isFirstLoading = true;
      this.$refs.scroll && this.$refs.scroll.scrollTop();
      this.getData();
    },
    // 上拉加载
    onPullingUp() {
      if (!this.hasNext) {
        // 没有数据
        this.$refs.scroll.forceUpdate(true);
        return;
      }
      this.getData();
    },
    async getData() {
      // Utils.showLoading();
      const params = { pageNo: this.pageNum, loginName: this.userData.loginName };
      const result = await service.getFeedbackList(params);
      this.isFirstLoading = false;
      if (!result) {
        this.noData = !this.dataList.length;
        return;
      }

      if (this.pageNum === 1) {
        // 第一页
        this.dataList = result.result || [];
      } else {
        this.dataList = this.dataList.concat([...result.result]);
      }

      this.noData = !this.dataList.length;
      this.hasNext = result.hasNext;
      if (this.hasNext) {
        this.pageNum += 1;
      }
      this.$nextTick(() => {
        this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';
.feedback-card {
  width: 96%;
  margin: 0 auto .1rem;
  background: #fff;
  box-shadow: 0 0 5px #ccc;
  padding: 0 $spacing-lr;
  border-radius: .05rem;
  padding-bottom: .1rem;

  .row1 {
    display: flex;
    justify-content: space-between;
    @include text-ellipsis;
    padding: .1rem 0;

    .status {
      color: $color-blue;
    }
  }

  .title {
    padding: .1rem 0;
  }

  .content {
    @include text-overflow-muli(2);
  }
}
</style>