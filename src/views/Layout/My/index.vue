<template>
  <div class="box">
    <div class="mytitle">
      <img src="http://liufusong.top:8080/img/avatar.png" alt="" />
      <div class="myinfo">
        <div class="myicon">
          <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="" />
        </div>
        <div class="myuser">
          <div class="My_name">好客_845296</div>
          <div class="My_auth">
            <van-button
              class="btn"
              round
              color="#21b97a"
              size="mini"
              @click="exitFn"
              >退出</van-button
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
      <van-grid :column-num="3">
        <van-grid-item icon="star-o" text="我的收藏" />
        <van-grid-item icon="wap-home-o" text="我的出租" />
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
export default {
  methods: {
    exitFn() {
      this.$dialog
        .confirm({ title: '标题', message: '弹窗内容' })
        .then(() => {
          this.$store.commit('delToken')
          this.$toast('退出成功')
          this.$router.push({ path: '/login' })
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
    background-color: skyblue;
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
