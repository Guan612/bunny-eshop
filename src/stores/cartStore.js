import { defineStore } from "pinia";
import { computed } from "vue";

export const useCartStore = defineStore("cart",
    ()=> {
        const cartList = ref([]);

        //添加购物车函数
        const addCart = (goods) => {
            const findItem = cartList.value.find(item=>goods.id === item.id);
            if(findItem){
                findItem.count++;
            } else {
                cartList.value.push(goods);
            }
        };

        //删除购物车函数
        const delCart = (skuId) => {
            const idx = cartList.value.findIndex((item)=>skuId === item.id);
            cartList.value.splice(idx,1);
        }

        //计算商品数量与价格
        const allCount = computed(()=>cartList.value.reduce((a, c) => a + c.count, 0))

        const allPrice = computed(()=>cartList.value.reduce((a, c) => a + c.count * c.price, 0))

        //全选功能
        const checkAll = (selected) => {
            cartList.value.forEach(item => item.selected = selected)
        };

        const isAll = computed(()=>cartList.value.every((item)=>item.selected))

        return{
            cartList,
            addCart,
            delCart,
            allCount,
            allPrice,
            isAll,
            checkAll,
            
        }
    },
    {
        persist:true
    }
)