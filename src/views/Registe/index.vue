<template>
  <div>
    <!-- 头部区域 -->
    <van-nav-bar
      class="navbar"
      title="注册"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 表单区域 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请再次输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <div style="margin: 16px">
        <van-button color="#1cb676" block type="info" native-type="submit"
          >注册</van-button
        >
      </div>
    </van-form>

    <router-link class="reg" to="/login">已有账号，去登录~ </router-link>
  </div>
</template>

<script>
import { registApi } from '@/api/user'
export default {
  data() {
    return { username: '', password: '' }
  },

  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async onSubmit() {
      try {
        const { data } = await registApi(this.username, this.password)
        // console.log(data)
        // this.$store.commit('setToken', data.body.token)
        this.$toast(data.description)
        this.$router.push({ path: '/login' })
      } catch (error) {
        console.log('error', error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 头部样式
.navbar {
  background-color: #21b97a;
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
  /deep/ .van-icon-arrow-left {
    color: #fff;
  }
}

.reg {
  position: absolute;
  margin-top: 15px;
  left: 50%;
  transform: translateX(-50%);
  color: #666;
  font-size: 14px;
}
</style>
