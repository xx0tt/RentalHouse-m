<template>
  <van-nav-bar
    class="navbar"
    :title="title"
    left-arrow
    @click-left="onClickLeft"
  />
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
// 头部样式
.navbar {
  background-color: #21b97a;
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
  /deep/ .van-icon-arrow-left {
    color: #fff;
  }
}
</style>
