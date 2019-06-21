<!-- 客户洽谈 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      客户洽谈
    </div>
    <div class="header-right" slot="header-right">
      <i class="iconfont icon-edit" v-show="!isEdit" @click="onToggleEdit()"></i>
      <i class="iconfont icon-save" v-show="isEdit" @click="onToggleEdit()"></i>
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <div class="customer-chat">
      <!-- 客户信息 -->
      <div class="customre-item w-underline" @click.stop="onChangeCustomer()">
        <i class="iconfont icon-kehu"></i>
        <div class="detail" v-if="!customer || !customer.id">
          请先选择客户
        </div>
        <div class="detail" v-else>
          <p class="title">
            {{customer.name}}&nbsp;&nbsp;
            <span>{{customer.phone}}</span>
          </p>
          <div class="location">
            <i class="iconfont icon-location"></i>
            {{customer.address}}
          </div>
        </div>
        <i class="iconfont icon-exchange-user"></i>
      </div>
      <!-- 客户信息 end -->

      <!-- 交谈内容 -->
      <div class="chat-content">
        <div class="title">
          洽谈内容
          <!-- <i class="iconfont icon-edit" v-show="!isEdit" @click="onToggleEdit()"></i>
          <i class="iconfont icon-save" v-show="isEdit" @click="onToggleEdit()"></i> -->
        </div>

        <div class="content" v-show="!isEdit">
          <div v-for="(item, index) in dataList" :key="index">
            <p class="question">
              {{index + 1}}. {{item.title}}
            </p>
            <p class="answer">
              {{item.answerText}}
            </p>
            <!-- <cube-select
              :title="item.title"
              class="answer"
              :disabled="!isEdit"
              v-model="item.answer"
              :options="item.answerList">
            </cube-select> -->
          </div>

          <p class="question">
            {{dataList.length + 1}}. 其他
          </p>
          <p class="answer">
            {{desc}}
            <!-- <cube-textarea v-model="desc" :maxlength="500" placeholder="请输入内容..." :auto-expand="true"></cube-textarea> -->
          </p>
        </div>

        <div class="content" v-show="isEdit">
          <div v-for="(item, index) in dataList" :key="index">
            <p class="question">
              {{index + 1}}. {{item.title}}
            </p>
            <p class="answer edit-answer">
              <!-- <input type="text" v-model="item.answer"> -->
              <!-- <cube-textarea v-model="item.answer" :maxlength="500" placeholder="请输入内容..." :auto-expand="true"></cube-textarea> -->
              <cube-select
                :title="item.title"
                :disabled="!isEdit"
                v-model="item.answer"
                style="width: 100%;"
                :options="item.answerList">
              </cube-select>
            </p>
          </div>
          <p class="question">
            {{dataList.length + 1}}. 其他
          </p>
          <p class="answer edit-answer">
            <cube-textarea v-model="desc" :maxlength="500" placeholder="请输入内容..." :auto-expand="true"></cube-textarea>
          </p>
        </div>
      </div>
      <!-- 交谈内容 end -->
    </div>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import service from '@/services/common.service';

export default {
  data() {
    return {
      dataList: [],
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'chat' }), // 获取当前路由
      isEdit: false,
      desc: '',
    };
  },
  created() {},
  mounted() {
    if (!this.customer.id) return;
    this.getData();
  },
  watch: {
    '$route'(to) {
      if (to.path !== this.routePath) return;
      // 重新进入
      if (!this.customer.id) return;
      this.getData();
    },
  },
  computed: {
    ...mapGetters('customer', {
      customer: 'selectCustomer',
    }),
  },
  components: {
  },
  methods: {
    // 切换用户
    onChangeCustomer() {
      // 切换用户
      this.$router.push(`${this.routePath}/customers`);
    },
    async onToggleEdit() {
      if (!this.customer || !this.customer.id) {
        Utils.showToast('请先选择需要洽谈的客户');
        return;
      }
      if (this.isEdit) {
        // 编辑状态, 需要保持数据
        // 判断是否已经全部选择
        const questionList = [];
        let isOk = true;
        for (let i = 0; i < this.dataList.length; i++) {
          const item = this.dataList[i];
          questionList.push({
            qid: item.id,
            aid: item.answer,
          });
          if (!item.answer) {
            isOk = false;
            Utils.showToast(`请先选择${item.title}`);
            break;
          }
        }
        if (!isOk) return;
        const params = {
          clientId: this.customer.id,
          questionList: JSON.stringify(questionList),
          otherDesc: this.desc,
        };
        Utils.showLoading();
        const result = await service.commitAnswer(params);
        if (!result) return;
        Utils.hideLoading();
        Utils.showToast('更新洽谈内容成功');
        // 更新数据
        this.dataList.forEach((item) => {
          item.answerList.forEach((answer) => {
            if (answer.value === item.answer) {
              item.answerText = answer.text;
            }
          });
        });
      }
      this.isEdit = !this.isEdit;
    },
    async getData() {
      Utils.showLoading();
      const result = await service.getQuestionList({ clientId: this.customer.id });
      if (!result) return;
      Utils.hideLoading();
      // 处理问题列表
      this.desc = result.otherDesc || '';
      this.dataList = [];
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
        this.dataList.push({
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

.customer-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.header-right {
  .iconfont {
    width: .4rem;
    height: .4rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    font-size: .2rem;

    &:active {
      background: #f5f5f5;
    }
  }

  .icon-save {
    color: $color-green;
  }
}


.customre-item {
  display: flex;
  align-items: center;
  padding: .1rem .12rem;
  width: 95%;
  margin: 0 auto;
  margin-top: .1rem;
  background: #fff;
  box-shadow: 0 0 .05rem #ccc;
  border-radius: .05rem;

  .icon-kehu {
    color: $color-blue;
    font-size: .2rem;
  }

  .detail {
    flex: 1;
    overflow: hidden;
    padding: .1rem;

    .title {
      margin-bottom: .05rem;
      span {
        color: $color-grey;
        font-size: .13rem;
      }
    }

    .location {
      @include break-word;
      line-height: .16rem;
    }
  }

  .icon-exchange-user {
    // color: $color-grey;
    font-size: .2rem;
  }
} // end customer-item

.chat-content {
  flex: 1;
  background: #fff;
  width: 95%;
  margin: 0 auto;
  margin-top: .1rem;
  border-radius: .05rem;
  box-shadow: 0 0 .05rem #ccc;
  padding: 0 .1rem;
  display: flex;
  flex-direction: column;

  .title {
    text-align: center;
    height: .4rem;
    line-height: .4rem;
    position: relative;
    font-size: .16rem;
    color: $color-blue;
    border-bottom: 1px solid $color-line;
  } // end title

  .content {
    // overflow-y: auto;
    // overflow-x: hidden;
    @include break-word;
    padding-top: .15rem;

    .question {
      font-size: .15rem;
      margin-bottom: .05rem;
      @include break-word;
      display: flex;
      align-items: center;

      input {
        flex: 1;
        border: 1px solid $color-line;
        height: .3rem;
        padding: 0 .05rem;
        margin-left: .05rem;
        border-radius: .05rem;
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
        border-radius: .05rem;
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
    border-radius: .05rem;
    font-size: .14rem;
    line-height: .18rem;
    height: .3rem;
    color: #333;

    textarea {
      flex: 1;
      color: #333;
    }
  }

  .cube-textarea_expanded {
    height: 1.2rem;
  }
}
</style>