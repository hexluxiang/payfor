// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import vant from 'vant'; //加载vant所有组件
import 'vant/lib/vant-css/index.css';
Vue.use(vant);

import './assets/flexible' //rem
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})