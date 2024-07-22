<template>
  <div class="Attendance">
   
    <h1 class="van-doc-demo-block__title"></h1>
    <van-cell-group>
      <van-field
        is-link
        readonly
        clickable
        name="picker"
        :value="yearMonth"
        label="查询月份"
        @click="showPicker = true"
      />
      <van-cell style="white-space: pre-wrap" :title="cardingTotal" />
    </van-cell-group>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <h1 class="van-doc-demo-block__title"></h1>
    <van-cell-group v-for="(carding, index) in cardingList" :key="index">
      <router-link :to="'/CardingDetail/' + carding.cardingDay">
        <van-cell
          style="white-space: pre-wrap"
          :title="carding.cardingDay"
          :label="
            '出勤工时' +
            carding.actualHours +
            'H       加班时数' +
            carding.overtimeHours +
            'H       缺勤工时' +
            carding.absenceHours +
            'H'
          "
          size="large"
        />
      </router-link>
    </van-cell-group>

     <van-empty description="暂无记录" v-if="this.cardingList == ''" />
  </div>
</template>

<script type="text/babel">
function getUrlParam(name) {
  //封装方法
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}
import Vue from "vue";
import axios from "axios";
import qs from "qs";
import moment from "moment";
import { Field, Popup, Cell, CellGroup, Picker, Toast, Empty } from "vant";
Vue.use(Field).use(Popup).use(Cell).use(CellGroup).use(Picker).use(Toast).use(Empty);
export default {
  inject: ["reload"],
  components: {},
  data() {
    return {
      columns: [],
      showPicker: false,
      empNo: "",
      yearMonth: "",
      cardingDay: "",
      cardingTotal: "",
      cardingList: [],
    };
  },
  created() {
    // this.yearMonth = moment().format("YYYY-MM");
    console.log(this.$store.getters.yearMonth);
    if("" == this.$store.getters.yearMonth ){
      this.yearMonth = moment().format("YYYY-MM");
    }else{
      this.yearMonth = this.$store.getters.yearMonth;
    }
    this.columns = [moment().format("YYYY-MM"),moment().subtract(1, "months").format("YYYY-MM"),moment().subtract(2, "months").format("YYYY-MM")]
    if (
      this.$store.getters.userId === "" ||
      this.$store.getters.userId === null
    ) {
      const code = getUrlParam("code"); // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
      console.log("第一次code===>" + code);
      if (code) {
        console.log("第二次code===>" + code);
        // 通过code获取 openId等用户信息
        this.$axios
          .get("OAuth2/authorize?name=attendance&area=KS&code=" + code)
          .then((res) => {
            let datas = res.data;
            console.log(datas.code+'------------'+datas.msg);
            if (datas.code === 1) {
              console.log("授权成功");
              this.empNo = datas.data.empNo;
              this.$store.commit("UPDATE_USERID", datas.data.userId);
              this.$store.commit("UPDATE_EMPNO", datas.data.empNo);
              this.$axios
                .get(
                  "AttendanceQuery/getEmpCardingTotal?empNo=" +
                    this.empNo +
                    "&yearMonth=" +
                    this.yearMonth
                )
                .then((res) => {
                  let datas = res.data;
                  if (datas.code === 1) {
                    this.cardingList = datas.data.cardingList;
                    let Total = datas.data.cardingTotal;
                    this.cardingTotal =
                      "排班时长" +
                      Total.cardingHours +
                      "H          实际出勤时数" +
                      Total.actualHours +
                      "H                                       加班时数" +
                      Total.overtimeHours +
                      "H            缺勤工时" +
                      Total.absenceHours +
                      "H        夜班天数" +
                      Total.nightCount +
                      "天";
                  } else {
                    this.name = "您未取得应用授权";
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.getCodeApi("attendance");
      }
    } else {
      this.$axios
        .get(
          "AttendanceQuery/getEmpCardingTotal?empNo=" +
            this.$store.getters.empNo +
            "&yearMonth=" +
            this.yearMonth
        )
        .then((res) => {
          let datas = res.data;
          if (datas.code === 1) {
            this.cardingList = datas.data.cardingList;
            let Total = datas.data.cardingTotal;
            this.cardingTotal =
              "排班时长" +
              Total.cardingHours +
              "H          实际出勤时数" +
              Total.actualHours +
              "H                                       加班时数" +
              Total.overtimeHours +
              "H            缺勤工时" +
              Total.absenceHours +
              "H        夜班天数" +
              Total.nightCount +
              "天";
          } else {
            this.name = "您未取得应用授权";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  methods: {
    getCodeApi(state) {
      //获取code
      let urlNow = encodeURIComponent(window.location.href);
      let scope = "snsapi_base"; //snsapi_userinfo   //静默授权 用户无感知
      let appid = "ww6702157cf83bd8ff";
      let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
      window.location.replace(url);
    },
    onConfirm(value) {
      this.yearMonth = value;
      this.$store.commit("UPDATE_YEARMONTH", this.yearMonth);
      this.$axios
        .get("AttendanceQuery/getEmpCardingTotal?empNo="+this.$store.getters.empNo+"&yearMonth=" + this.yearMonth)
        // .get("api/getEmpCardingTotal?empNo="+this.$store.getters.empNo+"&yearMonth=" + this.yearMonth)
        .then((res) => {
          let datas = res.data;
          if (datas.code === 1) {
            this.cardingList = datas.data.cardingList;
            let Total = datas.data.cardingTotal;
            this.cardingTotal =
              "排班时长" +
              Total.cardingHours +
              "H          实际出勤时数" +
              Total.actualHours +
              "H                                       加班时数" +
              Total.overtimeHours +
              "H            缺勤工时" +
              Total.absenceHours +
              "H        夜班天数" +
              Total.nightCount +
              "天";
          } else {
            this.name = "您未取得应用授权";
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.showPicker = false;
    },
  },
};
</script>
<style>
.van-doc-demo-block__title {
  margin: 0;
  padding: 8px 16px 16px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: bolder;
  font-size: 15px;
  line-height: 16px;
}
</style>