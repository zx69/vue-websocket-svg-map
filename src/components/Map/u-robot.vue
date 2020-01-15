<!-- view-component: 叉车 -->
<template>
  <g>
    <g
      class="u-map__robot-item"
      v-for="robot in robotsList"
      :key="robot.name"
    >
      <svg
        :x="robot.x * RECT_WIDTH"
        :y="robot.y * RECT_WIDTH"
        :width="RECT_WIDTH * 0.95"
        :height="RECT_WIDTH * 0.95"
        :class="{
          'robot_unload': !robot.withHolder,
          'robot_load': robot.withHolder,
        }"
      >
        <!-- 叉车 -->
        <use xlink:href="#robotCell"
             class="robot-cell"
             :width="RECT_WIDTH * 0.95"
             :height="RECT_WIDTH * 0.95"
             :style="{'transform-origin':'center center','transform':`rotate(${ formatHeadToNum(robot.head) *-90}deg)`}"
             :data-x="robot.x * RECT_WIDTH"
             :data-y="robot.y * RECT_WIDTH"
             data-type="robot"
             :data-name="robot.name"
        >
        </use>
        <!-- 叉车搬运中的卡板 -->
        <use xlink:href="#carriedBoard"
          class="robot-cell carriedBoard"
          v-if="robot.withHolder"
          :width="RECT_WIDTH * 0.95"
          :height="RECT_WIDTH * 0.95"
          :style="{'transform-origin':'center center','transform':`rotate(${ formatHeadToNum(robot.head) *-90}deg)`}"
          :data-x="robot.x * RECT_WIDTH"
          :data-y="robot.y * RECT_WIDTH"
          data-type="robot"
          :data-name="robot.name"
        >
        </use>
      </svg>
      <!-- 叉车编号 -->
      <text :x="(robot.x + 0.6)*RECT_WIDTH"
            :y="(robot.y + 0.1)*RECT_WIDTH"
      >
        {{robot.name}}
      </text>
    </g>
  </g>

</template>

<script>
import {
  mapState
} from 'vuex';

export default {
  computed: {
    ...mapState({
      RECT_WIDTH: state => state.map.RECT_WIDTH,
      robotsList: state => state.robot.robotsList,
    }),
  },
  methods: {
    /**
     * @desc 把朝向文字转化为数字, 以便做rotate。因在style里无法用filter处理，故改用method
     * @param head {String} 朝向文字
     * @return {Number}
     */
    formatHeadToNum(head) {
      switch (head.toLowerCase()) {
        case 'east':
          return 1;
        case 'south':
          return 0;
        case 'west':
          return 3;
        case 'north':
          return 2;
        default:
          return '';
      }
    },
  },

};
</script>

<style lang="stylus">
  .u-map__robot-item

    text
      text-anchor: start;
      font-size: 48px;
      font-weight: 600;

    .robot_load
      .robot-cell
        color: #FF7F27

      .carriedBoard
        color: #3F48CC

    .robot_unload
      .robot-cell
        color: #FF7F27
</style>
