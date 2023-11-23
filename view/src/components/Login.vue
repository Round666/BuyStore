<script setup>
import useStore from '@/stores'
import { storeToRefs } from 'pinia'
const { user } = useStore()
const { isLogin } = storeToRefs(user)
const dialogVisible = ref(false)
</script>

<template>
  <div>
    <el-dialog v-model="isLogin" title="Tips" width="30%" :before-close="handleClose">
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isLogin = false">Cancel</el-button>
          <el-button type="primary" @click="isLogin = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang=''>

</style>
