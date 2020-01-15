<!-- view-component: 地图区域文字描述 -->
<template>
  <g>
    <!-- 拣选区编号 -->
    <svg
        class="circle-text"
        v-for="(item, key) in pickBillZoomCellsSet"
        :key="key"
        :x="getMapCellCoordinateFromText(key, 'x') * RECT_WIDTH"
        :y="(getMapCellCoordinateFromText(key, 'y') + 1) * RECT_WIDTH"
        :width="RECT_WIDTH-RECT_STROKE_WIDTH"
        :height="RECT_WIDTH-RECT_STROKE_WIDTH"
    >
      <text
          class="circle-text__content"
          x="50%"
          y="50%"
      >
        {{item.split('-')[1]}}
      </text>
      <circle
          class="circle-text__wrapper"
          cx="50%"
          cy="50%"
          :r="RECT_WIDTH/3"
          :data-x="getMapCellCoordinateFromText(key, 'x') * RECT_WIDTH"
          :data-y="(getMapCellCoordinateFromText(key, 'y') + 1) * RECT_WIDTH"
          data-type="layout"
          data-name="block"
      >
      </circle>
    </svg>
    <!-- 其他区域文本描述 -->
    <text
        class="plain-text"
        v-for="(textObj, i) in describeTextSet"
        :key="i"
        v-once
        :dx="15"
        :dy="70"
        :x="textObj.x * RECT_WIDTH"
        :y="textObj.y * RECT_WIDTH"
    >
      <tspan
          :data-x="textObj.x * RECT_WIDTH"
          :data-y="textObj.y * RECT_WIDTH"
          data-type="layout"
          data-name="block"
      >{{textObj.text}}
      </tspan>
    </text>
  </g>
</template>
<style lang="stylus"
       scoped>
  .circle-text
    .circle-text__wrapper
      fill: transparent
      stroke: c-orange
      stroke-width: 5

    .circle-text__content
      text-anchor: middle /* 文本水平居中 */
      dominant-baseline: central /* 文本垂直居中 */
      font-size: 48px
      /*font-weight: 600*/
      fill: c-orange

  .plain-text
    // text-anchor: middle  /* 文本水平居中 */
    text-anchor: start
    font-size: 65px
    letter-spacing 35px
    fill: #ccc
</style>
<script>
import {
  mapState, mapActions, mapMutations, mapGetters,
} from 'vuex';

export default {
  props: {},
  data() {
    return {
      // 文本描述配置
      describeTextSet: {
        receivedCacheArea: {
          text: '收货缓存区',
          x: 21,
          y: 28,
        },
        pickBillArea1: {
          text: '拣选区',
          x: 6,
          y: 21,
        },
        pickBillArea2: {
          text: '拣选区',
          x: 18,
          y: 21,
        },
        chargeArea: {
          text: '待充电区',
          x: 32,
          y: 25,
        },
        forkliftOriginArea: {
          text: '发车位',
          x: 32,
          y: 20,
        },
      },
    };
  },
  computed: {
    ...mapState({
      pickBillZoomCellsSet: state => state.map.pickBillZoomCellsSet,
      RECT_WIDTH: state => state.RECT_WIDTH,
    }),
    ...mapGetters([
      'RECT_STROKE_WIDTH',
    ]),
  },
  methods: {
    // 从拣选区坐标属性（如'1_2'）中计算出相应的xy坐标
    getMapCellCoordinateFromText(coordiantieText, key) {
      return Number(coordiantieText.split('_')[key === 'x' ? 0 : 1]);
    },
  },
};
</script>
