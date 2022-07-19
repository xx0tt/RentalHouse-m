<template>
  <baidu-map
    class="map"
    :center="center"
    :zoom="zoom"
    @ready="handler"
    :double-click-zoom="false"
  >
    <!-- 地图控件 放大缩小 -->
    <bm-navigation
      anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
      type="BMAP_NAVIGATION_CONTROL_LARGE"
    ></bm-navigation>

    <!-- 标签 -->
    <bm-label
      v-for="(item, index) in cityList"
      :key="index"
      :content="`<p>${item.label}</p><p>${item.count}套</p>`"
      :position="{
        lng: '116.41' && item && item.coord && item.coord.longitude,
        lat: '39.915' && item && item.coord && item.coord.latitude
      }"
      :labelStyle="{ color: '#fff', fontSize: '12px' }"
      @click="clickFn(item.value, item.coord)"
    />
  </baidu-map>
</template>
<script>
export default {
  data() {
    return {
      center: { lng: 116.41, lat: 39.915 },
      zoom: 11
    }
  },
  props: {
    cityList: {
      type: Array,
      required: true
    }
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = this.area.lng
      this.center.lat = this.area.lat
    },
    // 被点击后，激活父级内部事件，并把城市id传递给父级
    clickFn(val, coord) {
      this.center.lng = coord.longitude
      this.center.lat = coord.latitude
      this.zoom = 13
      this.$emit('Myclick', val)
    }
  },
  computed: {
    area() {
      const val = this.$store.state.inCity.label
      switch (val) {
        case '北京':
          return {
            lng: 116.41,
            lat: 39.915
          }
        case '上海':
          return {
            lng: 121.48,
            lat: 31.237
          }
        case '深圳':
          return {
            lng: 114.06,
            lat: 22.548
          }
        case '广州':
          return {
            lng: 113.27,
            lat: 23.136
          }
      }
      return {
        lng: 116.41,
        lat: 39.915
      }
    }
  }
}
</script>

<style lang="less" scoped>
.map {
  width: 100%;
  height: 621px;
}
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
