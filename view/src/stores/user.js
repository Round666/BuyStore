import {defineStore} from 'pinia'
import {ref} from 'vue'
export default defineStore('user',()=>{
    // 是否登陆
    const isLogin = ref(false)
    
    function setIsLogin(val){
        isLogin.value = val
    }

    return {
        isLogin,
        setIsLogin,
    }
})