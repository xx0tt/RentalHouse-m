<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        background="#f6f5f6"
        autofocus
        v-model="value"
        show-action
        placeholder="请输入小区或地址"
        @search="onSearch"
        @cancel="onCancel"
        @input="onInput"
      />
    </form>

    <!-- 内容展示 -->
    <div class="cell">
      <van-cell
        v-for="(item, index) in communityList"
        :key="index"
        :title="item.communityName"
        @click="clickFn(item)"
      />
    </div>
  </div>
</template>

<script>
import { KeywordQueryApi } from '@/api'
export default {
  data() {
    return {
      value: '',
      communityList: []
    }
  },
  methods: {
    onSearch(val) {
      if (this.value.trim() !== '') this.getcommunity()
    },
    // 取消按钮
    onCancel() {
      this.$router.go(-1)
    },
    // 输入时触发
    onInput() {
      if (this.value.trim() !== '') this.getcommunity()
    },
    // 获取推荐
    async getcommunity() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      const { data } = await KeywordQueryApi(this.value)
      this.communityList = data.body
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 1
      })
    },
    // 点击小区
    clickFn(item) {
      this.onCancel()
      this.$router.push({
        name: 'AddRent',
        params: {
          villageName: item.communityName,
          community: item.community
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cell {
  padding: 0 15px;
  .van-cell {
    border-bottom: 2px solid #f1f1f1;
  }
}
</style>
