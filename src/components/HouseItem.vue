<template>
  <div class="box" @click="clickFn">
    <div class="houseImg">
      <img :src="`http://liufusong.top:8080${houseitem.houseImg}`" alt="" />
    </div>
    <div class="houseContent">
      <h4>{{ houseitem.title }}</h4>
      <div class="info">{{ houseitem.desc }}</div>
      <van-tag
        class="tag"
        color="#e1f5f8"
        text-color="#39becd"
        type="primary"
        v-for="(tag, index) in houseitem.tags"
        :key="index"
        >{{ tag }}</van-tag
      >
      <div class="item">
        <span>{{ houseitem.price }}</span> 元/月
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    houseitem: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  methods: {
    clickFn() {
      this.$router.push(`/detail/${this.houseitem.houseCode}`)
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  height: 120px;
  position: relative;
  box-sizing: border-box;
  justify-content: space-around;
  padding-top: 18px;
  border-bottom: 1px solid #e5e5e5;

  .houseImg {
    float: left;
    width: 106px;
    height: 80px;
    img {
      width: 106px;
      height: 80px;
    }
  }
  .houseContent {
    overflow: hidden;
    line-height: 22px;
    padding-left: 12px;
    h4 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      color: #394043;
    }
    .info {
      font-size: 12px;
      color: #afb2b3;
    }
    // .tag {
    //   transform: translateY(-3px);
    // }
    .item {
      font-size: 12px;
      color: #fa5741;
      span {
        font-size: 16px;
        font-weight: bolder;
      }
    }
  }
}
</style>
