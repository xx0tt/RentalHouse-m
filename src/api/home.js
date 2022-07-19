import request from '@/utils/request'
import store from '@/store'

// 获取首页轮播图
export const swiperApi = () => {
  return request({
    url: '/home/swiper'
  })
}

// 租房小组
export const getGroups = (val) => {
  return request({
    url: '/home/groups',
    params: val // 地区id
  })
}

// 获取城市列表
export const getCityList = (val) => {
  return request({
    url: '/area/city',
    params: {
      level: val
    }
  })
}

// 热门城市
export const getHotCity = () => {
  return request({
    url: '/area/hot'
  })
}

// 获取城市信息
export const getCityInfoApi = (val) => {
  return request({
    url: '/area/info',
    params: {
      name: val
    }
  })
}

// 查询房源数据
export const getAreaMapApi = (val) => {
  return request({
    url: '/area/map',
    params: {
      id: val // 城市ID
    }
  })
}

// 获取房屋查询条件
export const houseNeed = (code) => {
  return request({
    url: '/houses/condition',
    params: {
      id: code // 城市ID
    }
  })
}

// 咨询
export const getnewsList = () => {
  return request({
    url: '/home/news',
    params: {
      area: store.state.inCity.value
    }
  })
}

// 获取子级城市列表
export const getSonCityApi = (code) => {
  return request({
    url: '/area',
    params: { id: code } // 地区的code
  })
}
