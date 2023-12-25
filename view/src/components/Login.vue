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

// 密码框检验规则
const rules = ref({
  user: [
    { required: true, message: '请输入账户', trigger: 'blur' },
    { min: 3, max: 5, message: '长度必须大于三', trigger: 'blur' },
  ],
  pwd: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change',
    },
  ]
})

</script>

<template>
  <div>
    <el-dialog title="登陆" center width="300px" v-model="isLogin">
      <el-form status-icon size="large" :model="loginForm" :rules="rules">
        <el-form-item prop="user">
          <el-input v-model="loginForm.user" placeholder="请输入账户" 
          clearable :prefix-icon="User"
          size="large"/>
        </el-form-item >
        <el-form-item prop="pwd">
          <el-input v-model="loginForm.pwd" placeholder="请输入密码" 
          clearable :prefix-icon="Key" type="password"
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
