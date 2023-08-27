<template>
  <el-card class="box-card">
    <div class="btn">
      <el-button type="primary">添加</el-button>
      <el-button type="primary">修改</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" class="ta">
      <!-- <el-table-column
      v-for="(item, index) in tableData"
      :label="item.label"
      :key="index"
      :prop="item.prop"
      :fixed="item.fixed"
      :min-width="item.minWidth"
      align="center"
    >
    </el-table-column> -->
      <!-- 列 -->
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <!-- 操作 -->
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'mytable',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          width: 180,
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    }
  },
  handleClick(item) {
    console.log(item)
  },
  handleEdit(index, item) {
    console.log(index, item)
  },
  handleDelete(index, item) {
    console.log(index, item)
  },
}
</script>

<style lang="less" scoped>
.box-card {
  position: relative;
}
.btn {
  position: absolute;
  display: inline-block;
  top: 5px;
  right: 20px;
  height: 50px;
  line-height: 50px;
}
.ta {
  margin-top: 40px;
}
</style>
