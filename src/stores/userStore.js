import { loginAPI } from "@/apis/user";

export const useUserStore = defineStore(
    'user',
    () => {
        const userInfo = ref({});
        const getUserInfo = async (user) => {
            const { data } = await loginAPI(user)
            console.log(data)
            userInfo.value = data.result
        }
        //清空用户数据
        const clearUserInfo = () => {
            userInfo.value = {}
        }
        return { userInfo, getUserInfo, clearUserInfo }
    }, 
    {
        persist: true // 开启持久化
    }
)
