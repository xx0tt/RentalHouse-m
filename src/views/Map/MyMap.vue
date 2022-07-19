<template>
  <baidu-map :center="center" :zoom="zoom">
    <!-- 比例尺 -->
    <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
    <!-- 缩放按钮 -->
    <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>

    <!-- 标签 -->
    <bm-label
      v-for="(item, index) in cityList"
      :key="index"
      :content="`<p>${item.label}</p><p>${item.count}套</p>`"
      :position="{ lng: item?.coord?.longitude, lat: item?.coord?.latitude }"
      :labelStyle="{ color: '#fff', fontSize: '12px' }"
      @click="clickFn(item)"
    />
  </baidu-map>
</template>
<script>
export default {
  data() {
    return {
      center: this.$store.state.inCity.label,
      zoom: 11,
      num: 0 // 2,
    }
  },
  props: {
    cityList: {
      type: Array,
      required: true
    }
  },
  methods: {
    clickFn(item) {
      this.center = { lng: item.coord?.longitude, lat: item?.coord?.latitude }
      this.zoom = 14
      this.num++
      console.log(this.num)
      // 调用父级的方法重新获取数据
      this.$parent.getAreaMap(item.value)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.BMapLabel {
  background-color: #1db879 !important;
  border-radius: 50%;
  // line-height: 20px !important;
  text-align: center;
  width: 60px;
  height: 60px;
  border: 2px solid #fff !important;
  p {
    margin-top: 7px;
  }
}
</style>
