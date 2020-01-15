<!-- view-component: 地图右键菜单-->
<template>
  <ul
      class="u-map-selector list-menu map-cell-context-menu"
      v-show="isMapContextMenuVisible"
      :style="{
          top: contextMenuPosition.y + 'px',
          left: contextMenuPosition.x + 'px',
        }"
  >
    <li
        v-for="(menuItem, i) in contextMenuItemsConfig[selectedMapCell.type]"
        :key="i"
        @click.prevent.stop="dispatchCellCommand($event, menuItem.command)"
        :class="[menuItem.class, {
            disabled: menuItem.disabledFlagKey && selectedMapCell[menuItem.disabledFlagKey],
          }]"
    >
      <i :class="['iconfont', `icon-${menuItem.icon}`]"></i>&nbsp;&nbsp;{{menuItem.title}}
    </li>
  </ul>
</template>
<style lang="stylus"
       scoped>
  .map-cell-context-menu {
    position: fixed;
    li {
      padding: 5px 10px;
    }
  }
</style>
<script>
import {
  mapState, mapActions, mapMutations, mapGetters,
} from 'vuex';

export default {
  data() {
    return {
      // 右键菜单列表
      contextMenuItemsConfig: {
        robot: [
          {
            title: '挂起叉车任务',
            icon: 'ban',
            class: 'text-danger',
            command: 'suspendRobotTask',
          },
          {
            title: '移动至节点',
            icon: 'signin',
            class: 'text-info',
            command: 'showMoveToNodeDialog',
            disabledFlagKey: 'charging',
          },
          {
            title: '返回原位',
            icon: 'reply',
            class: 'text-warning',
            command: 'submitBackToOrigin',
            disabledFlagKey: 'charging',
          },
          {
            title: '前往充电桩',
            icon: 'bolt',
            class: 'text-primary',
            command: 'submitGoToCharge',
            disabledFlagKey: 'charging',
          },
        ],
        board: [
          {
            title: '释放卡板',
            icon: 'ban',
            class: 'text-danger',
            command: 'releaseHolderPoint',
          },
        ],
        layout: [
          {
            title: '投放卡板',
            icon: 'recover-in-point',
            class: 'text-success',
            command: 'deployBoardToNode',
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      selectedMapCell: state => state.map.selectedMapCell,
      isMapContextMenuVisible: state => state.map.isMapContextMenuVisible,
      contextMenuPosition: state => state.map.contextMenuPosition,
    }),
  },
  methods: {
    dispatchCellCommand(event, command) {
      // 禁用的列表项不作响应
      if ([].indexOf.call(event.target.classList, 'disabled') !== -1) {
        return;
      }
      if (this[command]) {
        this[command](this.selectedMapCell);
      } else {
        this.$emit(command, this.selectedMapCell);
      }
      this.setValue({
        module: 'map',
        key: 'isMapContextMenuVisible',
        val: false,
      });
    },
    ...mapMutations({
      setValue: 'SET_VALUE',
    }),
  },
};
</script>
