// import { ref, computed, onMounted } from 'vue'
// import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([]);
  const getCategory = async () => {
    try {
      let res = await getCategoryAPI();
      categoryList.value = res.data.result;
    } catch (error) {
      console.log(error);
    }
  }

  onMounted(() => getCategory());

  return { categoryList, getCategory}
})
