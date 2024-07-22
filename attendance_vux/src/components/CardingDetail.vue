<template>
  <div class="CardingDetail">
    <h1 class="van-doc-demo-block__title"></h1>
    <yd-cell-group title="">
      <yd-preview-header>
        <div slot="left">考勤日期</div>
        <div slot="right">{{ cardingDetail.cardingDay }}</div>
      </yd-preview-header>

      <yd-preview-item>
        <div slot="left">节假日类型</div>
        <div slot="right">
          {{ cardingDetail.cardingType }}
        </div>
      </yd-preview-item>
      <yd-preview-item>
        <div slot="left">班别</div>
        <div slot="right">
          {{ cardingDetail.cardingNo + " " + cardingDetail.cardingShift }}
        </div>
      </yd-preview-item>

      <yd-preview-item>
        <div slot="left">排班时间</div>
        <div slot="right">
          {{
            cardingDetail.cardingBeginTime + "-" + cardingDetail.cardingEndTime
          }}
        </div>
      </yd-preview-item>
      <yd-preview-item v-if="cardingDetail.cardingActualBegin != null && cardingDetail.cardingActualBegin != ''">
        <div slot="left">正班上班卡</div>
        <div slot="right">{{ cardingDetail.cardingActualBegin }}</div>
      </yd-preview-item>
      <yd-preview-item v-if="cardingDetail.cardingActualEnd != null && cardingDetail.cardingActualEnd != ''">
        <div slot="left">正班下班卡</div>
        <div slot="right">{{ cardingDetail.cardingActualEnd }}</div>
      </yd-preview-item>
      <yd-preview-item>
        <div slot="left">出勤时数</div>
        <div slot="right">{{ cardingDetail.actualHours }}</div>
      </yd-preview-item>
      <yd-preview-item v-if="cardingDetail.Absence_Hours !=null && cardingDetail.Absence_Hours != ''">
        <div slot="left">缺勤时数</div>
        <div slot="right">{{ cardingDetail.Absence_Hours }}</div>
      </yd-preview-item>
      <yd-preview-item v-if="cardingDetail.Absence_Desc !=null && cardingDetail.Absence_Desc != ''">
        <div slot="left">缺勤类型</div>
        <div slot="right">{{ cardingDetail.Absence_Desc }}</div>
      </yd-preview-item>
      <yd-preview-item v-if="cardingDetail.overTimeBeginTime !=null && cardingDetail.overTimeBeginTime != ''">
        <div slot="left">加班申请时间</div>
        <div slot="right">{{ cardingDetail.overTimeBeginTime + "-" + cardingDetail.overTimeEndTime }}</div>
      </yd-preview-item>
      <yd-preview-item v-if="cardingDetail.overtimeApplyHours != null && cardingDetail.overtimeApplyHours != ''">
        <div slot="left">加班申请时数</div>
        <div slot="right">{{ cardingDetail.overtimeApplyHours }}</div>
      </yd-preview-item>
      <yd-preview-item v-if="cardingDetail.avertimeDay != null && cardingDetail.avertimeDay != ''">
        <div slot="left">加班实际上班卡</div>
        <div slot="right">{{ cardingDetail.overTimeActualBegin }}</div>
      </yd-preview-item>
      <yd-preview-item v-if="cardingDetail.avertimeDay != null && cardingDetail.avertimeDay != ''">
        <div slot="left">加班实际下班卡</div>
        <div slot="right">{{ cardingDetail.overTimeActualEnd }}</div>
      </yd-preview-item>
      <yd-preview-item v-if="cardingDetail.avertimeDay != null && cardingDetail.avertimeDay != ''">
        <div slot="left">加班实际时数</div>
        <div slot="right">{{ cardingDetail.overTimeHours }}</div>
      </yd-preview-item>
    </yd-cell-group>
    <van-empty description="暂无记录" v-if="this.cardingDetail == ''" />
  </div>
</template>

<script type="text/babel">
import Vue from "vue";
import axios from "axios";
import qs from "qs";

import { Field, Popup, Cell, CellGroup, Picker, Toast, Empty } from "vant";
Vue.use(Field)
  .use(Popup)
  .use(Cell)
  .use(CellGroup)
  .use(Picker)
  .use(Toast)
  .use(Empty);
export default {
  inject: ["reload"],
  components: {},
  data() {
    return {
      cardingDetail: '',
    };
  },
  created() {
    let empNo = this.$store.getters.empNo;
    let cardingDay = this.$route.params.cardingDay;
    this.$axios
      .get(
        "AttendanceQuery/getEmpCardingDetail?empNo=" + empNo + "&cardingDay=" + cardingDay
      )
      .then((res) => {
        let datas = res.data;
        if (datas.code === 1) {
          this.cardingDetail = datas.data;
        } else {
          this.name = "查询失败,请联系管理员";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {},
};
</script>
<style>
.van-doc-demo-block__title {
  margin: 0;
  padding: 4px 16px 16px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: bolder;
  font-size: 15px;
  line-height: 16px;
}
</style>
