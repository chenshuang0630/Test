<template>
  <div id="app" @tap="handleAllClick">
      <mz-header></mz-header>
      <mz-nav></mz-nav>
      <keep-alive exclude="mz-detail">
          <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>

import axios from 'axios'
import Header from './components/header.vue'
import Nav from './components/nav.vue'

axios.defaults.timeout = 2000;
//请求数据，请求时间超过两秒默认请求失败，读取，在请求成功时候保存在缓存的数据

export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  components : {
    [Header.name] : Header,
    [Nav.name] : Nav
  },
  methods : {
    handleAllClick(){
      this.$store.commit('CHANGE_NAV_SHOW',false)
    }
  }
}
</script>

<style lang="scss">
*{ margin:0; padding:0; }
html,body{ height: 100%; font-size:14px; background: #ebebeb; }
li{ list-style:none; }
img{ display:block; }
</style>
