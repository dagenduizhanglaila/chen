<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../../api/login.js";
import {mapMutations} from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      // token
      token: "",
      // 表单数据
      ruleForm: {
        username: "",
        password: ""
      },
      // 表单验证规则
      rules: {
        username: [
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        password: [
          { min: 3, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    
  }, 
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.ruleForm)
            .then(res => { 
              console.log(res);
              
              if (res.data.meta.status === 200) {
                console.log(res);
                
              this.token = res.data.data.token;
              localStorage.setItem('token',this.token);
              this.$message()
              this.$router.push({path:'home'})
              this.$message.success("登陆成功");
                
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("用户名和密码不符");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /deep/ .el-form {
    width: 500px;
    height: 300px;
  }
}
</style>