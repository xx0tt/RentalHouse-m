<template>
  <div class="box">
    <Header title="发布房源" />

    <van-cell-group>
      <van-field class="title" label="房源信息" readonly
    /></van-cell-group>
    <!-- 小区名称 -->
    <van-cell-group>
      <van-field
        @click="$router.push('/rent/search')"
        label="小区名称"
        :value="villageName"
        placeholder="请输入小区名称"
        readonly
      />
    </van-cell-group>
    <!-- 租金 -->
    <van-cell-group>
      <van-field v-model="price" label="租  金" placeholder="请输入租金/月">
        <template #right-icon>￥/月</template>
      </van-field>
    </van-cell-group>
    <!-- 建筑面积 -->
    <van-cell-group>
      <van-field v-model="size" label="建筑面积" placeholder="请输入建筑面积">
        <template #right-icon>㎡</template>
      </van-field>
    </van-cell-group>
    <!-- 选择框 -->

    <!-- 户型 -->
    <van-field
      readonly
      clickable
      is-link
      name="huxing"
      :value="huxing"
      label="户  型"
      placeholder="请选择"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="roomType"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <!-- 户型 -->

    <!-- 所在楼层 -->
    <van-field
      readonly
      is-link
      clickable
      name="louceng"
      :value="louceng"
      label="所在楼层"
      placeholder="请选择"
      @click="showPicker1 = true"
    />
    <van-popup v-model="showPicker1" position="bottom">
      <van-picker
        show-toolbar
        :columns="floor"
        @confirm="onConfirm1"
        @cancel="showPicker1 = false"
      />
    </van-popup>
    <!-- 所在楼层 -->

    <!-- 朝向 -->
    <van-field
      readonly
      clickable
      is-link
      name="chaoxiang"
      :value="chaoxiang"
      label="朝向"
      placeholder="请选择"
      @click="showPicker2 = true"
    />
    <van-popup v-model="showPicker2" position="bottom">
      <van-picker
        show-toolbar
        :columns="oriented"
        @confirm="onConfirm2"
        @cancel="showPicker2 = false"
      />
    </van-popup>
    <!--  朝向 -->

    <!-- 选择框 -->

    <!-- 房屋标题 -->
    <van-cell-group>
      <van-field label="房屋标题" readonly />
      <van-field
        v-model="title"
        rows="1"
        autosize
        type="textarea"
        placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
    /></van-cell-group>

    <!-- 房屋图像 -->
    <van-cell-group> <van-field label="房屋图像" readonly /></van-cell-group>
    <van-field name="houseImg">
      <template #input>
        <van-uploader
          @delete="deleteImg"
          v-model="houseImg"
          :after-read="afterRead"
        />
      </template>
    </van-field>

    <!-- 房屋配置 -->
    <van-cell-group> <van-field label="房屋配置" readonly /></van-cell-group>
    <van-grid :border="false" :column-num="5" class="MyIcon">
      <van-grid-item
        :class="{ Myavtive: supporting.includes('衣柜') }"
        text="衣柜"
        @click="addApp('衣柜')"
      >
        <template #icon>
          <p class="iconfont icon-yigui1"></p>
        </template>
      </van-grid-item>
      <van-grid-item
        :class="{ Myavtive: supporting.includes('洗衣机') }"
        text="洗衣机"
        @click="addApp('洗衣机')"
      >
        <template #icon> <p class="iconfont icon-xiyiji"></p> </template
      ></van-grid-item>
      <van-grid-item
        :class="{ Myavtive: supporting.includes('空调') }"
        text="空调"
        @click="addApp('空调')"
      >
        <template #icon> <p class="iconfont icon-kongdiao"></p> </template
      ></van-grid-item>
      <van-grid-item
        :class="{ Myavtive: supporting.includes('天然气') }"
        text="天然气"
        @click="addApp('天然气')"
      >
        <template #icon> <p class="iconfont icon-meiqitianranqi"></p> </template
      ></van-grid-item>
      <van-grid-item
        :class="{ Myavtive: supporting.includes('冰箱') }"
        text="冰箱"
        @click="addApp('冰箱')"
      >
        <template #icon> <p class="iconfont icon-bingxiang"></p> </template
      ></van-grid-item>
      <van-grid-item
        :class="{ Myavtive: supporting.includes('暖气') }"
        text="暖气"
        @click="addApp('暖气')"
      >
        <template #icon> <p class="iconfont icon-nuanqi"></p> </template
      ></van-grid-item>
      <van-grid-item
        :class="{ Myavtive: supporting.includes('电视') }"
        text="电视"
        @click="addApp('电视')"
      >
        <template #icon> <p class="iconfont icon-dianshiji"></p> </template
      ></van-grid-item>
      <van-grid-item
        :class="{ Myavtive: supporting.includes('热水器') }"
        text="热水器"
        @click="addApp('热水器')"
      >
        <template #icon>
          <p
            class="iconfont icon-haofangtuo400iconfont2reshuiqi"
          ></p> </template
      ></van-grid-item>
      <van-grid-item
        :class="{ Myavtive: supporting.includes('宽带') }"
        text="宽带"
        @click="addApp('宽带')"
      >
        <template #icon> <p class="iconfont icon-wifi"></p> </template
      ></van-grid-item>
      <van-grid-item
        :class="{ Myavtive: supporting.includes('沙发') }"
        text="沙发"
        @click="addApp('沙发')"
      >
        <template #icon> <p class="iconfont icon-shafa"></p> </template
      ></van-grid-item>
    </van-grid>

    <div class="housemsg">
      <van-cell-group>
        <van-field label="房屋描述" readonly />
      </van-cell-group>
      <van-field
        v-model="description"
        rows="1"
        :autosize="{ minHeight: 100 }"
        type="textarea"
        placeholder="请输入房屋描述信息"
      />
    </div>

    <div class="footer">
      <van-button style="color: #21b97a" @click="leftFn">取消</van-button>
      <van-button color="#21b97a" @click="submitHouse">提交</van-button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { AddHouses, AddHouseNeedApi, HouseImgApi } from '@/api'
