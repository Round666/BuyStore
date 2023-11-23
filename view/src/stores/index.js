import useUserStore from '@/stores/user'

export default ()=>{
    return {
        user:useUserStore()
    }
}