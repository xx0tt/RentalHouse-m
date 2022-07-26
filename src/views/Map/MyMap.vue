<template>
  <baidu-map :center="center" :zoom="zoom">
    <!-- 比例尺 -->
    <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
    <!-- 缩放按钮 -->
    <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>

    <!-- 标签 -->
    <div v-if="isLoding">
      <template v-if="num >= 3">
        <bm-label
          v-for="(item, index) in cityList"
          :key="index"
          :content="`${item.label} <span style='margin-left:8px'>${item.count}</span>套`"
          :position="{
            lng: item?.coord?.longitude,
            lat: item?.coord?.latitude
          }"
          :labelStyle="{
            width: '100px',
            height: '20px',
            color: '#fff',
            fontSize: '12px',
            backgroundColor: 'rgba(12,181,106,.9)',
            'border-radius': '3px',
            padding: '0 6px',
            border: '1px solid #fff'
          }"
          @click="clickFn(item)"
        />
      </template>

      <!-- 圆点 -->
      <template v-else>
        <bm-label
          v-for="(item, index) in cityList"
          :key="index"
          :content="`<p style='padding-top:13px'>${item.label}</p><p>${item.count}套</p>`"
          :position="{
            lng: item?.coord?.longitude,
            lat: item?.coord?.latitude
          }"
          :labelStyle="{
            color: '#fff',
            fontSize: '12px',
            'background-color': '#1db879',
            'border-radius': '50%',
            'text-align': 'center',
            width: '60px',
            height: '60px',
            border: '2px solid #fff'
          }"
          @click="clickFn(item)"
        />
      </template>
    </div>
  </baidu-map>
</template>
<script>
export default {
  data() {
    return {
      center: this.$store.state.inCity.label,
      num: 0, // 3,
      isLoding: true
    }
  },
  props: {
    cityList: {
      type: Array,
      required: true
    }
  },
  methods: {
    async clickFn(item) {
      this.isLoding = false

      this.center = { lng: item?.coord?.longitude, lat: item?.coord?.latitude }

      if (this.num >= 3) {
        // 调用父级条件查询
        await this.$parent.getCondition(item.value)
      } else {
        // 调用父级的方法重新获取数据
        await this.$parent.getAreaMap(item.value)
      }

      this.isLoding = true
    }
  },
  computed: {
    zoom() {
      if (this.num <= 1) return 11
      if (this.num <= 2) return 13
      if (this.num >= 3) return 15

      return 11
    }
  }
}
</script>

<style lang="less" scoped></style>
