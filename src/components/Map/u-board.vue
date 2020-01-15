<!-- view-components：地图上的卡板-->
<template>
  <g>
    <g class="u-map__board-item"
       v-for="board in boardsList"
       :key="board.name"
    >
      <!-- 卡板底部实际元素 -->
      <use xlink:href="#board"
           v-if="board.status === 'normal'"
           class="board-cell"
           :width="RECT_WIDTH * 0.95"
           :height="RECT_WIDTH * 0.95"
           :x="board.x * RECT_WIDTH"
           :y="board.y * RECT_WIDTH"
           :data-x="board.x*RECT_WIDTH"
           :data-y="board.y*RECT_WIDTH"
           data-type="board"
           :data-name="board.name"
      ></use>
    </g>
  </g>
</template>
<script>
import {
  mapState,
} from 'vuex';

export default {
  computed: {
    ...mapState({
      RECT_WIDTH: state => state.map.RECT_WIDTH,
      boardsList: state => state.board.boardsList,
    }),
  },
};
</script>

<style lang="stylus">
  .u-map__board-item
    .board-cell
      color: #3F48CC;
</style>
