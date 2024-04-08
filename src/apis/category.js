import http from "@/utils/http";

export function getTopCategoryAPI(id){
    return http.get('/category',{params:{id}});
}

export function getCategoryFilterAPI(id){
    return http.get('/category/sub/filter',{params:{id}});
}

export const getSubCategoryAPI = (data) => {
    return http.post('/category/goods/temporary',data);
}