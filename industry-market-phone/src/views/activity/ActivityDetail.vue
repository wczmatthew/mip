<!-- 活动详情 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      活动详情
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <p class="activity-title">
      {{title}}
    </p>
    <p class="desc">
      发布人: {{creator}}
    </p>
    <p class="desc" style="font-size: 10px;">
      {{date}}
    </p>
    <div class="news-detail" v-html="detail"></div>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import service from '@/services/common.service';

export default {
  data() {
    return {
      title: '',
      creator: '',
      date: '',
      detail: '',
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  components: {},
  methods: {
    async getData() {
      Utils.showLoading();
      const result = await service.getActivityItem({ postId: this.$route.query.id });
      if (!result) return;
      Utils.hideLoading();
      this.title = result.title;
      this.creator = result.creatorName;
      this.date = `${Utils.dateFormat(new Date(result.createTime))} ~ ${Utils.dateFormat(new Date(result.activityEndTime))}`;
      this.detail = result.memo;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.activity-title {
  font-size: .16rem;
  font-weight: 700;
  line-height: .18rem;
  @include break-word;
  margin-bottom: .05rem;
  text-align: center;
  padding: .1rem .12rem;
}

.desc {
  font-size:  12px;
  color: $color-grey;
  margin-bottom: .1rem;
  text-align: center;

  span:first-child() {
    margin-right: .2rem;
  }
}
.news-detail {
  padding: 0 .12rem;
  img {
    display: block;
    width: 100%;
  }
}
</style>