import request from '@/utils/request'

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
      id: val
    }
  })
}
