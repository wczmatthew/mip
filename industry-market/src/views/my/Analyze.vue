<!-- 大数据分析 -->
<template lang='html'>
  <!-- <w-container show-header show-back> -->
    <!-- 顶部栏 -->
    <!-- <div slot="header-mid">
      大数据分析
    </div> -->
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <!-- 正文内容 end -->
  <!-- </w-container> -->

  <div>
    <!-- 实时数据 -->
    <div class="analyze-container analyze1">
      <div class="title-row">
        <span class="title">实时数据</span>
        <div class="time">
          <span>开始时间</span>
          <cube-button @click="showStartDatePicker">
            {{startDate | dateFormat('yyyy-MM-dd')}}
          </cube-button>
          <span>结束日期</span>
          <cube-button @click="showEndDatePicker">
            {{endDate | dateFormat('yyyy-MM-dd')}}
          </cube-button>
        </div>
        <span class="desc">
          更新时间 2019-07-08
        </span>
      </div>

      <!-- 数据 -->
      <div class="data-row">
        <div class="chart-container" id="dataChart"></div>

        <div class="other-container">
          <!-- 到店客户 -->
          <div class="data-item">
            <p>到店客户</p>
            <div class="data">
              <div class="icon yellow">
                <i class="iconfont icon-yonghu"></i>
              </div>
              <div class="detail">
                <div class="progress-row">
                  <div class="txt">
                    <span class="progress-title">
                      今日登陆
                    </span>
                    <span class="color-yellow">
                      15645
                    </span>
                  </div>
                  <div class="progress yellow">
                    <span class="yellow" style="width: 60%"></span>
                  </div>
                </div>

                <div class="progress-row">
                  <div class="txt">
                    <span class="progress-title">
                      昨日登录
                    </span>
                    <span>
                      14564
                    </span>
                  </div>
                  <div class="progress yellow">
                    <span class="yellow" style="width: 50%"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 到店客户 end -->

          <!-- 支付转化率 -->
          <div class="data-item">
            <p>支付转化率</p>
            <div class="data">
              <div class="icon red">
                <i class="iconfont icon-bingtu"></i>
              </div>
              <div class="detail">
                <div class="progress-row">
                  <div class="txt">
                    <span class="progress-title red">
                      今日转化率
                    </span>
                    <span class="color-red">
                      15645
                    </span>
                  </div>
                  <div class="progress red">
                    <span class="red" style="width: 60%"></span>
                  </div>
                </div>

                <div class="progress-row">
                  <div class="txt">
                    <span class="progress-title red">
                      昨日转化率
                    </span>
                    <span>
                      14564
                    </span>
                  </div>
                  <div class="progress red">
                    <span class="red" style="width: 50%"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 支付转化率 end -->

          <!-- 支付金额 -->
          <div class="data-item">
            <p>支付金额</p>
            <div class="data">
              <div class="icon blue">
                <i class="iconfont icon-money"></i>
              </div>
              <div class="detail">
                <div class="progress-row">
                  <div class="txt">
                    <span class="progress-title blue">
                      今日交易
                    </span>
                    <span class="color-blue">
                      15645
                    </span>
                  </div>
                  <div class="progress blue">
                    <span class="blue" style="width: 60%"></span>
                  </div>
                </div>

                <div class="progress-row">
                  <div class="txt">
                    <span class="progress-title blue">
                      昨日交易
                    </span>
                    <span>
                      14564
                    </span>
                  </div>
                  <div class="progress blue">
                    <span class="blue" style="width: 50%"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 支付金额 end -->

          <!-- 支付件数 -->
          <div class="data-item">
            <p>支付件数</p>
            <div class="data">
              <div class="icon green">
                <i class="iconfont icon-shopping-bag"></i>
              </div>
              <div class="detail">
                <div class="progress-row">
                  <div class="txt">
                    <span class="progress-title green">
                      今日件数
                    </span>
                    <span class="color-green">
                      15645
                    </span>
                  </div>
                  <div class="progress green">
                    <span class="green" style="width: 60%"></span>
                  </div>
                </div>

                <div class="progress-row">
                  <div class="txt">
                    <span class="progress-title green">
                      昨日件数
                    </span>
                    <span>
                      14564
                    </span>
                  </div>
                  <div class="progress green">
                    <span class="green" style="width: 50%"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 支付件数 end -->
        </div>
      </div>
      <!-- 数据 end -->

    </div>
    <!-- 实时数据 end -->

    <div class="analyze-flex">
      <!-- KPI -->
      <div class="analyze-container analyze2">
        <div class="title-row">
          <span class="title">KPI指标</span>
          <div class="time">
            <span>开始时间</span>
            <cube-button @click="showStartDatePicker">
              {{startDate | dateFormat('yyyy-MM-dd')}}
            </cube-button>
            <span>结束日期</span>
            <cube-button @click="showEndDatePicker">
              {{endDate | dateFormat('yyyy-MM-dd')}}
            </cube-button>
          </div>
        </div>

        <div class="data-row">
          <div class="grid-item" v-for="(item, index) in kpiList" :key="'kpi'+index">
            <p class="grid-title">
              {{item.title}}
            </p>
            <p>
              {{item.content}}
            </p>
          </div>
        </div>
      </div>
      <!-- KPI end -->

      <!-- 商品 -->
      <div class="analyze-container analyze3">
        <div class="title-row">
          <span class="title">实时商品成交榜</span>
          <div class="desc">
            查看更多>>
          </div>
        </div>

        <div class="data-row">
          <table colspace="0" cellspace="0">
            <thead>
              <tr>
                <th>排名</th>
                <th width="50%">商品名称</th>
                <th>成交数量</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in productList" :key="'pro'+index">
                <td>
                  {{index + 1}}
                </td>
                <td>
                  <div class="product-item">
                    <div class="img">
                      <w-img :src="item.imgPath"></w-img>
                    </div>
                    <div class="detail">
                      {{item.xhgg}}
                    </div>
                  </div>
                </td>
                <td>
                  {{item.num}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 商品 end -->
    </div>
  </div>
</template>
<script>
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      startDate: new Date(),
      endDate: new Date(),
      dataChart: null,
      dataChartOption: null,
      startDatePicker: null,
      endDatePicker: null,
      kpiList: [],
      productList: [],
    };
  },
  created() {},
  mounted() {
    this.kpiList = [
      { title: '支付金额', content: '12,980.00' },
      { title: '支付件数', content: '791,150' },
      { title: '客单价', content: '76.45' },
      { title: '支付买家数', content: '203,858' },
      { title: '进店人数', content: '12,980.00' },
      { title: '支付转化率', content: '791,150' },
      { title: '人均咨询件数', content: '76.45' },
      { title: '人均停留时长', content: '203,858' },
      { title: '新买家支付金额', content: '12,980.00' },
      { title: '支付新买家数', content: '791,150' },
    ];

    this.productList = [
      {
        imgPath: 'https://cbp.chint.com:8708/download/mkImg/series/DZ158-125.jpg',
        xhgg: '正泰NXB63A-2PXXXXX',
        num: 249,
      },
      {
        imgPath: 'https://cbp.chint.com:8708/download/mkImg/series/DZ158-125.jpg',
        xhgg: '2正泰NXB63A-2PXXXXX',
        num: 249,
      },
      {
        imgPath: 'https://cbp.chint.com:8708/download/mkImg/series/DZ158-125.jpg',
        xhgg: '3正泰NXB63A-2PXXXXX',
        num: 249,
      },
      {
        imgPath: 'https://cbp.chint.com:8708/download/mkImg/series/DZ158-125.jpg',
        xhgg: '4正泰NXB63A-2PXXXXX',
        num: 249,
      },
    ];
  },
  filters: {
    dateFormat: (val, fmt) => Utils.dateFormat(new Date(Number(val)), fmt),
  },
  components: {},
  methods: {
    // 显示开始时间选择器
    showStartDatePicker() {
      if (!this.startDatePicker) {
        this.startDatePicker = this.$createDatePicker({
          title: '开始时间',
          min: new Date(2008, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          onSelect: (date, selectedVal, selectedText) => {
            console.log('date: ', date);
            console.log('selectedVal: ', selectedVal);
            console.log('selectedText: ', selectedText);
          },
        });
      }

      this.startDatePicker.show();
    },
    // 结束时间选择器
    showEndDatePicker() {
      if (!this.endDatePicker) {
        this.endDatePicker = this.$createDatePicker({
          title: '结束时间',
          min: new Date(2008, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          onSelect: (date, selectedVal, selectedText) => {
            console.log('date: ', date);
            console.log('selectedVal: ', selectedVal);
            console.log('selectedText: ', selectedText);
          },
        });
      }

      this.endDatePicker.show();
    },
    initChart() {
      this.dataChartOption = {
        title: {
          text: '今日分时段销售额',
          left: 'center',
          textStyle: {
            color: '#005bac',
            fontWeight: 'normal',
          },
        },
        xAxis: {
          type: 'category',
          data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
          axisLine: {
            show: false,
            lineStyle: {
              color: '#87959f',
            },
          },
          axisTick: { // 刻度
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#87959f',
            },
          },
          axisTick: { // 刻度
            show: false,
          },
        },
        color: '#096bd9',
        series: [{
          data: [102, 203, 280, 800, 760, 360, 400, 460, 720, 680, 600, 500],
          type: 'line',
          lineStyle: {
            // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#000cff', // 0% 处的颜色
              }, {
                offset: 1, color: '#3de6ff', // 100% 处的颜色
              }],
              global: false, // 缺省为 false
            },
          },
        }],
      };

      // eslint-disable-next-line
      this.dataChart = echarts.init(document.getElementById('dataChart'));
      // 使用刚指定的配置项和数据显示图表。
      this.dataChart.setOption(this.dataChartOption);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.analyze-container {
  width: 95%;
  margin: 0 auto;
  border-radius: .05rem;
  background: #fff;
  box-shadow: 0 0 .05rem #ccc;
  padding: .1rem .13rem 0;
  margin-top: .1rem;

  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 18px;
    }

    .time {
      display: flex;
      align-items: center;
      font-size: .14px;

      span {
        flex-shrink: 0;
        margin-right: .05rem;
      }

      button {
        padding: .05rem .1rem;
        font-size: 14px;
        width: auto;
        margin-right: .1rem;
        background: #f5f5f5;
        color: #333;
        border-radius: .03rem;
        overflow: hidden;
      }
    } // end time

    .desc {
      font-size: .14px;
      color: $color-grey;
    }
  } // end title-row

  .data-row {
    display: flex;
    justify-content: space-between;
    margin-top: .1rem;
  } // end data-row
} // end analyze-container

