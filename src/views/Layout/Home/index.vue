<template>
  <div>
    <!-- 轮播区域 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in swiperList" :key="item.id">
          <template #default>
            <img
              :src="`http://liufusong.top:8080${item.imgSrc}`"
              :alt="item.alt"
            />
          </template>
        </van-swipe-item>
      </van-swipe>
      <van-search
        class="search"
        v-model="value"
        placeholder="请输入小区或地址"
      />
    </div>
    <van-grid>
      <van-grid-item icon="wap-home-o" text="整租" />
      <van-grid-item icon="friends-o" text="合租" />
      <van-grid-item icon="location-o" text="地图找房" />
      <van-grid-item icon="home-o" text="去出租" />
    </van-grid>
  </div>
</template>

<script>
import { swiperApi } from '@/api/home'
export default {
  data() {
    return {
      swiperList: [],
      value: ''
    }
  },
  async created() {
    try {
      const { data } = await swiperApi()
      console.log(data.body)
      this.swiperList = data.body
    } catch (error) {
      console.log('error', error)
    }
  }
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  height: 212px;
  img {
    width: 100%;
  }
}
.banner {
  position: relative;
  .search {
    height: 34px;
    width: 310px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20px;
  }
}
</style>
