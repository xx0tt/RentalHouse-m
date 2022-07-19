<template>
  <div>
    <!-- 搜索 -->
    <van-nav-bar left-arrow @click-left="onClickLeft">
      <template #title>
        <div class="search">
          <div class="city">
            <span @click="$router.push('/city')">{{
              $store.state.inCity.label
            }}</span>
            <i class="iconfont icon-xiajiantou"></i>
          </div>
          <van-search v-model="value" placeholder="请输入小区或地址" />
          <i class="iconfont icon-ditu"></i>
        </div>
      </template>
    </van-nav-bar>

    <!-- 选项 -->
    <van-grid clickable :border="false">
      <van-grid-item>
        <template #default>
          <p>区域<span class="iconfont icon-xiajiantou"></span></p>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #default>
          <p>方式<span class="iconfont icon-xiajiantou"></span></p>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #default>
          <p>租金<span class="iconfont icon-xiajiantou"></span></p>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #default>
          <p>筛选<span class="iconfont icon-xiajiantou"></span></p>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 结构展示 -->
    <MyStyle></MyStyle>

    <!-- 展示列表 -->
    <!-- <HouseItem></HouseItem> -->
  </div>
</template>

<script>
// import HouseItem from '@/components/HouseItem.vue'
import MyStyle from './style.vue'
export default {
  data() {
    return {
      value: ''
    }
  },
  components: { MyStyle },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-nav-bar) {
  background-color: #21b97a;
  height: 50px;
}
/deep/.van-nav-bar__arrow {
  color: #fff;
}

.search {
  line-height: 34px;
  display: flex;
  height: 34px;
  width: 320px;
  position: absolute;
  left: 50%;
  transform: translateX(-45%);
  border-radius: 3px;
  top: 8px;
  .city {
    width: 60px;
    background-color: #fff;
    line-height: 30px;
    padding-left: 3px;
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
  .icon-ditu {
    color: #fff;
  }
  .van-search__content {
    background-color: #fff;
  }
  /deep/.van-icon-search {
    color: #ccc;
  }
  /deep/.van-cell {
    transform: translateX(-10px);
  }
}

.van-grid {
  height: 40px;
  .van-grid-item {
    transform: translateY(-8px);
  }

  p {
    font-size: 16px;
  }
  span {
    margin-left: 3px;
    font-size: 12px;
    color: #ccc;
  }
}
</style>
