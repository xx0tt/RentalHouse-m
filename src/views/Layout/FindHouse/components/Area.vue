<template>
  <div>
    <van-picker
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    async onConfirm(value, index) {
      const area =
        this.columns[index[0]]?.children[index[1]]?.children[index[2]].value !==
        'null'
          ? this.columns[index[0]]?.children[index[1]]?.children[index[2]].value
          : this.columns[index[0]]?.children[index[1]].value

      if (index[0] === 1) {
        this.$parent.$parent.criteriaQuery.subway = area
        delete this.$parent.$parent.criteriaQuery.area
      } else {
        this.$parent.$parent.criteriaQuery.area = area
        delete this.$parent.$parent.criteriaQuery.subway
      }
      this.$parent.$parent.criteriaQuery.start = 1
      this.$parent.$parent.criteriaQuery.end = 11
      this.$parent.$parent.cityList = []
      this.$parent.$parent.showPicker = false
      await this.$parent.$parent.criteriaQueryHouse(
        this.$parent.$parent.criteriaQuery
      )
    },

    onCancel() {
      this.$parent.$parent.showPicker = false
    }
  }
}
</script>

<style lang="less" scoped></style>
