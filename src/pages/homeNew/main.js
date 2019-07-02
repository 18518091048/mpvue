import Vue from 'vue'
import homeNew from './homeNew'

const app = new Vue(homeNew)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark'
  }
}
