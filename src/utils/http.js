import axios from "axios"
import {useUserStore} from '@/stores/userStore'

import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from "element-plus";
import router from "@/router";

const http =  axios.create({
    baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 10000
})

//请求拦截器
http.interceptors.request.use(function (config) {
    const userStore = useUserStore()
    const token = userStore.userInfo.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},e=>Promise.reject(e))

//响应拦截器
http.interceptors.response.use(res=> res,e=> {
    
    //统一错误提示
    ElMessage({ type: "error", message: "登录失败，" + e.response.data.message })
    //token失效
    const userStore = useUserStore()
    if(e.response.status === 401){
        userStore.clearUserInfo();
        router.push('/login')
    }

    return Promise.reject(e)
})

export default http