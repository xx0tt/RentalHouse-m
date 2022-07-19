<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
    />
    <van-swipe-cell v-for="item in newsList" :key="item.id">
      <van-card
        currency=""
        :price="item.date"
        :desc="item.from"
        :title="item.title"
        class="goods-card"
        :thumb="`http://liufusong.top:8080${item.imgSrc}`"
      />
    </van-swipe-cell>
  </div>
</template>

<script>
import { getnewsList } from '@/api'

export default {
  data() {
    return {
      value: '',
      newsList: []
    }
  },
  created() {
    this.getNews()
  },
  methods: {
    async getNews() {
      const { data } = await getnewsList()
      // console.log(data)
      this.newsList = data.body
    }
  }
}
</script>

<style lang="less" scoped>
.goods-card {
  margin: 0;
  background-color: white;
}
.delete-button {
  height: 100%;
}
.van-card {
  font-size: 15px;
}
.van-card__desc {
  font-size: 13px;
  margin-top: 15px;
}
.van-card__price-integer {
  color: #666;
  font-size: 12px;
}
</style>
