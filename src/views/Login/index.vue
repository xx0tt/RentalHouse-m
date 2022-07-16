<template>
  <div>
    <!-- 头部区域 -->
    <Header title="账号登陆" />
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
      <div style="margin: 16px">
        <van-button color="#1cb676" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>

    <router-link class="reg" to="/registe">还没有账号，去注册~ </router-link>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { loginApi } from '@/api/user'
export default {
  data() {
    return { username: '', password: '' }
  },
  components: { Header },
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await loginApi(this.username, this.password)
        // console.log(data)
        this.$store.commit('setToken', data.body.token)
        this.$router.push({ path: '/layout/my' })
        this.$toast(data.description)
      } catch (error) {
        // console.log('========', error)
        this.$toast(error.response.data.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.reg {
  position: absolute;
  margin-top: 15px;
  left: 50%;
  transform: translateX(-50%);
  color: #666;
  font-size: 14px;
}
</style>
