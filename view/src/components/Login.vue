<script setup>
import useStore from '@/stores'
import { storeToRefs } from 'pinia'
import { Key, User } from '@element-plus/icons-vue'
import { ref } from 'vue'
const { user } = useStore()
const { isLogin } = storeToRefs(user)

// 表单数据
const loginForm = ref({
  user: '',
  pwd: ''
})

</script>

<template>
  <div>
    <el-dialog title="登陆" center width="300px" v-model="isLogin">
      <el-form status-icon size="large" :model="loginForm" >
        <el-form-item>
          <el-input v-model="loginForm.user" placeholder="请输入账户" 
          clearable :prefix-icon="User"
          size="large"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.pwd" placeholder="请输入密码" 
          clearable :prefix-icon="Key"
          size="large"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang='scss'>
.el-form{
  //display: flex;
  // flex: 1;
}
</style>
