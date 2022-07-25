<template>
  <div>
    <!-- 搜索 -->
    <van-nav-bar left-arrow @click-left="onClickLeft">
      <template #title>
        <div class="search">
          <div class="city">
            <span @click="$router.push('/city')">{{
              $store.state.inCity.label
            }}</span>
            <i class="iconfont icon-xiajiantou"></i>
          </div>
          <van-search disabled v-model="value" placeholder="请输入小区或地址" />
          <i class="iconfont icon-ditu"></i>
        </div>
      </template>
    </van-nav-bar>

    <div class="my-main">
      <!-- 选项 -->
      <van-grid clickable :border="false">
        <van-grid-item @click="areaClickFn">
          <template #default>
            <p>区域<span class="iconfont icon-xiajiantou"></span></p>
          </template>
        </van-grid-item>
        <van-grid-item @click="modeClickFn">
          <template #default>
            <p>方式<span class="iconfont icon-xiajiantou"></span></p>
          </template>
        </van-grid-item>
        <van-grid-item @click="MoneyClickFn">
          <template #default>
            <p>租金<span class="iconfont icon-xiajiantou"></span></p>
          </template>
        </van-grid-item>
        <van-grid-item @click="FilterClickFn">
          <template #default>
            <p>筛选<span class="iconfont icon-xiajiantou"></span></p>
          </template>
        </van-grid-item>
      </van-grid>

      <!-- 结构展示 -->
      <div class="jiegou">
        <van-popup v-model="showPicker">
          <Area v-if="showCom === 'area'" :columns="columns"></Area>
          <Mode v-if="showCom === 'mode'"></Mode>
          <Money v-if="showCom === 'money'" :columns="cityNeed.price"></Money>
        </van-popup>
      </div>
      <van-popup
        v-model="Filterpop"
        position="right"
        :style="{ height: '100%' }"
        ><MyFilter :cityNeed="cityNeed"></MyFilter>
      </van-popup>
    </div>

    <!-- 展示列表 -->
    <div class="my_content">
      <van-empty v-if="cityList.length === 0" description="暂无房源" />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <HouseItem
          v-for="(item, index) in cityList"
          :key="index"
          :houseitem="item"
        ></HouseItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import HouseItem from '@/components/HouseItem.vue'
import Area from './components/Area.vue'
import Mode from './components/mode.vue'
import Money from './components/Money.vue'
import MyFilter from './components/Filter.vue'
import { houseNeed, criteriaQueryHouse } from '@/api'
export default {
  data() {
    return {
      value: '',
      columns: [],
      cityNeed: {},
      showPicker: false,
      Filterpop: false, // false
      showCom: '',
      cityList: [],
      loading: false,
      finished: false,
      criteriaQuery: {
        cityId: this.$store.state.inCity.value,
        // area: '', // 地区
        // subway: '', // 地铁
        // rentType: '', // 整租
        // price: '', // 价格
        // more: '', // 复合查询
        // roomType: '', // 房屋类型
        // oriented: '', // 朝向
        // characteristic: '', // 标签
        // floor: '', // 楼层
        start: 1, // 开始项
        end: 11 // 结束项
      }
    }
  },
  components: { Area, HouseItem, Mode, Money, MyFilter },
  async created() {
    await this.getHouseNeed()
    await this.criteriaQueryHouse({
      cityId: this.$store.state.inCity.value,
      start: 1,
      end: 11
    })
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },

    // LIST 加载
    async onLoad() {
      if (this.criteriaQuery.start === 1) return (this.loading = false)
      await this.criteriaQueryHouse(this.criteriaQuery)
      this.loading = false
    },
    // 获取房屋筛选必须条件
    async getHouseNeed() {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        const { data } = await houseNeed(this.$store.state.inCity.value)
        this.cityNeed = data.body
        this.columns.push(
          JSON.parse(
            JSON.stringify(this.cityNeed.area).replace(/label/gi, 'text')
          )
        )
        this.columns.push(
          JSON.parse(
            JSON.stringify(this.cityNeed.subway).replace(/label/gi, 'text')
          )
        )
        this.columns[0].children[0].children = [{ text: '' }]
        this.columns[1].children[0].children = [{ text: '' }]
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 1
        })
      } catch (error) {
        console.log(error.response.data)
        this.$toast.fail('请求错误，请稍后重试')
      }
    },

    // 根据条件筛选房屋
    async criteriaQueryHouse(obj) {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        const { data } = await criteriaQueryHouse(obj)
        console.log(data)
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 1
        })
        if (data.body.list.length === 0) return (this.finished = true)
        this.cityList.push(...data.body.list)
        this.criteriaQuery.start = this.criteriaQuery.start + 11
        this.criteriaQuery.end = this.criteriaQuery.start + 10
      } catch (error) {
        console.log('房屋条件查询', error)
        this.$toast.fail('查询失败，请稍后再试')
      }
    },
    areaClickFn() {
      this.showPicker = true
      this.showCom = 'area'
    },
    modeClickFn() {
      this.showPicker = true
      this.showCom = 'mode'
    },
    MoneyClickFn() {
      this.showPicker = true
      this.showCom = 'money'
    },
    FilterClickFn() {
      this.Filterpop = true
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-nav-bar) {
  background-color: #21b97a;
  height: 50px;
}
/deep/.van-nav-bar__arrow {
  color: #fff;
}

.search {
  line-height: 34px;
  display: flex;
  height: 34px;
  width: 320px;
  position: absolute;
  left: 50%;
  transform: translateX(-45%);
  border-radius: 3px;
  top: 8px;
  .city {
    width: 60px;
    background-color: #fff;
    line-height: 30px;
    padding-left: 3px;
    text-align: center;
    span {
      margin-left: 2.5px;
      font-size: 14px;
    }
    i.iconfont {
      height: 20px;
      margin-left: 2px;
      padding-right: 10px;
      font-size: 14px;
      color: #666;
      border-right: 1px solid #666;
    }
  }
  i.iconfont {
    font-size: 25px;
    margin-left: 10px;
  }
  .icon-ditu {
    color: #fff;
  }
  .van-search__content {
    background-color: #fff;
  }
  /deep/.van-icon-search {
    color: #ccc;
  }
  /deep/.van-cell {
    transform: translateX(-10px);
  }
}
.my_content {
  padding-left: 10px;
  padding-right: 10px;
}

.my-main {
  margin-top: 10px;
  position: sticky;
  top: 0;
  z-index: 99;
  .jiegou {
    .van-popup {
      width: 100%;
      height: 368px;
    }
    /deep/.van-popup--center {
      top: 43%;
    }
  }
}

.van-grid {
  height: 40px;
  .van-grid-item {
    transform: translateY(-8px);
  }

  p {
    font-size: 16px;
  }
  span {
    margin-left: 3px;
    font-size: 12px;
    color: #ccc;
  }
}
/deep/.van-picker__confirm {
  background-color: #21b97a;
  flex: 2;
  color: #fff;
  font-size: 18px;
}
/deep/.van-picker__cancel {
  flex: 1;
  color: #21b97a;
  font-size: 18px;
}
/deep/.van-picker__toolbar {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  transform: translateY(700%);
  display: flex;
}
</style>
