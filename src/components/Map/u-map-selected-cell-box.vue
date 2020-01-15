<template>
  <!--<svg-->
  <!--class="selected-map-cell-box"-->
  <!--:width="RECT_WIDTH - RECT_STROKE_WIDTH"-->
  <!--:height="RECT_WIDTH - RECT_STROKE_WIDTH"-->
  <!--:x="selectedMapCell.x"-->
  <!--:y="selectedMapCell.y"-->
  <!--@contextmenu.prevent.stop="toggleMapContextMenuVisible(true)"-->
  <!--@click.left.native="hideTabContextMenu"-->
  <!--&gt;-->
  <rect
      v-if="selectedMapCell.x && selectedMapCell.y"
      class="selected-map-cell-box"
      :width="RECT_WIDTH - RECT_STROKE_WIDTH"
      :height="RECT_WIDTH - RECT_STROKE_WIDTH"
      :x="selectedMapCell.x"
      :y="selectedMapCell.y"
      :data-x="selectedMapCell.x"
      :data-y="selectedMapCell.y"
      :data-name="selectedMapCell.name"
      :data-type="selectedMapCell.type"
      @contextmenu.prevent.stop="toggleMapContextMenuVisible(true)"
      @click.left.native="hideTabContextMenu"
  >
  </rect>
  <!--</svg>-->
</template>
<style lang="stylus">
  .selected-map-cell-box
    stroke: #ff4949;
    stroke-width: 10;
    fill: rgba(255, 73, 73, .5);
</style>
<script>
import {
  mapState, mapActions, mapMutations, mapGetters,
} from 'vuex';

export default {
  // props: {
  //   rowSelectedMapCell: Object,
  // },
  data() {
    return {
      // selectedMapCell: {},
      // isMapContextMenuVisible: false,
    };
  },
  computed: {
    ...mapState({
      isRulerMode: state => state.map.isRulerMode,
      RECT_WIDTH: state => state.RECT_WIDTH,
      selectedMapCell: state => state.map.selectedMapCell,
    }),
    ...mapGetters([
      'RECT_STROKE_WIDTH',
    ]),
  },
  methods: {
    selectMapCell(eventTarget) {
      console.dir(eventTarget.dataset);
      // 测距模式/点击地图外元素/点击已选中元素时关闭
      if (this.isRulerMode
          || (eventTarget.nodeName !== 'rect' && eventTarget.nodeName !== 'use')
          || (eventTarget.dataset.type === 'layout' && eventTarget.dataset.name !== 'board-placeholder')
          || (this.selectedMapCell.x === eventTarget.dataset.x
            && this.selectedMapCell.y === eventTarget.dataset.y)) {
        this.clearMapCellSelection();
        return;
      }
      this.toggleMapContextMenuVisible(false);
      this.setValue({
        module: 'map',
        key: 'selectedMapCell',
        val: {
          tagName: eventTarget.tagName,
          ...eventTarget.dataset,
        },
      });
      // 获取选中格子的位置，保存起来用于定位右键菜单
      const targetBoundary = eventTarget.getBoundingClientRect();
      // console.log(targetBoundary);
      this.setValue({
        module: 'map',
        key: 'contextMenuPosition',
        val: {
          x: targetBoundary.right,
          y: targetBoundary.bottom,
        },
      });
      console.log(this.selectedMapCell);
    },
    clearMapCellSelection() {
      this.setValue({
        module: 'map',
        key: 'selectedMapCell',
        val: {},
      });
      // this.$utils.clearObject(this.selectedMapCell);
      this.toggleMapContextMenuVisible(false);
    },
    toggleMapContextMenuVisible(val) {
      this.setValue({
        module: 'map',
        key: 'isMapContextMenuVisible',
        val,
      });
    },
    ...mapMutations({
      setValue: 'SET_VALUE',
    }),
  },
};
</script>
