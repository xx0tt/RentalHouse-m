<template>
  <div class="filter_box">
    <!-- 户型 -->
    <div class="huxing">
      <van-cell title="户型" />
      <div class="huxing_val">
        <van-button
          v-for="(item, index) in cityNeed.roomType"
          :class="{ active: roomType.includes(item.value) }"
          :key="index"
          type="default"
          @click="roomTypeFn(item)"
          >{{ item.label }}</van-button
        >
      </div>
    </div>

    <!-- 房屋朝向 -->
    <div class="chaoxiang">
      <van-cell title="朝向" />
      <div class="chaoxiang_val">
        <van-button
          v-for="(item, index) in cityNeed.oriented"
          :class="{ active: oriented.includes(item.value) }"
          :key="index"
          type="default"
          @click="orientedFn(item)"
          >{{ item.label }}</van-button
        >
      </div>
    </div>

    <!-- 楼层 -->
    <div class="louceng">
      <van-cell title="楼层" />
      <div class="louceng_val">
        <van-button
          :class="{ active: floor.includes(item.value) }"
          v-for="(item, index) in cityNeed.floor"
          :key="index"
          type="default"
          @click="floorFn(item)"
          >{{ item.label }}</van-button
        >
      </div>
    </div>

    <!-- 房屋亮点 -->
    <div class="liangdian">
      <van-cell title="房屋亮点" />
      <div class="liangdian_val">
        <van-button
          v-for="(item, index) in cityNeed.characteristic"
          :class="{ active: characteristic.includes(item.value) }"
          :key="index"
          type="default"
          @click="characteristicFn(item)"
          >{{ item.label }}</van-button
        >
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="footer">
      <van-button class="left" @click="leftBtnFN">清除</van-button>
      <van-button class="right" @click="rightBtnFN">确定</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomType: [],
      oriented: [],
      floor: [],
      characteristic: []
    }
  },
  props: ['cityNeed'],
  methods: {
    roomTypeFn(item) {
      if (this.roomType.includes(item.value)) {
        const index = this.roomType.findIndex((ele) => ele === item.value)
        this.roomType.splice(index, 1)
      } else {
        this.roomType.push(item.value)
      }
      console.log(this.roomType)
    },
    orientedFn(item) {
      if (this.oriented.includes(item.value)) {
        const index = this.oriented.findIndex((ele) => ele === item.value)
        this.oriented.splice(index, 1)
      } else {
        this.oriented.push(item.value)
      }
      console.log(this.oriented)
    },
    floorFn(item) {
      if (this.floor.includes(item.value)) {
        const index = this.floor.findIndex((ele) => ele === item.value)
        this.floor.splice(index, 1)
      } else {
        this.floor.push(item.value)
      }
      console.log(this.floor)
    },
    characteristicFn(item) {
      if (this.characteristic.includes(item.value)) {
        const index = this.characteristic.findIndex((ele) => ele === item.value)
        this.characteristic.splice(index, 1)
      } else {
        this.characteristic.push(item.value)
      }
      console.log(this.characteristic)
    },
    leftBtnFN() {
      this.roomType = []
      this.oriented = []
      this.floor = []
      this.characteristic = []
    },
    async rightBtnFN() {
      const more = [
        ...this.roomType,
        ...this.oriented,
        ...this.floor,
        ...this.characteristic
      ].join(',')

      this.$parent.$parent.criteriaQuery.more = more
      this.$parent.$parent.criteriaQuery.start = 1
      this.$parent.$parent.criteriaQuery.end = 11
      this.$parent.$parent.cityList = []
      this.$parent.$parent.Filterpop = false
      await this.$parent.$parent.criteriaQueryHouse(
        this.$parent.$parent.criteriaQuery
      )
    }
  }
}
</script>

<style lang="less" scoped>
.filter_box {
  width: 300px;
  button {
    margin-left: 30px;
    margin-top: 10px;
    width: 110px;
  }
  .huxing,
  .chaoxiang,
  .louceng,
  .liangdian {
    .huxing_val,
    .chaoxiang_val,
    .louceng_val,
    .liangdian_val {
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
      .active.van-button--default {
        background-color: #defaef;
        color: #21b97a;
        border: 0.02667rem solid #21b97a;
      }
    }
  }
  .footer {
    position: sticky;
    bottom: 0;
    width: 100%;
    display: flex;
    z-index: 999;
    height: 55px;

    .right {
      margin-left: 0;
      margin-top: 0;
      background-color: #21b97a;
      flex: 2;
      color: #fff;
      height: 55px;
      font-size: 18px;
    }
    .left {
      margin-left: 0;
      margin-top: 0;
      flex: 1;
      color: #21b97a;
      height: 55px;
      font-size: 18px;
    }
  }
}
</style>
