<template>
  <baidu-map
    :center="{ lng: coord?.longitude, lat: coord?.latitude }"
    :zoom="15"
  >
    <bm-label
      :content="community"
      :position="{ lng: coord?.longitude, lat: coord?.latitude }"
      :labelStyle="{ color: 'red', fontSize: '24px' }"
    />
  </baidu-map>
</template>
<script>
export default {
  props: {
    coord: {
      type: Object
    },
    community: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.BMapLabel {
  background-color: rgb(238, 93, 91) !important;
  font-size: 12px !important;
  color: #fff !important;
  height: 16px !important;
  padding: 5px 10px !important;
}
</style>
