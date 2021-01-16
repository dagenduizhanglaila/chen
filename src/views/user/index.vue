<template>
  <el-main>
    <el-table :data="tableData">
      <el-table-column prop="id" label="序号" width="140"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column prop="create_time" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="状态">
        <el-switch v-model="mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-table-column>

      <el-table-column label="操作">
        <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-edit">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagesize"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-main>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
};
</script>

<style>
</style>