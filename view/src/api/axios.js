import axios from 'axios'
import Global from '../Global'

const api = (url,method,params={})=>{
    return new Promise(async(resolve,reject)=>{
        if(method=='get'){
            // 拼接get请求
            const keys = Object.keys(params)
            url += '?'
            keys.forEach(k=>url+=`${k}=${params[k]}&`)
            url = url.slice(0,-1);
        }
        axios({
            method,
            url,
            data:params
        }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
}

export default api