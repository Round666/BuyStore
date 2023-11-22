<template>
  <div class="header-root">
    <div class=" header-nav">
      <div class="context header-nav-context">
        <ul class="header-options">
          <li>
            <el-button type="text">登陆</el-button>
            <span class="header-login-split">|</span>
            <el-button type="text">注册</el-button>
          </li>
          <li>
            <el-button type="text">我的订单</el-button>
          </li>
          <li>
            <el-button type="text">我的收藏</el-button>
          </li>
          <li>

            <el-button type="text">
              <i-ep-shopping-cart class="icon-shop"></i-ep-shopping-cart>
              购物车
            </el-button>
          </li>
        </ul>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="context header-tab">
      <el-menu :default-active="activeIndex" class="el-menu-demo" 
      mode="horizontal" @select="handleSelect"
      router="true">
        <div class="header-tab-logo">
          <img src="@/assets/images/logo.png">
        </div>
        <el-menu-item v-for="(item,index) in menuTab" :key="index" 
        :index="item.route">
          {{ item.txt }}
        </el-menu-item>
        <div class="header-tab-search">
          <el-input placeholder="请选择日期">
            <template #suffix>
              <i-ep-search></i-ep-search>
            </template>
          </el-input>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
const menuTab = ref([
  {
    txt:'首页',
    route:'/'
  },
  {
    txt:'全部商品',
    route:'/goods'
  },
  {
    txt:'关于我们',
    route:'/about'
  }
])

</script>

<style lang='scss' scoped>

.header-nav {
  background-color: $header-root-backcolor;
  height: 38px;
}

.header-options {
  display: flex; // 使用flex布局
  align-items: center; // 垂直居中对齐
  li {
    display: inline;
    margin-right: 24px;
  }
  .el-button--text,
  .header-login-split {
    color: #adb5bd;
    margin: 0 4px;
  }

  $header-txt-color: #f8f9fa;

  .el-button--text:hover {
    color: $header-txt-color;
  }

  .icon-shop {
    color: $header-txt-color;
    margin-right: 3px;
  }
  float: right;
  height: 100%;
}


.header-nav-context{
  height: 100%;
}

.header-tab {
  margin-top: 24px;
  .header-tab-logo {
    margin-right: 108px;
  }
  .header-tab-search {
    width: 300px;
    margin-top: 14px;
    margin-left: auto;
  }
}
</style>
