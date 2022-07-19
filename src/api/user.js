import request from '@/utils/request'

// 登录接口
export const loginApi = (username, password) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

// 登出接口
export const logOutApi = () => {
  return request({
    url: '/user/logout',
    method: 'POST'
  })
}

// 注册接口
export const registApi = (username, password) => {
  return request({
    url: '/user/registered',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/user'
  })
}

// 获取收藏列表
export const getfavorites = () => {
  return request({
    url: '/user/favorites'
  })
}

// 获取我的出租列表
export const getMyHouse = () => {
  return request({
    url: '/user/houses'
  })
}

// 发布房源
export const AddHouses = (data) => {
  return request({
    url: '/user/houses',
    method: 'POST',
    data
  })
}

// 发布房源所需条件
export const AddHouseNeedApi = () => {
  return request({
    url: '/houses/params'
  })
}
