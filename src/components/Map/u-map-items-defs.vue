<!-- view-component: 地图图标定义-->
<template>
  <svg>
    <!--svg格子图标定义-->
    <!-- 充电区定义 -->
    <defs>
      <pattern
        id="chargeDock"
        x="10"
        y="0"
        width="1"
        height="1"
        viewBox="0 0 32 32"
        patternUnits="objectBoundingBox"
      >
        <image xlink:href="../../assets/imgs/charge_dock.png"
               :width="RECT_WIDTH"
               :height="RECT_WIDTH"
               x="0"
               y="0"></image>
      </pattern>
    </defs>
    <!-- 卡板定义 -->
    <defs>
      <symbol
        id="board"
        x="0"
        y="0"
        width="1"
        height="1"
        viewBox="0 0 1024 1024"
        patternUnits="objectBoundingBox"
      >
        <path d="M930.909091 1024H93.090909c-51.2 0-93.090909-41.890909-93.090909-93.090909V93.090909C0 41.890909 41.890909 0 93.090909 0h837.818182c51.2 0 93.090909 41.890909 93.090909 93.090909v837.818182c0 51.2-41.890909 93.090909-93.090909 93.090909z"
              fill="currentColor"
              p-id="52762"></path>
        <path d="M418.909091 232.727273H279.272727c-27.927273 0-46.545455 18.618182-46.545454 46.545454v139.636364c0 27.927273 18.618182 46.545455 46.545454 46.545454h139.636364c27.927273 0 46.545455-18.618182 46.545454-46.545454V279.272727c0-27.927273-18.618182-46.545455-46.545454-46.545454zM744.727273 232.727273h-139.636364c-27.927273 0-46.545455 18.618182-46.545454 46.545454v139.636364c0 27.927273 18.618182 46.545455 46.545454 46.545454h139.636364c27.927273 0 46.545455-18.618182 46.545454-46.545454V279.272727c0-27.927273-18.618182-46.545455-46.545454-46.545454zM418.909091 558.545455H279.272727c-27.927273 0-46.545455 18.618182-46.545454 46.545454v139.636364c0 27.927273 18.618182 46.545455 46.545454 46.545454h139.636364c27.927273 0 46.545455-18.618182 46.545454-46.545454v-139.636364c0-27.927273-18.618182-46.545455-46.545454-46.545454zM744.727273 558.545455h-139.636364c-27.927273 0-46.545455 18.618182-46.545454 46.545454v139.636364c0 27.927273 18.618182 46.545455 46.545454 46.545454h139.636364c27.927273 0 46.545455-18.618182 46.545454-46.545454v-139.636364c0-27.927273-18.618182-46.545455-46.545454-46.545454z"
              fill="#FFFFFF"
              p-id="52763"></path>
      </symbol>
    </defs>

    <!-- 叉车定义 -->
    <defs>
      <symbol
        id="robotCell"
        height="32pt"
        viewBox="0 0 32 32"
        patternUnits="objectBoundingBox"
        fill="currentColor"
        stroke="#333"
        stroke-width="1"
      >
        <rect
          height="32"
          width="32"
          fill="transparent"
          stroke="transparent"
        ></rect>
        <rect
          height="10"
          width="22"
          stroke="#333"
          x="5"
          y="3"/>
        <path d="m24.03958,13.0547c-0.05013,0.05013 0,15.94007 0.00551,15.90332c0.00551,-0.03676 -2.97477,0.0347 -3.01938,-0.04935c-0.04462,-0.08406 -0.94597,-15.85397 -0.94046,-15.89072c0.00551,-0.03676 4.00446,-0.01337 3.95433,0.03675z"
        />
        <path d="m8.12239,13.0547c0.0495,0.05013 0,15.94007 -0.00544,15.90332c-0.00544,-0.03676 2.93716,0.0347 2.9812,-0.04935c0.04406,-0.08406 0.93401,-15.85397 0.92857,-15.89072c-0.00544,-0.03676 -3.95383,-0.01337 -3.90433,0.03675z"
        />
        <rect
          height="4"
          width="8"
          x="11.98294"
          y="3"
          fill="#fff"
        />
      </symbol>
    </defs>
    <!-- 搬运中卡板定义 -->
    <defs>
      <symbol
        id="carriedBoard"
        height="32pt"
        viewBox="0 0 32 32"
        patternUnits="objectBoundingBox"
      >
        <rect fill="currentColor"
              height="12"
              width="26"
              x="3.00224"
              y="14.72204"/>
      </symbol>
    </defs>

    <!-- 系统关闭时地图遮罩定义 -->
    <defs>
      <filter id="filterMaskGreg">
        <feColorMatrix in="SourceGraphic"
                       type="saturate"
                       values="0.4"/>
      </filter>
    </defs>

    <!-- 系统暂停时地图遮罩定义 -->
    <defs>
      <filter id="filterMaskWhite">
        <!--<feColorMatrix-->
        <!--type="matrix"-->
        <!--values="1 0 0 0 0-->
        <!--0 1 0 0 0-->
        <!--0 0 1 0 0-->
        <!--0 0 0 0.7 0 "/>-->
        <feColorMatrix in="SourceGraphic"
                       type="hueRotate"
                       values="100"/>
        <!--<feColorMatrix in="SourceGraphic"-->
        <!--type="luminanceToAlpha" />-->
        <!--<feColorMatrix in="SourceGraphic"-->
        <!--type="saturate"-->
        <!--values="0.9" />-->
      </filter>
    </defs>
  </svg>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'RECT_WIDTH',
    ]),
  },
};
</script>
