<template>
  <div>
    <!-- 头部 -->
    <Header title="地图找房" />

    <!-- 地图 -->
    <MyMap class="map" :cityList="cityList"></MyMap>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import MyMap from './MyMap.vue'
import { getAreaMapApi } from '@/api'
export default {
  data() {
    return {
      cityList: []
    }
  },
  components: { Header, MyMap },
  created() {
    this.getAreaMap(this.$store.state.inCity.value)
  },
  methods: {
    // 获取区域房源数据
    async getAreaMap(CityValue) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      const { data } = await getAreaMapApi(CityValue)
      console.log(data)
      this.cityList = data.body

      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 1
      })
    }
  }
}
</script>

<style lang="less" scoped>
.map {
  width: 100%;
  height: 620px;
}
</style>