export default {
  name: 'AddRent',
  data() {
    return {
      community: '', // 小区数据
      villageName: '', // 小区名称
      price: '', // 租金
      size: '', // 面积
      huxing: '',
      louceng: '',
      chaoxiang: '',
      roomType: ['一室', '二室', '三室', '四室', '四室+'],
      floor: ['高楼层', '中楼层', '低楼层'],
      oriented: ['东', '西', '南', '北', '东南', '东北', '西南', '西北'],
      showPicker: false,
      showPicker1: false,
      showPicker2: false,
      title: '', // 房屋标题
      houseImg: [], // 房屋图像
      supporting: [], // 房屋配置
      description: '', // 房屋描述
      houseImgArr: [], // 上传房屋图像
      floorList: [],
      orientedList: [],
      roomTypeList: [],
      supportingList: []
    }
  },
  async created() {
    // 获取房屋配置必须项
    try {
      const { data } = await AddHouseNeedApi()

      this.floorList = data.body.floor
      this.orientedList = data.body.oriented
      this.roomTypeList = data.body.roomType
      this.supportingList = data.body.supporting
    } catch (error) {
      console.log('发布房屋', error)
    }
  },
  components: { Header },
  methods: {
    onConfirm(value) {
      this.huxing = value
      this.showPicker = false
    },
    onConfirm1(value) {
      this.louceng = value
      this.showPicker1 = false
    },
    onConfirm2(value) {
      this.chaoxiang = value
      this.showPicker2 = false
    },

    // 取消编辑按钮
    leftFn() {
      this.$dialog
        .confirm({
          title: '标题',
          message: '放弃发布房源？',
          confirmButtonText: '继续编辑', // then
          confirmButtonColor: '#108ee9',
          cancelButtonText: '放弃' // catch
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          this.$router.push({ path: '/layout/home' })
        })
    },

    // 添加/取消 电器
    addApp(val) {
      // 查看该数组中是否包含该电器，如果有，则删除
      if (this.supporting.includes(val)) {
        const index = this.supporting.findIndex((item) => item === val)
        this.supporting.splice(index, 1)
      } else {
        this.supporting.push(val)
      }
    },

    // 获取图片
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const formData = new FormData()
      formData.append('file', file.file)

      const { data } = await HouseImgApi(formData)

      this.houseImgArr.push(data.body[0])
    },

    // 删除图片
    deleteImg(file, detail) {
      this.houseImgArr.splice(detail.index, 1)
      console.log(this.houseImgArr)
    },

    // 提交
    async submitHouse() {
      if (!this.houseImgArr) return this.$toast('请先上传房源图片')
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      const oriented = this.orientedList.filter(
        (item) => item.label === this.chaoxiang
      )
      const roomType = this.roomTypeList.filter(
        (item) => item.label === this.huxing
      )
      const floor = this.floorList.filter((item) => item.label === this.louceng)

      const res = await AddHouses({
        title: this.title, // 标题 =
        description: this.description, // 描述 =
        houseImg: this.houseImgArr.join('|'), // 房屋图片
        oriented: oriented[0].value, // 朝向 =
        supporting: this.supporting.join('|'), // 电器 =
        price: this.price, // 价格 =
        roomType: roomType[0].value, // 户型 =
        size: this.size, // 面积 =
        floor: floor[0].value, // 楼层
        community: this.community // 地址
      })
      if (res.data.status !== 200) return this.$toast.fail('发布失败！')
      if (res.data.status === 200) {
        this.$toast.clear()

        this.$dialog
          .confirm({
            title: '提示',
            message: '房源发布成功',
            confirmButtonText: '继续发布',
            confirmButtonColor: '#108ee9',
            cancelButtonText: '去查看'
          })
          .then(() => {
            // 继续发布  全部清空
            this.community = ''
            this.villageName = ''
            this.price = ''
            this.size = ''
            this.huxing = ''
            this.louceng = ''
            this.chaoxiang = ''
            this.title = ''
            this.houseImg = []
            this.supporting = []
            this.description = ''
            this.houseImgArr = []
          })
          .catch(() => {
            console.log('取消')
            // 去查看
            this.$router.push('/layout/findhouse')
          })
      }
    }
  },
  // 激活后
  activated() {
    // 获取小区数据
    this.community = this.$route.params.community
    this.villageName = this.$route.params.villageName
  }
}
</script>

<style lang="less" scoped>
.box {
  background-color: #f6f5f6;
}
/deep/.title {
  span {
    color: #21b97a;
  }
}
/deep/.van-picker__cancel,
/deep/.van-picker__confirm {
  color: #108ee9;
  font-size: 17px;
}
.img-icon {
  height: 20px;
}
.MyIcon .iconfont {
  font-size: 30px;
  margin-bottom: 10px;
}
.housemsg {
  padding-bottom: 25px;
  margin-top: 20px;
}
.footer {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  button {
    flex: 1;
    height: 45px;
  }
}

.Myavtive {
  .van-grid-item__content {
    .van-grid-item__icon-wrapper {
      p.iconfont {
        color: #21b97a;
      }
    }
  }
}
.Myavtive /deep/.van-grid-item__text {
  color: #21b97a;
}
</style>
