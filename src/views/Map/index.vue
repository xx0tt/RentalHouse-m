<template>
  <div>
    <Header title="地图找房"></Header>
    <Mymap :cityList="cityList" @Myclick="findFn"></Mymap>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Mymap from './MyMap.vue'
import { getAreaMapApi } from '@/api'
export default {
  data() {
    return {
      cityList: [] // 房源列表
    }
  },
  components: { Mymap, Header },
  async created() {
    await this.getCity(this.$store.state.inCity.value)
  },
  methods: {
    // 获取房屋列表
    async getCity(cityId) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await getAreaMapApi(cityId)
        console.log(data)
        this.cityList = data.body
        console.log(this.cityList)
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 1
        })
      } catch (error) {
        this.$toast.fail('请求失败，请稍后再试')
      }
    },

    // 点击后继续获取房屋列表
    async findFn(val) {
      await this.getCity(val)
    }
  }
}
</script>

<style></style>
