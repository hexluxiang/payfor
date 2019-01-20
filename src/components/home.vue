<template>
  <div class="home-page">
    <div class="head-title">
      <div class="title">
        <span>联系客服</span>
        <div class="dot"></div>
      </div>
    </div>
    <div class="userInfo">
      <div class="userNumber">
        <div class="title">
          <span>充值账号</span>
        </div>
        <div class="number"><input type="text" v-model="user_name" placeholder="请输入账号" value=""></div>
      </div>

      <div class="userMoney">
        <div class="title">
          <span>充值金额</span>
        </div>
        <div class="number">
          <input type="text" v-model="user_money" placeholder="请输入金额" value="">
        </div>
      </div>

      <div class="userMethod">
        <div class="title">
          <span>充值方式</span>
        </div>
        <div class="method">
          <div class="method_one">
            <input type="radio" name="gender" value="jr" checked="checked" v-model="checkMetod" id="jr" />
            <label for="jr">
              <div class="bg" :style="note_1"></div>
              <div class="name">
                <p>支付宝</p>
                <span>ALIPAy</span>
                </span>
              </div>
            </label>
          </div>
          <div class="method_two">
            <input type="radio" name="gender" value="k5" v-model="checkMetod" id="k5" />
            <label for="k5">
              <div class="bg" :style="note_2"></div>
              <div class="name">
                <p>微信支付</p>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="pay-btn">
        <div class="pay" @click="pay">
          <button>立即支付</button>
        </div>
        <div class="reset" @click="reset">
          <button>重置</button>
        </div>
      </div>
      <div id="qrcode" ref="qrcode"></div>
      方法：{{checkMetod}}
    </div>
  </div>
</template>

<script>
// import { Toast } from 'vant';
import { payFor } from "@/apis";
import { Toast } from "vant";
//import QRCode from "@/vendor/qrcode.min.js";//手动下载.js,
import QRCode from "qrcodejs2"; //npm install qrcodejs2 --save

export default {
  name: "home",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      note_1: {
        backgroundImage:
          "url(" + require("../assets/images/pay-tab_03.png") + ")"
      },
      note_2: {
        backgroundImage:
          "url(" + require("../assets/images/pay-tab_02.png") + ")"
      },
      user_name: "",
      user_money: "",
      checkMetod: ""
    };
  },
  methods: {
    demo() {},
    pay() {
      payFor({
        uid: 12,
        user_name: this.user_name,
        trans_amount: this.user_money,
        app_terminal: this.checkMetod
      })
        .then(res => {
          console.log(res);
          // var obj = JSON.parse(res);
          // var url = res.payurl  若需要对返回对象解析时使用
          var _url = res.payurl;
          this.getQrCode(_url);
        })
        .catch(err => {
          console.log(err);
        });
    },
    reset() {
      this.checkMetod = "";
      this.user_name = "";
      this.user_money = "";
      Toast("重置完成");
    },
    getQrCode(url) {
      var qrEl = this.$refs.qrcode;
      let qrCode = new QRCode(qrEl, {
        width: "150px",
        height: "150px",
        colorDark: "#000000", //前景色
        colorLight: "#ffffff", //背景色
        correctLevel: QRCode.CorrectLevel.H, //二维码容错率
        //text: url // 二维码地址
      });
      qrCode.clear(); //清除二维码
      qrCode.makeCode(url); //生成另一个新的二维码
    }
  }
};
</script>

<style scoped lang="scss">
$boeder_1: #efefef;
.home-page {
  .head-title {
    width: 100%;
    height: 0.8rem;
    background: rgb(57, 61, 73);
    position: relative;
    .title {
      padding: 0 20px;
      text-align: left;
      line-height: 0.8rem;
      span {
        font-size: 0.3rem;
        color: #fff;
      }
      .dot {
        position: absolute;
        width: 0.1rem;
        height: 0.1rem;
        background: red;
        left: 1.7rem;
        top: 0.2rem;
        border-radius: 100%;
      }
    }
  }
  .userInfo {
    width: 100%;
    margin-top: 2rem;
    .userNumber,
    .userMoney,
    .userMethod {
      display: flex;
      font-size: 0.3rem;
      border: 1px solid $boeder_1;
      margin-bottom: 0.4rem;
      .title {
        text-align: center;
        padding: 10px 20px;
        border-right: 1px solid $boeder_1;
        background: rgb(251, 251, 251);
      }
      .number {
        flex: 1;
        padding-left: 10px;
        input {
          border: none;
          outline: none;
          width: 100%;
          height: 100%;
        }
      }
    }
    .userMethod {
      border: none;
      .title {
        border: 1px solid $boeder_1;
      }
      .method {
        display: flex;
        align-items: center;
        input {
          margin-top: 8px;
          margin: 8px;
        }
        .method_one,
        label {
          display: flex;
          .name {
            line-height: 0.3rem;
            font-size: 14px;
            font-weight: bold;
            padding: 0 5px;
            color: #403838;
            white-space: nowrap;
            span {
              font-weight: 100;
              color: #6f6b6b;
              font-size: 12px;
              display: block;
              line-height: 2;
            }
          }
        }
        .method_two,
        label {
          display: flex;
          .name {
            line-height: 0.3rem;
            font-size: 14px;
            padding: 0 5px;
            padding: 6px 0;
            padding-left: 5px;
            white-space: nowrap;
          }
        }
        .bg {
          background-repeat: no-repeat;
          background-size: 100% 100%;
          width: 30px;
          height: 30px;
          display: inline-block;
        }
      }
    }
    .pay-btn {
      display: flex;
      padding: 0 112px;
      outline: none;
      color: #fff;
      font-weight: bold;
      font-size: 13px;
      .pay {
        padding: 8px 10px;
        background: #009588;
        border: 1px solid snow;
        border-radius: 2px;
        margin-right: 20px;
        button {
          border: none;
          background: #009588;
          outline: none;
          color: #fff;
          white-space: nowrap;
        }
      }
      .reset {
        padding: 8px 15px;
        background: #fff;
        border: 1px solid #bfbbbb;
        border-radius: 2px;
        button {
          border: none;
          background: #fff;
          outline: none;
          color: #000;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
