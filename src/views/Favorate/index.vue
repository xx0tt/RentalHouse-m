<template>
  <div>
    <!-- 标题 -->
    <Header title="收藏列表"></Header>
    <!-- 收藏列表展示 -->
    <HouseItem
      v-for="(item, index) in favoriteList"
      :key="index"
      :houseitem="item"
    ></HouseItem>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import HouseItem from '@/components/HouseItem'
import { getfavorites } from '@/api/user'
export default {
  data() {
    return {
      favoriteList: []
    }
  },
  async created() {
    try {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      const { data } = await getfavorites()
      this.favoriteList = data.body
      this.$toast.clear()
    } catch (error) {
      console.log('error', error)
    }
  },
  components: { HouseItem, Header }
}
</script>

<style lang="less" scoped></style>
