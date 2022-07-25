<template>
  <div>
    <van-picker
      show-toolbar
      :columns="newColumns"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['columns'],
  methods: {
    async onConfirm(value, index) {
      const price = this.columns[index].value
      this.$parent.$parent.criteriaQuery.price = price
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
  },
  computed: {
    newColumns() {
      const arr = []
      this.columns.forEach((item) => {
        arr.push(item.label)
      })
      return arr
    }
  }
}
</script>

<style></style>
