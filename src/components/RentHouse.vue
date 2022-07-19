<template>
  <div class="bigbox">
    <!-- 头部 -->
    <Header :title="HouseInfo.community || ''" />

    <main>
      <!-- 图片区域 -->
      <!-- :autoplay="3000" -->
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item
          ><van-image
            v-for="(item, index) in HouseInfo.houseImg"
            :key="index"
            width="100%"
            height="250px"
            :src="`http://liufusong.top:8080${item}`"
        /></van-swipe-item>
      </van-swipe>

      <!-- 房屋信息 -->
      <div class="house-info">
        <van-row type="flex" class="vant_row">
          <!-- 标题 -->
          <van-col span="8">
            <p class="title">{{ HouseInfo.community }}</p>
            <van-tag
              color="#39becd"
              v-for="(item, index) in HouseInfo.tags"
              :key="index"
              >{{ item }}</van-tag
            >
          </van-col>
          <!-- 租金房型面积 -->
          <van-col span="8">
            <van-grid :border="false" :column-num="3">
              <van-grid-item>
                <h4>{{ HouseInfo.price }}/月</h4>
                <p>租金</p>
              </van-grid-item>
              <van-grid-item>
                <h4>{{ HouseInfo.roomType }}</h4>
                <p>房型</p>
              </van-grid-item>
              <van-grid-item>
                <h4>{{ HouseInfo.size || '20' }}平米</h4>
                <p>面积</p>
              </van-grid-item>
            </van-grid>
          </van-col>
          <!-- 装修楼层朝向 -->
          <van-col span="8">
            <van-grid :border="false" :column-num="2">
              <van-grid-item>
                <div><span>装修：</span><i>精装</i></div>
                <div>
                  <span>楼层：</span><i>{{ HouseInfo.floor }}</i>
                </div>
              </van-grid-item>
              <van-grid-item>
                <div>
                  <span>朝向：</span><i>{{ HouseInfo?.oriented?.[0] }}</i>
                </div>
                <div><span>类型：</span><i>普通住宅</i></div>
              </van-grid-item>
            </van-grid>
          </van-col>
        </van-row>
      </div>

      <!--  地图  -->
      <div class="map">
        <p>小区：天山星城</p>
        <div>map区域</div>
      </div>

      <!-- 房屋配套 -->
      <div class="homeConfig head">
        <h4>房屋配套</h4>
        <div>
          <van-grid :border="false" :column-num="5" class="MyIcon">
            <van-grid-item
              v-if="HouseInfo?.supporting?.includes('衣柜')"
              text="衣柜"
            >
              <template #icon>
                <p class="iconfont icon-yigui1"></p>
              </template>
            </van-grid-item>
            <van-grid-item
              v-if="HouseInfo?.supporting?.includes('洗衣机')"
              text="洗衣机"
            >
              <template #icon> <p class="iconfont icon-xiyiji"></p> </template
            ></van-grid-item>
            <van-grid-item
              v-if="HouseInfo?.supporting?.includes('空调')"
              text="空调"
            >
              <template #icon> <p class="iconfont icon-kongdiao"></p> </template
            ></van-grid-item>
            <van-grid-item
              v-if="HouseInfo?.supporting?.includes('天然气')"
              text="天然气"
            >
              <template #icon>
                <p class="iconfont icon-meiqitianranqi"></p> </template
            ></van-grid-item>
            <van-grid-item
              v-if="HouseInfo?.supporting?.includes('冰箱')"
              text="冰箱"
            >
              <template #icon>
                <p class="iconfont icon-bingxiang"></p> </template
            ></van-grid-item>
            <van-grid-item
              v-if="HouseInfo?.supporting?.includes('暖气')"
              text="暖气"
            >
              <template #icon> <p class="iconfont icon-nuanqi"></p> </template
            ></van-grid-item>
            <van-grid-item
              v-if="HouseInfo?.supporting?.includes('电视')"
              text="电视"
            >
              <template #icon>
                <p class="iconfont icon-dianshiji"></p> </template
            ></van-grid-item>
            <van-grid-item
              v-if="HouseInfo?.supporting?.includes('热水器')"
              text="热水器"
            >
              <template #icon>
                <p
                  class="iconfont icon-haofangtuo400iconfont2reshuiqi"
                ></p> </template
            ></van-grid-item>
            <van-grid-item
              v-if="HouseInfo?.supporting?.includes('宽带')"
              text="宽带"
            >
              <template #icon> <p class="iconfont icon-wifi"></p> </template
            ></van-grid-item>
            <van-grid-item
              v-if="HouseInfo?.supporting?.includes('沙发')"
              text="沙发"
            >
              <template #icon> <p class="iconfont icon-shafa"></p> </template
            ></van-grid-item>
          </van-grid>
        </div>
      </div>

      <!-- 房源概况 -->
      <div class="desc head">
        <h4>房源概况</h4>
        <div>
          <!-- 销售头像 -->
          <van-cell>
            <!-- 左侧头像 -->
            <template #title>
              <van-image
                round
                fit="cover"
                width="52"
                height="52"
                src="http://liufusong.top:8080/img/avatar.png"
              />
              <div class="info">
                <p>王女士</p>
                <span><van-icon name="shield-o" /> 已认证房主</span>
              </div>
            </template>
            <!-- 右侧按钮 -->
            <template #default>
              <van-button plain type="primary" size="small">发消息</van-button>
            </template>
          </van-cell>
          <!-- 房源描述内容 -->
          <div class="text">
            1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
            2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
            3.人车分流，环境优美。
            4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
          </div>
        </div>
      </div>

      <!-- 猜你喜欢 -->
      <div class="like head">
        <h4>猜你喜欢</h4>
        <div>
          <HouseItem
            v-for="(item, index) in fakeHouseItem"
            :key="index"
            :houseitem="item"
          ></HouseItem>
        </div>
      </div>
    </main>

    <!-- 底部区域 -->
    <footer>
      <van-button
        :class="{ SCactiv: isFavorite }"
        icon="star"
        block
        @click="FavoriteFn"
        >收藏</van-button
      >
      <van-button block>在线咨询</van-button>
      <van-button color="#21b97a" block>电话预约</van-button>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import HouseItem from './HouseItem.vue'
