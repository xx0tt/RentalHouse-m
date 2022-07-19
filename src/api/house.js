import request from '@/utils/request'

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
