/* eslint-disable no-shadow */
import { getWarehouseLayout, getWarehouseDetail } from '@/apis/map';

const state = {
  // 仓库名称
  warehouseName: '',
  // 仓库长宽尺寸
  mapSize: {
    width: 0,
    height: 0,
  },
  // 地图格子的边长
  RECT_WIDTH: 100,
  // 地图格子边框的值
  RECT_STROKE_WIDTH: 5,
  // 地图布局Array
  warehouseLayout: [],
  // 是否显示单向策略
  isCellDirectionVisible: false,
  // 选中的单元格信息，用于u-map-selected-cell-box和u-map-context-menu间共享数据
  selectedMapCell: {},
  // 是否显示单元格右键菜单，用于u-map-selected-cell-box和u-map-context-menu间共享数据
  isMapContextMenuVisible: false,
  // 地图页右键菜单定位坐标
  contextMenuPosition: {
    x: 0,
    y: 0,
  },
};

const mutations = {
  SET_WAREHOUSE_LAYOUT(state, payload) {
    state.warehouseLayout = payload.warehouseLayout;
  },
  SET_WAREHOUSE_DETAIL(state, payload) {
    state.mapSize.width = payload.width;
    state.mapSize.height = payload.height;
    state.warehouseName = payload.name;
  },

};

const actions = {
  /**
   * @desc 获取仓库地图长宽尺寸
   * @param commit
   * @param state
   * @param dispatch
   * @returns {Promise<any>}
   */
  getWarehouseDetail({ commit, state }) {
    // 仓库数据为静态数据，限制重复获取
    if (state.warehouseName) {
      return;
    }
    getWarehouseDetail()
      .then((res) => {
        commit({
          type: 'SET_WAREHOUSE_DETAIL',
          width: res.data.width,
          height: res.data.height,
          warehouseName: res.data.name,
        });
      });
  },
  /**
   * @desc 获取地图布局
   */
  getWarehouseLayout({ commit, state }) {
    // 地图布局为静态数据，限制重复获取
    if (state.warehouseLayout.length > 0) {
      return;
    }
    commit('CHANGE_LOADING_STATUS', true, { root: true });
    getWarehouseLayout()
      .then((res) => {
        commit({
          type: 'SET_WAREHOUSE_LAYOUT',
          warehouseLayout: Object.freeze(res.data),
        });
        commit('CHANGE_LOADING_STATUS', false, { root: true });
      });
  },
};

export default {
  state,
  mutations,
  actions,
};
