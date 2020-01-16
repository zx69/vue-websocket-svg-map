/* 地图相关接口 */
import request from '../utils/request';

/* ******************************************** */
// 获取地图布局列表
export function getWarehouseLayout(params) {
  return request({
    url: '/warehouse/layout',
    method: 'get',
    params,
  });
}

// 获取地图概况
export function getWarehouseDetail(params = { id: '1' }) {
  return request({
    url: '/warehouse/detail',
    method: 'get',
    params,
  });
}