.analyze1 {
  .chart-container {
    width: 48%;
    height: 1.5rem;
  } // end chart-container

  .other-container {
    width: 48%;
    display: flex;
    flex-wrap: wrap;

    .data-item {
      width: 50%;
      padding: .1rem .12rem .1rem 0;

      &:nth-child(2n) {
        padding-right: 0;
      }
      p {
        color: $color-grey-6;
        margin-bottom: .1rem;
        font-size: 14px;
      }
      .data {
        display: flex;
        width: 100%;
        align-items: center;

        .icon {
          width: .33rem;
          height: .33rem;
          border-radius: .33rem;
          border-style: solid;
          border-width: .05rem;
          overflow: hidden;
          @include flex-center;
          flex-shrink: 0;

          .iconfont {
            color: #fff;
            font-size: .15rem;
          }

        } // end icon

        .detail {
          flex: 1;

          .progress-row {
            margin-left: .05rem;
            .txt {
              display: flex;
              align-items: center;
              justify-content: space-between;
              color: $color-grey-6;
              font-size: 12px;
              margin-bottom: .02rem;

              .progress-title {
                @include flex-center;
                color: $color-black;
                &::before {
                  content: ' ';
                  width: .03rem;
                  height: .03rem;
                  border-radius: .03rem;
                  border: .01rem solid #ffcb27;
                  display: block;
                  margin-right: .02rem;
                }

                &.yellow,
                &.blue,
                &.red,
                &.green {
                  background: #fff;
                }

                &.blue::before {
                  border-color: #71a9d4;
                }

                &.red::before {
                  border-color: #ff8a78;
                }

                &.green::before {
                  border-color: #9ed475;
                }
              } // end progress-title

              .color-yellow,
              .color-blue,
              .color-red,
              .color-green {
                font-size: 14px;
                font-weight: 700;
              }

            } // end txt
            .progress {
              width: 100%;
              height: .05rem;
              border-radius: .05rem;
              overflow: hidden;
              margin-bottom: .08rem;

              span {
                display: block;
                height: 100%;
                border-radius: .05rem;
              }
              &.yellow {
                background: #fff5d4;
              }

              &.blue {
                background: #e3eef6;
              }

              &.red {
                background: #ffe8e4;
              }

              &.green {
                background: #ecf6e3;
              }

            } // end progress

            &:last-child {
                .progress{
                margin-bottom: 0;
              }
            }
          }
        } // end detail

      } // end data
    } // end data-item

    .color-yellow {
      color: #ffcb27;
    }

    .color-blue {
      color: #71a9d4;
    }

    .color-red {
      color: #ff8a78;
    }

    .color-green {
      color: #9ed475;
    }

    .yellow {
      background: #ffcb27;
      border-color: #fff5d4;
    }

    .blue {
      background: #71a9d4;
      border-color: #e3eef6;
    }

    .red {
      background: #ff8a78;
      border-color: #ffe8e4;
    }

    .green {
      background: #9ed475;
      border-color: #ecf6e3;
    }

  } // end other-container
} // end analyze1

.analyze-flex {
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin: .1rem auto;

  .analyze-container {
    margin: 0;
  }
}

.analyze2 {
  width: 60%;

  .data-row {
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-top: .1rem;

    .grid-item {
      width: 25%;
      text-align: center;
      font-size: 18px;
      color: #636363;

      .grid-title {
        font-size: 18px;
        color: $color-blue;
        margin-bottom: .1rem;
      }

      p {
        margin-bottom: .15rem;
      }
    }
  }
} // end analyze2

.analyze3 {
  width: 39%;

  .data-row {
    display: block;

    table {
      width: 100%;
      table-layout: fixed;
      text-align: center;

      thead {
        th {
          font-size: 12px;
          color: $color-grey;
        }
      }

      td {
        vertical-align: middle;
        font-size: 14px;
        color: $color-grey-6;
      }
    }

    .product-item {
      display: flex;
      align-items: center;
      color: $color-blue;
      font-size: 12px;
      padding: .05rem 0;
      .img {
        width: .25rem;
        height: .25rem;
        border: 1px solid $color-line;
        overflow: hidden;
        @include flex-center;

        img {
          height: 100%;
        }
      }

      .detail {
        @include text-ellipsis;
        padding-left: .05rem;
      }
    }
  }
}
</style>