import {
  getHouseInfoApi,
  isFavoritesApi,
  addFavoritesApi,
  delFavoritesApi
} from '@/api'
export default {
  data() {
    return {
      HouseInfo: {},
      isFavorite: false,
      fakeHouseItem: [
        {
          houseImg: '/img/message/1.png',
          title: '安贞西里 3室1厅',
          tags: ['随时看房'],
          price: 4500,
          desc: '72.32㎡/南 北/低楼层',
          houseCode: 'bda209b1-5bda-e7da'
        },
        {
          houseImg: '/img/message/2.png',
          title: '天居园 2室1厅',
          tags: ['近地铁'],
          price: 7200,
          desc: '83㎡/南/高楼层',
          houseCode: '69c4d5ff-7015-5464'
        },
        {
          houseImg: '/img/message/3.png',
          title: '角门甲4号院 1室1厅',
          tags: ['集中供暖'],
          price: 4300,
          desc: '52㎡/西南/低楼层',
          houseCode: 'df999a5c-3a3f-ac2a'
        }
      ]
    }
  },
  async created() {
    await this.getHouseInfo()
    await this.isFavorites()
  },
  components: { Header, HouseItem },
  methods: {
    // 获取房屋具体信息
    async getHouseInfo() {
      // f12e5910-dcb3-1460
      const { data } = await getHouseInfoApi(this.$route.params.cityid)
      // console.log(data)
      this.HouseInfo = data.body
    },

    // 房屋是否收藏
    async isFavorites() {
      const { data } = await isFavoritesApi(this.$route.params.cityid)
      this.isFavorite = data.body.isFavorite
    },

    // 添加/删除 收藏
    async FavoriteFn() {
      if (this.isFavorite) {
        await delFavoritesApi(this.$route.params.cityid)
        this.isFavorite = false
      } else {
        await addFavoritesApi(this.$route.params.cityid)
        this.isFavorite = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  height: 250px;
  background-color: #ccc;
}
.head {
  background-color: #fff;
  padding: 0 10px;
  margin-bottom: 10px;
  h4 {
    height: 48px;
    line-height: 48px;
    font-size: 15px;
    color: #333;
    font-weight: 700;
    border-bottom: 2px solid #cecece;
  }
}
.bigbox {
  // min-height: 1000px;
  background-color: #f6f5f6;
  .title {
    background-color: #fff;
    font-size: 16px;
    color: #333;
  }
  // 房屋信息
  .house-info {
    margin-top: 30px;
    background-color: #fff;
    height: 266px;
    padding: 15px;
    .vant_row {
      height: 100%;
      flex-direction: column;

      /deep/.van-col {
        flex: 1;
        width: 100%;
      }
      /deep/.van-col:nth-child(1) {
        p {
          margin: 20px 0 5px 0;
        }
      }
      /deep/.van-col:nth-child(2) {
        border-top: 2px solid #cecece;
        border-bottom: 2px solid #cecece;
        line-height: 27px;
        h4 {
          // margin-top: 10px;
          font-size: 18px;
          color: #fa5741;
          font-weight: 700;
        }
        p {
          font-size: 14px;
          color: #999;
        }
      }
      /deep/.van-col:nth-child(3) {
        div {
          transform: translateY(3px);
          margin-bottom: 10px;
          align-items: flex-start;
          font-size: 13px;
          i {
            font-style: normal;
          }
          span {
            color: #999;
          }
        }
      }
    }
  }
  // 地图区域
  .map {
    background-color: #fff;
    height: 190px;
    width: 100%;
    margin-top: 10px;
    p {
      margin: 0 3%;
      height: 44px;
      line-height: 44px;
      color: #666;
      font-size: 14px;
    }
    div {
      background-color: skyblue;
      height: 145px;
    }
  }
  // 房屋配套
  .homeConfig {
    .MyIcon .iconfont {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .housemsg {
      padding-bottom: 25px;
      margin-top: 20px;
    }
  }
  // 房源概况
  .desc {
    .van-button--small {
      width: 74px;
      height: 28.5px;
      font-size: 14px;
    }
    .van-cell__value {
      padding-top: 8px;
    }
    .van-cell__title {
      display: flex;
      .info {
        margin-top: 5px;
        margin-left: 10px;
        p {
          font-size: 14px;
          color: #333;
        }
        span {
          .van-icon {
            font-size: 12px;
          }
          font-size: 12px;
          color: #fa5741;
        }
      }
    }
    .text {
      padding: 10px 0;
      color: #333;
      font-size: 14px;
      line-height: 1.6;
    }
  }

  // 猜你喜欢
  .like {
    background-color: #fff;
    > div {
      margin-top: 10px;
    }
  }
  main {
    margin-bottom: 50px;
  }
  // 底部区域
  footer {
    display: flex;
    position: fixed;
    width: 100%;
    z-index: 666;
    left: 0;
    bottom: 0;
    .van-button--normal {
      flex: 1;
      font-size: 17px;
      color: #999;
    }
    .SCactiv {
      .van-icon {
        color: red;
      }
    }
  }
}
</style>
