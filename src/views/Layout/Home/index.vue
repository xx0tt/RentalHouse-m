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

      <div class="search">
        <div class="city">
          <span @click="$router.push('/city')">{{
            $store.state.inCity.label
          }}</span>
          <i class="iconfont icon-xiajiantou"></i>
        </div>
        <van-search v-model="value" placeholder="请输入小区或地址" />
        <i class="iconfont icon-ditu" @click="$router.push('/map')"></i>
      </div>
    </div>

    <van-grid>
      <van-grid-item>
        <template #default>
          <div class="box">
            <img src="../../../assets/img/home.png" alt="" />
            <p>整租</p>
          </div>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #default>
          <div class="box">
            <img src="../../../assets/img/hezu.png" alt="" />
            <p>合租</p>
          </div>
        </template>
      </van-grid-item>
      <van-grid-item to="/map">
        <template #default>
          <div class="box">
            <img src="../../../assets/img/map.png" alt="" />
            <p>地图找房</p>
          </div>
        </template>
      </van-grid-item>
      <van-grid-item to="/rent/addrent">
        <template #default>
          <div class="box">
            <img src="../../../assets/img/chuzu.png" alt="" />
            <p>去出租</p>
          </div>
        </template>
      </van-grid-item>
    </van-grid>

    <div class="team">
      <div class="title">
        <h3>租房小组</h3>
        <span>更多</span>
      </div>
      <van-grid :column-num="2" :gutter="5">
        <van-grid-item v-for="item in groupList" :key="item.id">
          <template #default>
            <div class="item">
              <img :src="`http://liufusong.top:8080${item.imgSrc}`" alt="" />
              <div>
                <p>{{ item.title }}</p>
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { swiperApi, getGroups, getUserInfo } from '@/api'
export default {
  data() {
    return {
      swiperList: [],
      value: '',
      groupList: []
    }
  },
  async created() {
    try {
      const res = await swiperApi()
      const res2 = await getGroups(this.$store.state.inCity.value)

      this.swiperList = res.data.body
      this.groupList = res2.data.body

      await this.getUser()
    } catch (error) {
      console.log('error', error)
    }
  },
  methods: {
    // 获取用户信息
    async getUser() {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        if (!data.body) return this.$store.commit('setToken', '')
      } catch (error) {
        console.log('登录错误', error)
      }
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
    line-height: 34px;
    display: flex;
    height: 34px;
    width: 320px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20px;
    .city {
      width: 60px;
      background-color: #fff;
      line-height: 30px;
      text-align: center;
      span {
        margin-left: 2.5px;
        font-size: 14px;
      }
      i.iconfont {
        height: 20px;
        margin-left: 2px;
        padding-right: 10px;
        font-size: 14px;
        color: #666;
        border-right: 1px solid #666;
      }
    }
    i.iconfont {
      font-size: 25px;
      margin-left: 10px;
    }
  }
}
.box {
  height: 72px;
  // background-color: pink;
  text-align: center;
  img {
    width: 60px;
    height: 60px;
  }
  p {
    font-size: 14px;
  }
}
.team {
  padding: 10px;
  background-color: #f6f5f6;
  .title {
    // background-color: pink;
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: 15px;
      font-weight: 700;
    }
    span {
      font-size: 14px;
    }
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 60px;
      height: 50px;
      margin-right: 10px;
    }
    p {
      font-size: 14px;
    }
  }
}
</style>
