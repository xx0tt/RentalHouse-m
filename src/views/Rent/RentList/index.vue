<template>
  <div>
    <!-- 标题 -->
    <Header title="房屋管理" />
    <!-- 房屋管理列表展示 -->
    <HouseItem
      v-for="(item, index) in MyhouseList"
      :key="index"
      :houseitem="item"
    ></HouseItem>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import HouseItem from '@/components/HouseItem'
import { getMyHouse } from '@/api/user'
export default {
  data() {
    return {
      MyhouseList: []
    }
  },
  async created() {
    try {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      const { data } = await getMyHouse()
      this.MyhouseList = data.body
      // console.log(data.body)
      this.$toast.clear()
    } catch (error) {
      this.$toast.fail('加载失败')
    }
  },
  components: { HouseItem, Header }
}
</script>

<style lang="less" scoped></style>
