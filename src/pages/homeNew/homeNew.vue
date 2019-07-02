<template>
  <div class="homeNew">
     <!-- <h1 @click="cehsi" >二维码扫描</h1> -->
     <div class="content_one">
       <img class="one_img" src="../../assets/img/bj1.png"  mode='widthFix' alt="">
       <div class="content_one_son">
         <div class="backgroundImg_b">
            <p class="one_p_a">预估账单(月)</p>
            <p class="one_p_b"><span>{{account}}</span><span>元</span></p>
         </div>
         <div class="backgroundImg_c">
             <p class="one_p_a">您的余额</p>
             <p class="one_p_b"><span>{{availableValue}}</span><span>元</span></p>
         </div>
         <div class="backgroundImg_a">
             <p class="one_p_a">寄件量(月)</p>
             <p class="one_p_b"><span>{{count}}</span><span>件</span></p>
         </div>
       </div>
     </div>
     <div class="content_two">
       <p>快递详情查询</p>
        <div class="content_two_son">
           <input placeholder="请输入要查找的运单号"  placeholder-class="placeClass" type="number">
           <img src="../../assets/img/bj5.png"  mode='widthFix' alt="">
        </div>
     </div>
     <div class="content_three">
        <div @click="selectSign(0)"><span  :class="{signColor : signCode === 0}" >运输中</span></div>
        <div @click="selectSign(1)" ><span :class="{signColor : signCode === 1}"  >待揽收</span></div>
        <div @click="selectSign(2)" ><span :class="{signColor : signCode === 2}"  >已下单</span></div>
     </div>
     <div class="content_four">
        <div class="content_four_son_one">
          <div><span class="borders"></span></div>
          <div><span>只显示最近7日订单</span></div>
          <div><span class="borders"></span></div>
        </div>
        <div class="content_four_son_two">
            <div class="noData">
               <img src="../../assets/img/zanwu.png" mode='widthFix' alt="">
               <p>暂无订单信息</p>
            </div>
        </div>
     </div>
</div>
</template>
<script>
import {post} from '@/request'
import {fmtDate} from '@/utils/index'
export default{
  data () {
    return {
      signCode: 0,
      account: 0, // 当月预估账单
      availableValue: 0, // 可用余额
      count: 0, // 当月寄件量
      onrderList: [], // 订单列表数组
      listArrOne: [], // 运输中数组
      listArrTwo: [], // 待揽收数组
      listArrThree: [], // 已下单数组
      loginObj: {} // 登录获取的信息
    }
  },
  created () {
  },
  beforeMount () {},
  mounted () {
  },
  onShow: function () {
    this.getData()
    this.getOrderList(0)
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '首页'
    })
  },
  methods: {
    // 切换数据
    selectSign (i) {
      this.signCode = i
      this.getOrderList(i)
    },
    // 获取数据 首页数据
    getData () {
      let sync = wx.getStorageSync('loginObj')
      this.loginObj = sync
      this.account = sync.account
      this.availableValue = sync.availableValue
      this.count = sync.count
    },
    // 二维码扫描
    cehsi () {
      console.log(1)
      wx.scanCode({
        success: (res) => {
          console.log(res.result)
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: (res) => {
          wx.showToast({
            title: '失败',
            icon: 'success',
            duration: 2000
          })
        },
        complete: (res) => {
        }
      })
    },
    // 跳转
    jumpTo (url) {
      wx.navigateTo({ url })
    },
    // 查询订单列表接口
    // 0：已下单；
    // 1：已揽收
    // 2：已完成
    getOrderList (i) {
      // let that = this
      let dataStart = fmtDate(new Date().valueOf())
      let dataEnd = fmtDate(new Date().valueOf() - 7 * 24 * 60 * 60 * 1000)
      post('/mecv-protocol/user/center', {
        'header': {
          'region': '370212',
          'city': '0532',
          'messageID': '201710271104190000000018',
          'imei': '161a3797c83db4e6f84',
          'ua': 'test',
          'timeStamp': '20171027110419',
          'transactionType': '30200000',
          'terminal': '8',
          'version': '1.9.8',
          'sign': 'test',
          'tel': '18974561111'
        },
        'body': {
          'source': 'CCT-WEIXIN',
          'type': i,
          'businessId': this.loginObj.businessId,
          'pageNo': '1',
          'pageSize': '10',
          'fmsCode': '44',
          'submitDate': dataStart,
          'submitDateEnd': dataEnd
        }}).then(res => {
        if (res.data.header.resCode === 0) {
        }
      })
    }
  }
}
</script>
<style>
</style>


