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
