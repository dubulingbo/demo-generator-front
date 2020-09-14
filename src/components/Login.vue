<template>
    <div class="login_container">
        <div class="login_box">
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user" type="text"/>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="login">登 录</el-button>
                    <el-button size="mini" @click="resetForm('loginFormRef')">清 空</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            loginForm: {
                username: "admin",
                password: "12345678",
            },
            loginFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 5, message: '长度至少为 5 位字符', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 8, message: '长度至少为 8 位字符', trigger: 'blur' },
                ]
            },
        }
    },
    methods: {
        resetForm(ref){
            this.$refs[ref].resetFields();
        },
        login(){
            this.$refs.loginFormRef.validate(async (valid) => {
                // console.log(valid);
                if(valid){ // 前端校验通过
                    await this.$router.push("/model/view");
                    const res = await this.$http.post("login",this.loginForm);
                    console.log(res);
                    if(res.code !== 20000){
                        this.$message.error("用户或密码不正确");
                    }else{
                        this.$message.success("登录成功");
                        window.sessionStorage.setItem("token",res.token);
                        await this.$router.push("/model/view");
                    }
                }
            });
        },
    }
}

</script>

<style lang="less" scoped>
.login_container{
    height: 100%;
    background: floralwhite;
}
.login_box{
    height: 300px;
    width: 400px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 10px 10px 5px 5px #888888;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .login_form{
        padding: 30px;
    }
}
.login_form /deep/ .el-input__inner{
    height: 35px;
}

</style>
