<template>
  <div>
    <Header :fixed="true" title="城市列表" />

    <!-- 列表 -->
    <van-index-bar>
      <div v-for="(item, index) in cityFirstName" :key="index">
        <van-index-anchor :index="item" />
        <van-cell
          v-for="(item, index) in cityList[item]"
          :key="index"
          :title="item.label || '暂无城市'"
          @click="getcityInfo(item.label)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import {
  getCityList,
  getHotCity,
  getCityInfoApi,
  getAreaMapApi
} from '@/api/home'
export default {
  data() {
    return {
      cityList: {
        热门城市: [],
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        H: [],
        I: [],
        J: [],
        K: [],
        L: [],
        M: [],
        N: [],
        O: [],
        P: [],
        Q: [],
        R: [],
        S: [],
        T: [],
        U: [],
        V: [],
        W: [],
        X: [],
        Y: [],
        Z: []
      }
    }
  },
  components: { Header },
  async created() {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    const { data } = await getCityList(1)
    const res = await getHotCity()
    // console.log(res.data.body)
    this.cityList['热门城市'].push(...res.data.body)
    data.body.forEach((item) => {
      this.cityList[item.short.charAt(0).toUpperCase()].push(item)
    })

    for (const k in this.cityList) {
      if (this.cityList[k].length === 0) {
        // delete this.cityList[k]
        this.cityList[k] = ['暂无城市']
      }
    }

    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 1
    })
  },
  computed: {
    cityFirstName() {
      const arr = Object.keys(this.cityList)
      return arr
    }
  },
  methods: {
    async getcityInfo(val) {
      const { data } = await getCityInfoApi(val)
      const res = await getAreaMapApi(data.body.value)
      console.log(res)
      // this.$store.commit('setinCity', data.body)
      // this.$router.push('/layout/home')
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-index-anchor {
  color: #999;
  font-size: 14px;
  padding: 10px 15px;
}
/deep/.van-cell {
  color: #333;
  font-size: 16px;
  border-bottom: 1px solid #eee;
}
</style>
