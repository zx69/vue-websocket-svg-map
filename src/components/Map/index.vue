<!-- view-component: 地图 -->
<template>
  <svg
    version="1.1"
    :viewBox="`0 0 ${mapSize.width * RECT_WIDTH} ${mapSize.height * RECT_WIDTH}`"
    preserveAspectRatio="xMidYMid meet"
    class="u-map svg-content"
    @mouseover="$emit('getHoverItemMes', $event)"
    @mouseout="$emit('resetItemMes', $event)"
  >
    <u-map-items-defs></u-map-items-defs>
    <g>
      <rect
        v-for="item in warehouseLayout"
        :key="item.id"
        :class="['u-map__layout-item', getLayoutItemTypeText(item.tp)]"
        :width="RECT_WIDTH * 0.95"
        :height="RECT_WIDTH * 0.95"
        :x="item.x * RECT_WIDTH"
        :y="item.y * RECT_WIDTH"
        :stroke-width="RECT_WIDTH * 0.05"
        :data-x="item.x * RECT_WIDTH"
        :data-y="item.y * RECT_WIDTH"
        data-type="layout"
        :data-name="getLayoutItemTypeText(item.tp)"
      >
      </rect>
    </g>

    <!--卡板-->
    <u-board
    ></u-board>

    <!--叉车-->
    <u-robot
    ></u-robot>

  </svg>

</template>

<script>
import {
  mapState, mapActions,
} from 'vuex';
import UMapItemsDefs from './u-map-items-defs';
import UBoard from './u-board';
import URobot from './u-robot';

export default {
  components: {
    UMapItemsDefs,
    UBoard,
    URobot,
  },
  created() {
    this.getWarehouseDetail(1);
    this.getWarehouseLayout();
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      warehouseLayout: state => state.map.warehouseLayout,
      RECT_WIDTH: state => state.map.RECT_WIDTH,
      mapSize: state => state.map.mapSize,
    }),
  },
  methods: {
    /**
     * @desc 转换地图格子类型为类名
     * @param status {String}
     * @returns {*}
     */
    getLayoutItemTypeText(type) {
      switch (type) {
        case 1:
          return 'floor';
        case 2:
          return 'board-placeholder';
        case 21:
          return 'unloading-zone'; // 卸货区
        case 5:
          return 'charge_dock';
        default:
          return 'block';
      }
    },
    ...mapActions([
      'getWarehouseLayout',
      'getWarehouseDetail',
    ]),
  },
};
</script>

<style lang="stylus">
  .u-map
    background-color: #fff

    &.svg-content
      display: inline-block;
      max-width: 100%;
      max-height: calc(100vh - 265px);
      transform-origin: 0 0;
      // 开启GPU加速
      transform: translate3d(0, 0, 0);

    .u-map__layout-item
      &.blank
        fill: #fff;

      &.floor
        fill: #22B14C;
        stroke: #7EDC9A;

      &.block
        fill: #7F7F7F;
        stroke: #929292;

      &.unloading-zone
        fill: #99d9ea;
        stroke: #5f7ce8

      &.charge_dock
        fill: url("#chargeDock");

      &.board-placeholder
        display: inline;
        fill: #fff;
        stroke: #aaa;
        stroke-dasharray: 12, 12;
</style>
