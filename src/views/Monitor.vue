<template>
  <div>
    <header>
      <!-- header 左侧显示内容-->
      <div class="text-ellipsis"
           :style="{
          visibility: hoverTargetCoordinates.x === '' ? 'hidden' : 'inherit'
        }">
        <span class="text-grey">
          <i class="iconfont icon-position"></i>&nbsp;
          当前坐标：
          <strong class="text-primary">
            ( {{hoverTargetCoordinates.x/RECT_WIDTH}} , {{hoverTargetCoordinates.y/RECT_WIDTH}} )
          </strong>
        </span>&nbsp;&nbsp;&nbsp;
        <span class="text-grey">
          <i class="iconfont icon-target"></i>&nbsp;
          当前对象：<em class="text-warning">{{hoverTargetType}} - </em>
          <strong class="text-success">
            {{hoverTargetName}}
          </strong>
        </span>
      </div>
      <!-- end header 左侧显示内容-->
    </header>
    <Map
      @getHoverItemMes="getHoverItemMes"
      @resetItemMes="resetItemMes"
    ></Map>
  </div>

</template>

<script>
import {
  mapState,
} from 'vuex';
import Map from '@/components/Map/index.vue';
import Socket from '@/utils/socket';

export default {
  components: {
    Map,
  },
  data() {
    return {
      // 鼠标指向layout-cell的信息：xy坐标
      hoverTargetCoordinates: {
        x: '',
        y: '',
      },
      // 鼠标指向layout-cell的信息：type
      hoverTargetType: '',
      // 鼠标指向layout-cell的信息：name
      hoverTargetName: '',
    };
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      RECT_WIDTH: state => state.map.RECT_WIDTH,
    }),
  },
  created() {
    Socket.init();
  },
  methods: {
    /**
     * @desc 鼠标滑入layout-item的回调
     * @param event
     */
    getHoverItemMes(event) {
      const { target } = event;
      if ((target.nodeName !== 'rect'
          && target.nodeName !== 'use'
          && target.nodeName !== 'tspan'
          && target.nodeName !== 'circle'
        )
        || target.attributes.banHover) {
        return;
      }
      this.hoverTargetCoordinates.x = target.dataset.x;
      this.hoverTargetCoordinates.y = target.dataset.y;
      this.hoverTargetType = target.dataset.type.toUpperCase();
      this.hoverTargetName = target.dataset.name;
    },
    /**
     * @desc 鼠标滑出layout-item的回调
     * @param event
     */
    resetItemMes(event) {
      const { target } = event;
      if (target.nodeName !== 'rect' && target.nodeName !== 'use') {
        return;
      }
      this.hoverTargetCoordinates.x = '';
      this.hoverTargetCoordinates.y = '';
      this.hoverTargetType = '';
      this.hoverTargetName = '';
    },
  },
};
</script>

