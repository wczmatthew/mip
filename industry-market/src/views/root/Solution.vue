<!-- 解决方案 -->
<template lang='html'>
  <div class="solution-container">
    <div class="bg">
      <img src="~@/assets/common/solution-bg.jpg" alt="">

      <div class="icon1" @click.stop="toProductList('NM8S')"></div>
      <div class="icon2" @click.stop="toProductList('ExCT触摸屏')"></div>
      <div class="icon3" @click.stop="toProductList('NJYB3')"></div>
      <div class="icon4" @click.stop="toProductList('NKY1')"></div>
      <div class="icon5" @click.stop="toProductList('NEL7-2')"></div>
      <div class="icon6" @click.stop="toProductList('NM8S')"></div>
      <div class="icon7" @click.stop="toProductList('NM8S')"></div>
      <div class="icon8" @click.stop="toProductList('NM8S')"></div>
      <div class="icon9" @click.stop="toProductList('NJX2')"></div>
      <div class="icon10" @click.stop="toProductList('NP8')"></div>
      <div class="icon11" @click.stop="toProductList('NP8')"></div>
      <div class="icon12" @click.stop="toProductList('NP8')"></div>
      <div class="icon13" @click.stop="toProductList('NS2')"></div>
      <div class="icon14" @click.stop="toProductList('NKB8')"></div>
      <div class="icon15" @click.stop="toProductList('NVF5-G5')"></div>
      <div class="icon16" @click.stop="toProductList('NB1')"></div>
      <div class="icon17" @click.stop="toProductList('NJR2')"></div>
      <div class="icon18" @click.stop="toProductList('NS2')"></div>
      <div class="icon19" @click.stop="toProductList('NC8')"></div>
      <div class="icon20" @click.stop="toProductList('NC8')"></div>
      <div class="icon21" @click.stop="toProductList('NC8')"></div>
      <div class="icon22" @click.stop="toProductList('NR8')"></div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {
    toProductList(keywords) {
      this.$store.commit('product/updateKeywords', keywords);
      this.$router.push('/market/productList?isBack=1');
    },
  },
};
</script>
<style lang="scss" scoped>
.solution-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;

  .bg {
    max-height: 100%;
    position: relative;
    display: flex;

    img {
      width: 100%;
      max-height: 100%;
      display: block;
    }
  }

  .icon1 { // NM8S
    position: absolute;
    left: 7%;
    top: 40%;
    width: 8%;
    height: 19%;
  }

  .icon2 { // ExCT触摸屏
    position: absolute;
    left: 5%;
    bottom: 5%;
    width: 12%;
    height: 17%;
  }

  .icon3 { // NJYB3
    position: absolute;
    left: 14%;
    top: 26%;
    width: 10%;
    height: 10%;
  }

  .icon4 { // NKY1
    position: absolute;
    left: 18.5%;
    top: 56%;
    width: 6%;
    height: 13%;
  }

  .icon5 { // NEL7-2
    position: absolute;
    left: 18%;
    bottom: 5%;
    width: 12%;
    height: 12%;
  }

  .icon6 { // NM8S - 第三列
    position: absolute;
    left: 32%;
    top: 15%;
    width: 8%;
    height: 19%;
  }

  .icon7 { // NM8S - 第三列
    position: absolute;
    left: 32%;
    top: 40%;
    width: 8%;
    height: 19%;
  }

  .icon8 { // NM8S - 第三列
    position: absolute;
    left: 32%;
    top: 67%;
    width: 8%;
    height: 19%;
  }

  .icon9 { // NJX2
    position: absolute;
    left: 32%;
    bottom: 5%;
    width: 13%;
    height: 6%;
  }

  .icon10 { // NP8
    position: absolute;
    left: 47%;
    top: 17%;
    width: 5%;
    height: 13%;
  }

  .icon11 { // NP8
    position: absolute;
    left: 47%;
    top: 43%;
    width: 5%;
    height: 13%;
  }

  .icon12 { // NP8
    position: absolute;
    left: 47%;
    top: 71%;
    width: 5%;
    height: 13%;
  }

  .icon13 { // NS2
    position: absolute;
    left: 57%;
    top: 8%;
    width: 5%;
    height: 12%;
  }

  .icon14 { // NKB8
    position: absolute;
    left: 57%;
    top: 22%;
    width: 5%;
    height: 15%;
  }

  .icon15 { // NVF5-G5
    position: absolute;
    left: 58%;
    top: 48%;
    width: 6%;
    height: 13%;
  }

  .icon16 { // NB1
    position: absolute;
    left: 56%;
    top: 63%;
    width: 5%;
    height: 13%;
  }

  .icon17 { // NJR2
    position: absolute;
    left: 56%;
    bottom: 7%;
    width: 5%;
    height: 15%;
  }

  .icon18 { // NS2
    position: absolute;
    left: 66%;
    top: 35%;
    width: 5%;
    height: 12%;
  }

  .icon19 { // NC8
    position: absolute;
    left: 66%;
    top: 62%;
    width: 5%;
    height: 12%;
  }

  .icon20 { // NC8 - 最后一列
    position: absolute;
    left: 74%;
    top: 9%;
    width: 5%;
    height: 11%;
  }

  .icon21 { // NC8 - 最后一列
    position: absolute;
    left: 75%;
    top: 34%;
    width: 5%;
    height: 12%;
  }

  .icon22 { // NC8 - 最后一列
    position: absolute;
    left: 74%;
    top: 63%;
    width: 6%;
    height: 11%;
  }
}
</style>