<template>
  <div>
    <div class="footer">
      <div class="titile_box">
        <span class="titile">xxx后台管理系统</span>
      </div>
      <div></div>
      <div class="tuichbox">
        <a href="javascript:">退出</a>
      </div>
    </div>
    <div class="serach">
      <input class="serach_text" v-model="serach_id" type="text" />
      <el-button @click="seracid" type="primary">搜索</el-button>
    </div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>导航一
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">用户管理</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-dialog title="修改信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
          <el-form :model="form" :rules="rules">
            <el-form-item prop="id" label="序号" :label-width="'120px'">
              <el-input v-model="form.id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱" :label-width="'120px'">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="mobile" label="电话" :label-width="'120px'">
              <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="putusers">确 定</el-button>
          </div>
        </el-dialog>

        <!-- --------- -->
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="id" label="序号" width="140"></el-table-column>
            <el-table-column prop="username" label="姓名" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="role_name" label="角色"></el-table-column>
            <el-table-column prop="create_time" label="电话"></el-table-column>
            <el-table-column prop="mg_state" label="状态">
              <template prop="mg_state" slot-scope="scope">
                <el-switch
                  @change="putusersstate(scope.row)"
                  v-model="scope.row.mg_state"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </template>
            </el-table-column>

            <!-- <el-table-column v-slot="row" label="操作">
              <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-edit">编辑</el-button>
              <el-button type="danger" @click="removeusers(row.row.id)" icon="el-icon-delete">删除</el-button>
            </el-table-column> -->

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini">编辑</el-button>
                <el-button size="mini" type="danger" @click=" removeusers( scope.row.id)">删除</el-button>
              </template>
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
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import { getuser } from "../../api/getuser.js";
import qs from "qs";
// import {instance} from '../../api/requst.js'
import axios from "axios";
// import {remove,getuser,putusers,userstate,serachId} from '../../api/home.js'
import { mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      size: 2, // 每页得条数
      total: 0, // 总条数
      pagesize: 1, //当前页码
      tableData: [], // 数据渲染
      dialogFormVisible: false, // 编辑用户弹框
      form: {
        // 修改容器
        email: "",
        mobile: "",
        id: null
      },
      rules: {
        // 表单验证
        id: [
          {
            required: true,
            message: "请输入需要修改的员工序号",
            trigger: "blur"
          },
          { pattern: /^[0-9]*$/, message: "请输入数字", trigger: "blur" }
        ],
        // username:[
        //   { required: true, message: '请输入员工姓名', trigger: 'blur' },
        //   { pattern: /^[\u4e00-\u9fa5]{0,}$/, message: '输入有误',trigger: 'blur'}
        // ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: "输入有误",
            trigger: "blur"
          }
        ],
        create_time: [
          { required: true, message: "请输入电话", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ]
      },
      serach_id: "" // 搜索数据内容
    };
  },
  components: {},
  beforeCreate() {
    console.log(this.size, "---------------");
  },
  async created() {
    // 列表数据生成
    this.loadData();
  },
  methods: {
    ...mapActions(["removeuser", "putstate", "getuser", "putuser"]),

    // delete user
    async removeusers(id) {
      let res = await this.removeuser(id);
      if (res.status === 200) {
        this.$notify.success({
          title: "删除成功",
          message: res.data.meta.msg
        });
        //this.loadData() //重新执行
        this.tableData = this.tableData.filter(value => value.id != id);
      }
    },

    // put user state
    async putusersstate(scpoe) {
      await this.putstate(scpoe).then(res => {
        if (res.data.meta.status === 200) {
          this.$notify({
            title: "成功",
            message: res.data.meta.msg,
            type: "success"
          });
          this.tableData.forEach(
            val => val.mg_state === res.data.data.mg_state
          );
        } else {
          this.$notify.error({
            title: "失败,请重新!",
            type: "success"
          });
        }
      });
    },

    // created Users Data
    async loadData() {
      await this.getuser({ pagenum: 1, pagesize: 2 }).then(res => {
        this.tableData = res.data.data.users || {};
        this.total = this.tableData.length;
      });
    },

    // Users size
    async handleSizeChange(size) {
      // 每页显示的条数
      this.size = size;
      await this.getuser({ pagenum: 1, pagesize: this.size }).then(res => {
        if (res.status === 200) {
          this.tableData = res.data.data.users || {};
          this.total = this.tableData.length;
        } else {
          this.$notify.error({
            title: "失败,请重新!",
            type: "success"
          });
        }
      });
    },

    // Users page
    async handleCurrentChange(page) {
      // 当前页的页码
      this.pagesize = page;
      await this.getuser({ pagenum: this.pagesize, pagesize: this.size }).then(
        res => {
          if (res.status === 200) {
            this.tableData = res.data.data.users || {};
            this.total = res.data.data.total;
          } else {
            this.$notify.error({
              title: "失败,请重新!",
              type: "success"
            });
          }
        }
      );
    },

    // put Userinfo
    async putusers() {
      // 修改用户资料
      this.dialogFormVisible = false;
      await this.putuser(this.form).then(res => {
        console.log(res);

        if (res.status === 200) {
          this.$notify({
            title: "编辑成功",
            type: "success"
          });
          for (let i = 0; i < this.tableData.length; i++) {
            if (res.data.data.id === this.tableData[i].id) {
              this.tableData[i].email = res.data.data.email;
              this.tableData[i].create_time = res.data.data.mobile;
            }
          }
        } else {
          this.$notify.error({
            title: "编辑失败",
            type: "success"
          });
        }
      });
    },

    seracid() {
      // 查找
      //  await serachId(this.serach_id)
      //   .then(res =>{
      //     // console.log(res.data.data.id);
      //     // console.log(res.data.data);
      //     if (res.data.meta.status === 200) {
      //      for (let i = 0; i < this.tableData.length; i++) {
      //         if (this.tableData[i].id === res.data.data.id) {
      //            this.tableData =  this.tableData.filter((value) => value.id === res.data.data.id);
      //         } else{
      //           this.tableData = res.data.data
      //         }
      //      }
      //       //  console.log(  this.tableData,"33333");
      //       console.log(res);
      //     } else {
      //       this.$message('找不到用户')
      //     }
      //   })
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.block {
  margin-left: 200px;
}
.footer {
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .titile_box {
    font-size: 30px;
    span {
      color: rgba(112, 202, 155);
    }
  }
}

.tuichbox {
  a {
    text-decoration: none;
    font-size: 20px;
    line-height: 100px;
    color: #4444;
  }
  a:hover {
    color: red;
  }
}
.serach {
  display: flex;
  justify-content: center;
  align-items: center;
  .serach_text {
    height: 35px;
    width: 300px;
    padding-left: 20px;
    border-radius: 10px;
    font-size: 25px;
    color: #444;
  }
}
</style>