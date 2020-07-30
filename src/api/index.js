import request from '@/utils/request'

// 获取路由
export const getBasement = (query) => {
  return request({
    url: '/getBasement',
    method: 'get',
    params: query
  })
}

export function addForm(data) {
    return request({
        url: '/diyform/form',
        method: 'post',
        data: data
    })
}