/* 地图相关接口 */
import request from '../utils/request';

/* ******************************************** */
// 获取分销列表
export function getWarehouseLayout(params) {
  return request({
    url: '/warehouse/layout',
    method: 'get',
    params,
  });
}


export function getWarehouseDetail(params = { id: '1' }) {
  return request({
    url: '/warehouse/detail',
    method: 'get',
    params,
  });
}
