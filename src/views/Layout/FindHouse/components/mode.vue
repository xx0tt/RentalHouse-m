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
  data() {
    return {
      columns: ['不限', '整租', '合租']
    }
  },
  methods: {
    async onConfirm(value, index) {
      const rentType = [null, true, false][index]
      this.$parent.$parent.criteriaQuery.rentType = rentType
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

<style></style>
