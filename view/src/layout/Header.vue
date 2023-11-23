<template>
  <div class="header-root">
    <div class=" header-nav">
      <div class="context header-nav-context">
        <ul class="header-options">
          <li>
            <el-button :link="true">登陆</el-button>
            <span class="header-login-split">|</span>
            <el-button :link="true">注册</el-button>
          </li>
          <li>
            <el-button :link="true">我的订单</el-button>
          </li>
          <li>
            <el-button :link="true">我的收藏</el-button>
          </li>
          <li>

            <el-button :link="true">
              <i-ep-shopping-cart class="icon-shop"></i-ep-shopping-cart>
              购物车
            </el-button>
          </li>
        </ul>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="context header-tab">
      <el-menu class="el-menu-demo" mode="horizontal" :router="true"
        :default-active="router.currentRoute.value.path">
        <div class="header-tab-logo">
          <img src="@/assets/images/logo.png">
        </div>
        <el-menu-item v-for="(item, index) in menuTab" :key="index" :index="item.route">
          {{ item.txt }}
        </el-menu-item>
        <div class="header-tab-search">
          <el-input placeholder="请输入搜索内容" v-model="input">
            <template #suffix>
              <i-ep-search @click="jump" class="search-icon">
              </i-ep-search>
            </template>
          </el-input>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router';

const router = useRouter();

const menuTab = ref([
  {
    txt: '首页',
    route: '/'
  },
  {
    txt: '全部商品',
    route: '/goods'
  },
  {
    txt: '关于我们',
    route: '/about'
  }
])

const input = ref(null)

const jump = () => {
  router.push(
    { path: '/goods', query: { search: input.value } }
  )
  input.value = null
}
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


.header-nav-context {
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

.search-icon {
  cursor: pointer;
}
</style>
