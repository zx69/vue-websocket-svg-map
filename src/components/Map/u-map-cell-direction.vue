<!-- view-components： 地图格子单向策略-->
<template>
  <g v-if="isCellDirectionVisible"
     class="u-map-cell-direction">
    <svg viewBox="0 0 1035 1024"
         v-if="value.normalPriorityDirection > -1"
         v-for="(value) in cellDirectionList"
         :width="RECT_WIDTH-RECT_STROKE_WIDTH"
         :height="RECT_WIDTH-RECT_STROKE_WIDTH"
         :x="value.cellX*RECT_WIDTH"
         :y="value.cellY*RECT_WIDTH"
         class="cell-direction-item"
    >
      <path
        d="M472.064 272.448l-399.232 399.232c-22.08 22.08-22.08 57.792
        0 79.872 22.016 22.016 57.792 22.08 79.872 0L512 392.256l359.296
        359.296c22.016 22.016 57.792 22.08 79.872 0 22.08-22.08 22.016-57.792
        0-79.872L551.936 272.448C529.856 250.432 494.144 250.432 472.064 272.448z"
        :style="{
           'transform-origin':'center center',
           'transform': `rotate(${value.normalPriorityDirection*90}deg)`
         }"
        fill="#F4E9B4"
      ></path>
    </svg>
  </g>
</template>
<style lang="stylus">

</style>
<script>
import {
  mapState, mapActions, mapMutations, mapGetters,
} from 'vuex';
import apis from '@/admin/api';

export default {
  data() {
    return {
      // 单向策略列表
      cellDirectionList: [],
    };
  },
  computed: {
    ...mapState({
      RECT_WIDTH: state => state.RECT_WIDTH,
      isCellDirectionVisible: state => state.map.isCellDirectionVisible,
    }),
    ...mapGetters([
      'RECT_STROKE_WIDTH',
    ]),
  },
  methods: {
    /**
     * @desc 获取单向策略列表，惰性
     * @returns {Promise<any>}
     */
    getCellDirectionList() {
      // if (this.cellDirectionList.length === 0) {
      return new Promise((resolve) => {
        apis.getCellDirectionList()
          .then((res) => {
            this.cellDirectionList = res.data.list;
            resolve();
          });
      });
      // }
    },
  },
  watch: {
    isCellDirectionVisible(val) {
      if (val) {
        this.getCellDirectionList();
      }
    },
  },
};
</script>
