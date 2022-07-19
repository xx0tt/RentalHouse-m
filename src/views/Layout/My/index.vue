<template>
  <div class="box">
    <div class="mytitle">
      <img
        v-if="!!$store.state.token"
        :src="`http://liufusong.top:8080${userInfo.avatar}`"
        alt=""
      />
      <img
        v-else
        :src="`http://liufusong.top:8080/img/profile/bg.png`"
        alt=""
      />
      <div class="myinfo">
        <div class="myicon">
          <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="" />
        </div>
        <div class="myuser">
          <div class="My_name">{{ userInfo.nickname }}</div>
          <div class="My_auth">
            <van-button
              class="btn"
              round
              color="#21b97a"
              size="mini"
              @click="exitFn"
              >{{ $store.state.token ? '退出' : '去登陆' }}</van-button
            >
          </div>
          <div class="My_edit">
            编辑个人资料
            <span class="My_arrow"></span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <van-grid :column-num="3" clickable>
        <van-grid-item icon="star-o" to="/favorate" text="我的收藏" />
        <van-grid-item icon="wap-home-o" to="/rent/rentlist" text="我的出租" />
        <van-grid-item icon="clock-o" text="看房记录" />
        <van-grid-item icon="debit-pay" text="成为房主" />
        <van-grid-item icon="contact" text="个人资料" />
        <van-grid-item icon="service-o" text="联系我们" />
      </van-grid>
    </div>
    <div class="gd">
      <img src="http://liufusong.top:8080/img/profile/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { getUserInfo, logOutApi } from '@/api'
export default {
  data() {
    return {
      userInfo: {
        avatar: '/img/avatar.png',
        nickname: '游客'
      }
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    // 获取用户信息
    async getUser() {
      try {
        const { data } = await getUserInfo()
        if (!data.body) return this.$store.commit('setToken', '')
        this.userInfo = data.body
      } catch (error) {
        console.log('error', error)
        this.$store.commit('setToken', '')
        this.$toast.fail('请先登录')
      }
    },
    exitFn() {
      // 如果未登录
      if (!this.$store.state.token) {
        return this.$router.push({
          path: '/login'
        })
      }

      this.$dialog
        .confirm({ title: '标题', message: '弹窗内容' })
        .then(async () => {
          const { data } = await logOutApi()
          console.log(data)
          this.$store.commit('delToken')
          this.userInfo = {
            avatar: '/img/avatar.png',
            nickname: '游客'
          }
          this.$toast('退出成功')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  padding-bottom: 50px;
  .mytitle {
    position: relative;
    min-height: 300px;
    // background-color: skyblue;
    img {
      width: 100%;
    }
    .myinfo {
      position: absolute;
      background: #fff;
      width: 85%;
      height: 55%;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 0 10px 3px #ddd;
      margin: 50px auto 0;
      padding: 0 20px;
      text-align: center;
      font-size: 13px;
      .myicon {
        position: relative;
        transform: translateY(-50%);
        border-radius: 50%;
        width: 70px;
        height: 70px;
        border: 5px solid #f5f5f5;
        display: inline-block;
        box-shadow: 0 2px 2px #bdbdbd;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .myuser {
        padding-top: 15px;
        .My_name {
          margin-top: -30px;
          margin-bottom: 10px;
        }
        .My_auth {
          margin-bottom: 30px;
          .btn {
            height: 20px;
            padding: 0 15px;
          }
        }
        .My_edit {
          color: #999;
          font-size: 12px;
          margin-top: 20px;
          .My_arrow {
            transform: rotate(-90deg);
            display: inline-block;
            margin-left: 3px;
          }
        }
      }
    }
  }
  .gd {
    text-align: center;
    margin-top: 10px;
    img {
      width: 92%;
    }
  }
}
</style>
