<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI} from '@/apis/category';
import GoodsItem from '@/views/Home/components/GoodsItem.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

//获取面包屑导航数据
const route = useRoute();
const filterData = ref([])
const getFilterData = async (id) => {
  const { data } = await getCategoryFilterAPI(id)
  filterData.value = data.result
  //console.log(filterData.value);
}
onMounted(() => {
  getFilterData(route.params.id)
})

//获取二级分类商品
const goodsList = ref([]);
const reqData = ref({
  categroyId: route.params.id,
  page:1,
  pageSize: 10,
  sortField: "publishTime",
})

const getGoodsList = async () => {
  const { data } = await getSubCategoryAPI(reqData.value)
  goodsList.value = data.result.items
  //console.log(goodsList.value);
}

onMounted(() => {
  getGoodsList()
})

//切换tab栏
const tabChange = () => {
  console.log(reqData.value.sortField)
  reqData.value.page = 1;
  getGoodsList()
}

const disabled = ref(false)
//加载更多
const load = async() => {
  reqData.value.page++;
  const { data } = await getSubCategoryAPI(reqData.value)
  goodsList.value.push(...data.result.items)
  if(data.result.items.length === 0){
    disabled.value = true
  }
  //console.log(goodsList.value);
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- 一级名字 -->
        <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}` }">
          {{ filterData.parentName }}
        </el-breadcrumb-item>
        <!-- 二级名字 -->
        <el-breadcrumb-item>{{filterData.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange" :infinite-scroll-disabled="disabled">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load">
        <!-- 商品列表-->
        <GoodsItem v-for="good in goodsList" :good="good" :key="good.id"></GoodsItem>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: pink;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>