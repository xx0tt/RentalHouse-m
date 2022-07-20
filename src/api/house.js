import request from '@/utils/request'
import store from '@/store'

// 获取房屋具体信息
export const getHouseInfoApi = (houseCode) => {
  return request({
    url: `/houses/${houseCode}`
  })
}

// 查看房屋是否收藏
export const isFavoritesApi = (houseCode) => {
  return request({
    url: `/user/favorites/${houseCode}`
  })
}

// 添加收藏
export const addFavoritesApi = (houseCode) => {
  return request({
    url: `/user/favorites/${houseCode}`,
    method: 'POST'
  })
}

// 删除收藏
export const delFavoritesApi = (houseCode) => {
  return request({
    url: `/user/favorites/${houseCode}`,
    method: 'DELETE'
  })
}

// 条件查询房屋信息
export const getConditionApi = (cityId) => {
  return request({
    url: '/houses',
    params: {
      cityId
    }
  })
}

// 小区关键词查询
export const KeywordQueryApi = (keywords) => {
  return request({
    url: '/area/community',
    params: {
      name: keywords, // 关键词
      id: store.state.inCity.value // 当前定位城市ID
    }
  })
}

// 房屋图像上传
export const HouseImgApi = (file) => {
  return request({
    url: '/houses/image',
    method: 'POST',
    data: file
  })
}
