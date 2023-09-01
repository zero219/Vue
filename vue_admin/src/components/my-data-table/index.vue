<template>
  <div class="my-data-table">
    <div class="table-header" ref="fixedTableHeader" v-if="headerShow">
      <div class="left">
        <div class="title" v-if="tableTitle">
          <i class="el-icon-date"></i>&nbsp;{{ tableTitle }}
        </div>
        <slot name="left"></slot>
      </div>
      <div class="right">
        <slot name="tableBtn"></slot>
        <div
          v-for="(item, index) in tableHeaderButtons"
          :key="index"
          class="list"
        >
          <!--type: primary/success/info/warning/danger/'' 默认为primary, ''为没有背景色 -->
          <el-button
            :type="item.type || item.type === '' ? item.type : 'primary'"
            size="small"
            @click="item.clickFunc"
            v-if="true"
            >{{ item.buttonName }}</el-button
          >
        </div>
      </div>
    </div>
    <el-table
      class="table-float"
      :border="border"
      :max-height="tableFixedHeigth"
      ref="multipleTable"
      :data="data"
      :row-key="rowKey"
      @selection-change="handleSelectionChange"
      :row-class-name="rowClassName"
      @sort-change="sortChange"
      @select="handleSelection"
      @select-all="handleSelectAll"
    >
      <el-table-column
        v-if="checkbox"
        type="selection"
        :reserve-selection="keepSelect"
        align="center"
        :width="checkboxWidth"
        fixed
      ></el-table-column>
      <!-- 序号 -->
      <el-table-column
        v-if="isIndex"
        type="index"
        label="序号"
        align="center"
        width="60"
        fixed
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + (pager.current - 1) * pager.size + 1 }}</span>
        </template>
      </el-table-column>
      <template v-for="(item, index) in options">
        <el-table-column
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width || 'auto'"
          :min-width="item.minWidth"
          header-align="left"
          :align="item.align || 'left'"
          :fixed="data.length > 0 ? item.fixed : false"
          :sortable="item.sortable ? item.sortable : false"
          :show-overflow-tooltip="item.overflow || true"
          v-if="true"
        >
          <template slot-scope="scope">
            <!--通过插槽去实现自定义列-->
            <slot
              v-if="item.slot"
              :name="scope.column.property"
              :row="scope.row"
              :index="scope.$index"
            ></slot>
            <span v-else>{{ scope.row[scope.column.property] }}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="menu"
        label="操作"
        :align="menuAlign"
        :width="menuWidth"
        :fixed="customFixed"
      >
        <template slot-scope="scope">
          <div class="menu-cell">
            <slot name="menu" :row="scope.row" :index="scope.$index"></slot>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格页脚 -->
    <div class="table-footer">
      <div class="footer">
        <slot name="footer"></slot>
      </div>
      <my-data-pager :pager="pager" />
    </div>
  </div>
</template>

<script>
/**
 * 组件说明
 * 该组件为全局统一的表格组件
 * 可配置 顶部插槽，底部插槽， 表格序号展示、表格名称浮动、多选/权限、 操作栏插槽、 单独栏的操作配置
 * **/
import MyDataPager from '../my-data-pager'
export default {
  name: 'my-data-table',
  props: {
    headerShow: {
      // 是否展示顶部
      type: Boolean,
      default: true,
    },
    tableTitle: {
      // 表格名称
      type: String,
      default: '列表',
    },
    tableHeaderButtons: {
      // 表格顶部按钮数组
      type: Array,
      default() {
        return []
      },
    },
    checkbox: {
      // 是否显示选择按钮
      type: Boolean,
      default: false,
    },
    checkboxWidth: {
      // 选择按钮栏的宽度
      type: Number,
      default: 50,
    },
    isIndex: {
      // 是否显示序号
      type: Boolean,
      default: false,
    },
    menu: {
      // 是否显示操作栏
      type: Boolean,
      default: true,
    },
    menuWidth: {
      // 操作栏的宽度
      type: Number,
      default: 150,
    },
    menuAlign: {
      // 操作栏水平对齐方式left/center/right
      type: String,
      default: 'center',
    },
    menuFixed: {
      // 操作栏是否浮动
      type: [Boolean, String],
      default: false,
    },
    pager: {
      // 分页器配置
      type: Object,
      default() {
        return {}
      },
    },
    tableFixedHeigth: {
      type: String,
      default: 'auto',
    },
    data: {
      // 表格数据
      type: Array,
      default() {
        return []
      },
    },
    options: {
      // 表格显示栏配置
      type: Array,
      default() {
        return []
      },
    },
    rowClassName: {
      // 行的 className
      type: Function,
    },
    isCategory: {
      // 勾选数据前是否需要先选择类目调整（可优化通用方式）
      type: Boolean,
      default: false,
    },
    autoTableFixed: {
      // 表格顶部标题是否浮动
      type: Boolean,
      default: false,
    },
    rowKey: {
      // 行数据的 Key
      type: String,
      default: '',
    },
    keepSelect: {
      // 处理翻页保留多选状态
      type: Boolean,
      default: false,
    },
    border: {
      // 是否显示边框
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selected: [],
    }
  },
  computed: {
    customFixed() {
      const list = [true, 'left', 'right']
      const flag = list.findIndex((item) => item === this.menuFixed)
      return flag > -1 ? this.menuFixed : false
    },
  },
  methods: {
    handleSelection() {},
    handleSelectAll() {},
    handleSelectionChange(val) {
      this.selected = val
    },
    sortChange(column) {
      this.$emit('sortChange', {
        columnName: column.prop,
        order: column.order,
      })
    },
  },
  components: {
    MyDataPager,
  },
}
</script>

<style lang="less" scoped>
.my-data-table {
  th.el-table-column--selection {
    .cell {
      padding-left: 7px !important;
    }
  }
  .menu-cell {
    display: flex;
    .btn-wrapper {
      display: flex;
      flex-wrap: wrap;
      button {
        margin: 5px;
      }
    }
  }
  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    margin: 0 -20px;
    height: 10px;
    /deep/.el-button {
      min-width: 80px;
      padding: 10px 15px;
      font-size: 12px;
      border-radius: 3px;
    }
    > .left {
      .title {
        color: #333;
        font-size: 16px;
        font-weight: 600;
      }
    }
    > .right {
      display: flex;
      align-items: center;
      .list {
        margin-left: 10px;
      }
    }
  }
  .table-header-float {
    position: fixed;
    top: 60px;
    left: 220px;
    z-index: 98;
    background: #fff;
    margin: 0;
    //box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  .table-float {
    .el-table__body-wrapper {
      overflow-y: hidden;
    }
  }
  .table-float-y {
    position: fixed;
    left: 0;
    top: 0;
    .el-table__body-wrapper {
      overflow-y: auto;
    }
  }
  .table-footer {
    display: flex;
    justify-content: space-between;
    .footer {
      flex: 2;
    }
    .fl-data-pager {
      flex: 4;
    }
  }
}
.el-card__body {
  padding-top: 10px;
}
</style>
