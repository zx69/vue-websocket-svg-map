import Mock from 'mockjs'
import warehouseLayoutsJson from './data/warehouseLayouts';

export default [
  {
    url: '/warehouse/layout',
    type: 'get',
    response: data => {
      return {
        code: 20000,
        data: warehouseLayoutsJson.warehouseLayouts,
      }
    }
  },
  {
    url: '/warehouse/detail',
    type: 'get',
    response: data => {
      return {
        code: 20000,
        data: {
          width: 33,
          height: 15,
          name: 'Test Warehouse',
        },
      }
    }
  },
]

