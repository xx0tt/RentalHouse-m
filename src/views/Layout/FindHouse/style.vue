<template>
  <div>
    <van-picker title="标题" :columns="columns" />
    <div class="footer">
      <van-button style="color: #21b97a">取消</van-button>
      <van-button color="#21b97a">提交</van-button>
    </div>
  </div>
</template>

<script>
import { houseNeed } from '@/api'
export default {
  data() {
    return {
      columns: [
        {
          text: '区域',
          children: [
            {
              text: '杭州',
              children: [{ text: '西湖区' }, { text: '余杭区' }]
            },
            {
              text: '温州',
              children: [{ text: '鹿城区' }, { text: '瓯海区' }]
            }
          ]
        },
        {
          text: '地铁',
          children: [
            {
              text: '福州',
              children: [{ text: '鼓楼区' }, { text: '台江区' }]
            },
            {
              text: '厦门',
              children: [{ text: '思明区' }, { text: '海沧区' }]
            }
          ]
        }
      ],
      cityNeed: {}
    }
  },
  created() {
    this.getHouseNeed()
  },
  methods: {
    async getHouseNeed() {
      try {
        const { data } = await houseNeed(this.$store.state.inCity.value)
        this.cityNeed = data.body
        console.log(this.cityNeed)
        console.log(this.columns)
        this.columns[0].children = data.body.area.children
      } catch (error) {
        console.log(error.response.data)
        this.$toast.fail('请求错误，请稍后重试')
      }
    }
  },
  switch: {
    columns: {
      deep: true,
      handler(val) {
        this.columns = val.replace(/label/g, 'text')
        console.log(this.columns)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  display: flex;

  button {
    flex: 1;
  }
}
</style>
