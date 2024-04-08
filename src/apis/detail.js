import http from "@/utils/http";

export const getDetail = (id) => {
    return http.get('/goods',{params:{id}});
}

export const getHotGoodsAPI = ({id,type,limit = 3}) => {
    return http.get('/goods/hot',{params:{id,type,limit}});
}