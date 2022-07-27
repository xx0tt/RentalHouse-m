<template>
  <div>
    <!-- 头部 -->
    <Header title="地图找房" />

    <!-- 地图 -->
    <MyMap class="map" :cityList="cityList"></MyMap>

    <!-- 弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-cell title="房屋列表" size="large" center
        ><span @click="$router.push('/layout/findhouse')"
          >更多房源</span
        ></van-cell
      >
      <HouseItem
        v-for="item in houseList"
        :key="item.houseCode"
        :houseitem="item"
      />
    </van-popup>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import HouseItem from '@/components/HouseItem.vue'
import MyMap from './MyMap.vue'
import { getAreaMapApi, getConditionApi } from '@/api'
export default {
  data() {
    return {
      cityList: [],
      show: false, // false
      houseList: []
    }
  },
  components: { Header, MyMap, HouseItem },
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
      this.$toast.clear()
      this.$children[1].num++
    },

    // 根据条件查询房源
    async getCondition(cityId) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      const { data } = await getConditionApi(cityId)
      console.log(data)
      this.houseList = data.body.list
      this.$toast.clear()
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.map {
  width: 100%;
  height: 620px;
}
.van-cell {
  background-color: #c0c0c2;
  height: 65px;
  .van-cell__title {
    font-weight: 700;
    color: #1e1e1e;
    font-size: 14px;
  }
  .van-cell__value {
    font-size: 13px;
    color: #1e1e1e;
  }
}
</style>
