<template>
    <div class="demo_model">
        <el-container>
            <el-header>
                <el-collapse v-model="activeNames" @change="handleCollapseChange">
                    <el-collapse-item title="下拉面板。。。" name="1">
                        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                    </el-collapse-item>
                </el-collapse>
            </el-header>
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="3">
                        <!--                        <el-button @click="addBtnClick" type="primary" plain>添加模型</el-button>-->
                        <el-button @click="addBtnClick" type="primary" icon="el-icon-plus" round>添加模型</el-button>
                    </el-col>
                    <el-col :span="8">
                        <div>
                            <el-input placeholder="请输入模型名" v-model="searchInput">
                                <el-button @click="searchModel" slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-table :data="modelData" style="width: 100%" class="model_list_table" size="mini">
                    <el-table-column prop="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="name" label="模型名"></el-table-column>
                    <el-table-column prop="remark" label="描述" width="180"></el-table-column>
                    <el-table-column prop="tableName" label="对应表名"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
                    <el-table-column prop="createUser" label="创建人" width="120"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button @click="configBtnClick(scope.row)" type="text" size="small">配置</el-button>
                            <el-button @click="editBtnClick(scope.row)" type="text" size="small">修改</el-button>
                            <el-button @click="delBtnClick(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>

        <el-drawer title=" 你正在编辑模型..." :before-close="handleClose" :show-close=false :visible.sync="dialog"
                   direction="rtl" custom-class="demo-drawer" ref="drawer" :wrapperClosable=false>
            <div class="demo-drawer__content">
                <el-form :model="modelForm" :rules="modelFormRules" ref="modelForm">
                    <el-form-item label="模型名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="modelForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="模型描述" :label-width="formLabelWidth" prop="remark">
                        <el-input v-model="modelForm.remark" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" :label-width="formLabelWidth" class="model_drawer_sortInput" prop="sortNo">
                        <el-input v-model.number="modelForm.sortNo" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">
                        {{ loading ? '提交中 ...' : '提 交' }}
                    </el-button>
                </div>
            </div>
        </el-drawer>

        <el-dialog title="添加模型" :visible.sync="dialogFormVisible" width="40%"
                   :lock-scroll="true" :close-on-click-modal="false" :show-close="false" :destroy-on-close="true">
            <el-form :model="modelForm" :rules="modelFormRules" ref="modelForm">
                <el-form-item label="模型名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="modelForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="模型描述" :label-width="formLabelWidth" prop="remark">
                    <el-input v-model="modelForm.remark" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" :label-width="formLabelWidth" class="model_drawer_sortInput" prop="sortNo">
                    <el-input v-model.number="modelForm.sortNo" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button type="primary" @click="submitModel('modelForm')" :loading="loading">
                    {{ loading ? '提交中 ...' : '添 加' }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    methods: {
        // 加载模型列表数据
        async loadModelList() {
            await this.$axios.get("/api/demo/model/s", {
                timeout: 1000,
            }).then(response => {
                if (response.status === 200 && response.data.code === '200' && response.data.data !== null
                    && response.data.data.optCode === '1') {
                    console.log(response.data);
                    if (response.data.data.records !== null) {
                        this.modelData = response.data.data.records;
                        for (let i = 0; i < this.modelData.length; i++) {
                            this.modelData[i].index = i + 1;
                        }
                    } else {
                        this.$message.warning("模型列表数据为空");
                    }
                } else {
                    this.$message.error("模型列表数据加载失败");
                }
            }).catch(error => {
                this.$message.error("服务器错误：" + error.message);
            });
        },

        // 点击了配置按钮
        configBtnClick(row) {
            console.log(row);
            this.$router.push("/model/detail");
        },

        // 点击了修改按钮
        async editBtnClick(row) {
            console.log(row);
            // const {data: res} = await this.$axios.get("/api/demo/model");
            if (row.id.trim() !== null && row.id.trim() !== '') {
                await this.$axios.get("/api/demo/model/" + row.id).then(response => {
                    console.log(response);
                    if (response.status === 200 && response.data.code === '200' && response.data.data !== null) {
                        if (response.data.data.optCode === '1') {
                            this.modelForm.id = response.data.data.id;
                            this.modelForm.name = response.data.data.name;
                            this.modelForm.remark = response.data.data.remark;
                            this.modelForm.sortNo = response.data.data.sortNo;
                            this.dialog = true;
                        }
                    } else {
                        this.$message.error("请求失败");
                    }
                }).catch(error => {
                    this.$message.error("服务器错误：" + error.message);
                });
            }
        },

        // 点击了删除按钮
        delBtnClick(row) {
            console.log(row);

            this.$confirm('此操作将永久删除该模型, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete("/api/demo/model/" + row.id, {timeout: 1000,}).then(response => {
                    console.log(response);
                    if (response.status === 200 && response.data.code === '200' && response.data.data !== null) {
                        console.log(response.data.data);
                        if (response.data.data.optCode === '1') {
                            // this.modelData.slice(row.index - 1, 1);
                            this.loadModelList();
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                            });
                        }
                    } else {
                        this.$message.error("请求失败");
                    }
                }).catch(error => {
                    this.$message.error("服务器错误：" + error.message);
                });
            }).catch(() => {
            });
        },

        // 点击了添加按钮
        addBtnClick() {
            this.modelForm.id = '';
            this.modelForm.name = '';
            this.modelForm.remark = '';
            this.modelForm.sortNo = '';
            this.dialogFormVisible = true;
        },

        // 保存模型
        submitModel(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    // 请求后端
                    this.$axios.post('/api/demo/model/', {
                        name: this.modelForm.name,
                        remark: this.modelForm.remark,
                        sortNo: this.modelForm.sortNo,
                    }, {timeout: 1000,}).then(response => {
                        console.log(response);
                        if (response.status === 200 && response.data.code === '200' && response.data.data !== null) {
                            if (response.data.data.optCode === '1') {
                                this.$message.success("已成功添加");
                                // 刷新列表
                                this.loadModelList();
                                // 关闭弹框
                                setTimeout(() => {
                                    this.dialogFormVisible = false;
                                }, 400);
                            }
                        } else {
                            this.$message.error("请求失败");
                        }
                    }).catch(error => {
                        this.$message.error("服务器错误：" + error.message);
                    }).finally(() => { //最后需要关闭动画
                        // 动画关闭需要一定的时间
                        setTimeout(() => {
                            this.loading = false;
                        }, 100);
                    });

                } else {
                    this.$notify({
                        title: '警告',
                        message: '字段验证不通过，请仔细检查后再提交',
                        type: 'warning'
                    });
                    console.log('error submit!!');
                    // return false;
                }
            });
        },

        // 点击搜索按钮
        async searchModel() {
            console.log(this.searchInput);
            let modelName = this.searchInput.trim();

            console.log("即将请求后台数据..." + modelName);
            await this.$axios.get("/api/demo/model/s", {
                params: {
                    modelName: this.searchInput,
                },
                timeout: 1000,
            }).then(response => {
                console.log(response);
                if (response.status === 200 && response.data.code === '200' && response.data.data !== null) {
                    if (response.data.data.optCode === '1') {
                        this.modelData = response.data.data.records;
                        for (let i = 0; i < this.modelData.length; i++) {
                            this.modelData[i].index = i + 1;
                        }
                    }
                } else {
                    this.$message.error("请求失败");
                }
            }).catch(error => {
                this.$message.error("服务器错误：" + error.message);
            });
        },

        // 处理修改模型中的保存动作
        async handleClose(done) {
            if (this.loading) {
                return;
            }
            this.$refs['modelForm'].validate((valid) => {
                if (valid) {

                    this.$confirm('确定要提交表单吗？').then(_ => {
                        this.loading = true;
                        // 请求后端
                        this.$axios.put('/api/demo/model/' + this.modelForm.id, {}, {
                            params: {
                                name: this.modelForm.name,
                                remark: this.modelForm.remark,
                                sortNo: this.modelForm.sortNo,
                                tableName: this.modelForm.tableName,
                            },
                            timeout: 1000,
                        }).then(response => {
                            console.log(response);
                            if (response.status === 200 && response.data.code === '200' && response.data.data !== null) {
                                if (response.data.data.optCode === '1') {
                                    this.$message.success("更新成功");
                                    // 刷新列表
                                    this.loadModelList();
                                    // 关闭弹框
                                    setTimeout(() => {
                                        done();
                                    }, 400);
                                }
                            } else {
                                this.$message.error("请求失败");
                            }
                        }).catch(error => {
                            this.$message.error("服务器错误：" + error.message);
                        }).finally(() => { //最后需要关闭动画
                            // 动画关闭需要一定的时间
                            setTimeout(() => {
                                this.loading = false;
                            }, 400);
                        });
                    }).catch(_ => {
                        console.log("你点击了取消");
                    });

                } else {
                    this.$notify({
                        title: '警告',
                        message: '字段验证不通过，请仔细检查后再提交',
                        type: 'warning'
                    });
                    console.log('error submit!!');
                    // return false;
                }
            });


        },
        cancelForm() {
            this.loading = false;
            this.dialog = false;
            this.dialogFormVisible = false;
        },

        handleCollapseChange(val) {
            console.log(val);
        }
        // 根据模型名自动生成 表名
        // changeTableName() {
        //     let str = this.modelForm.name;
        //     if (str === null || str === '') {
        //         this.modelForm.tableName = this.modelForm.name;
        //         return;
        //     }
        //     console.log(str + "=====" + str.length);
        //     if (str.indexOf('.') !== -1) {
        //         str = str.substring(str.lastIndexOf('.') + 1);
        //     }
        //     str = str.trim(); // 先去除前后的空格
        //     console.log(str + "=====" + str.length);
        //
        //     let tmp = str.substring(0, 1).toLowerCase();
        //     for (let i = 1; i < str.length; i++) {
        //         if (str[i] >= 'A' && str[i] <= 'Z') {
        //             tmp += ('_' + str.charAt(i).toLowerCase());
        //         } else {
        //             tmp += str[i];
        //         }
        //     }
        //     console.log(tmp + "======" + tmp.length);
        //     this.modelForm.tableName = tmp;
        // },

    },
    // 相当于 onload方法
    created() {
        //自动加载方法
        this.loadModelList();
    },
    data() {
        const isNum = (rule, value, callback) => {
            if (value === null || value === '') {
                return callback();
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 1) {
                        callback(new Error('必须为正整数'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        return {
            activeNames: ['1'],





            modelData: [],
            searchInput: '',

            modelForm: {
                id: '',
                name: '',
                remark: '',
                sortNo: '',
            },

            modelFormRules: {
                name: [
                    {required: true, message: '请输入模型名（带包路径）', trigger: 'blur'},
                ],
                remark: [
                    {required: true, message: '请填写模型备注', trigger: 'blur'}
                ],
                sortNo: [
                    {validator: isNum, message: '请输入正整数', triangle: 'blur'},
                ],
            },
            formLabelWidth: '80px',
            dialog: false,
            loading: false,

            dialogFormVisible: false,
        };
    },
}
</script>

<style lang="less" scoped>
.demo_model {
    overflow-y: hidden;
}

/******************容器布局样式**********************/
.el-header {
    padding-left: 30px;
    padding-top: 10px;
    font-family: "Arial Black", "微软雅黑", serif;
    font-size: 20px;
    height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
}

/****************************************/

/*** 抽屉式弹框样式 ***/
.demo_model /deep/ .el-drawer__body {
    padding: 10px;
    flex: 1;
    display: block;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;;
    font-weight: 400;

}

.demo-drawer__content {
    display: flex;
    flex-direction: column;
    height: 100%;

    .el-form {
        flex: 1;
    }
}

.demo-drawer__footer {
    display: flex;

    .el-button {
        flex: 1;
    }
}

.model_drawer_sortInput {
    width: 200px;
}

/**********************************************************/

/*** 列表样式 ***/
.el-table {
    background: oldlace;
    font-family: "新宋体", serif;
    font-size: 16px;
}

.el-row {
    margin-bottom: 15px;
}

/**********************************************************/

</style>
