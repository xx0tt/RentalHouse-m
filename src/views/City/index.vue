<template>
  <div>
    <Header title="城市列表" />

    <!-- 列表 -->

    <div class="main">
      <van-index-bar :index-list="indexList">
        <van-index-anchor index="当前城市" />
        <van-cell :title="$store.state.inCity.label" />
        <div v-for="(item, index) in cityFirstName" :key="index">
          <van-index-anchor :index="item" />
          <van-cell
            v-for="(item, index) in cityList[item]"
            :key="index"
            :title="item.label || '暂无城市'"
            @click="getcityInfo(item)"
          />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { getCityList, getHotCity } from '@/api/home'
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
  created() {
    this.getCity()
  },
  computed: {
    // 城市首字母
    cityFirstName() {
      const arr = Object.keys(this.cityList)
      return arr
    },
    // 列表索引
    indexList() {
      const arr = Object.keys(this.cityList)
      arr[0] = '热'
      const newArr = ['#', ...arr]
      return newArr
    }
  },
  methods: {
    // 获取城市列表
    async getCity() {
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

      this.$toast.clear()
    },
    async getcityInfo(item) {
      this.$store.commit('setinCity', { label: item.label, value: item.value })
      this.$router.push('/layout/home')
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
.van-nav-bar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 666;
}
.main {
  padding-top: 40px;
}
</style>
