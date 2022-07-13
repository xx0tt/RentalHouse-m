<template>
  <div>
    <div><router-view></router-view></div>

    <van-tabbar route active-color="#21b97a">
      <van-tabbar-item icon="wap-home-o" to="/layout/home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="search" to="/layout/findhouse"
        >找房</van-tabbar-item
      >
      <van-tabbar-item icon="newspaper-o" to="/layout/information"
        >资讯</van-tabbar-item
      >
      <van-tabbar-item icon="contact" to="/layout/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
