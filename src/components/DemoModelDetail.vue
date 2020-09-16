<template>
    <div class="demo_model_detail">
        <el-container>
            <el-page-header @back="" content="模型明细信息面板"></el-page-header>
            <el-header>
                <el-row>
                    <el-col :span="8">
                        <el-card shadow="never" class="box-card el_card_left">
                            <div slot="header" class="clearfix">
                                <span style="color: #409EFF;">模型摘要信息</span>
                            </div>
                            <div class="mode_info_item">
                                <div>
                                    <label>模型名</label>
                                </div>
                                {{ modelInfo.modelName }}
                            </div>
                            <div class="mode_info_item">
                                <div>
                                    <label class="clearfix">包 名</label>
                                </div>
                                {{ modelInfo.packageDir }}
                            </div>
                            <div class="mode_info_item">
                                <div>
                                    <label>表 名</label>
                                </div>
                                {{ modelInfo.tableName }}
                            </div>
                            <div class="mode_info_item">
                                <div>
                                    <label>创建人</label>
                                </div>
                                {{ modelInfo.createUser }}
                            </div>
                            <div class="mode_info_item">
                                <div>
                                    <label>创建时间</label>
                                </div>
                                {{ modelInfo.createTime }}
                            </div>
                        </el-card>
                    </el-col>

                    <el-col :span="16" v-if="isAdd">
                        <el-card shadow="never" class="el_card_right">
                            <div class="form_title">录入属性信息</div>
                            <el-form :model="modelDetailForm" ref="modelDetailForm" :rules="modelDetailFormRules"
                                     label-width="100px">
                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="属性名称" prop="propertyName">
                                            <el-input v-model="modelDetailForm.propertyName" autocomplete="off"/>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="属性类型" prop="propertyTypeId">
                                            <el-select placeholder="请选择" v-model="modelDetailForm.propertyTypeId"
                                                       @focus="loadProTypeList">
                                                <el-option v-for="(item,index) in proTypeList" :key="item.id"
                                                           :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="描述 / 注释" prop="remark">
                                    <el-input type="textarea" :rows="2" placeholder="请输入内容" resize="horizontal"
                                              v-model="modelDetailForm.remark">
                                    </el-input>
                                </el-form-item>

                                <el-divider/>

                                <el-row>
                                    <el-col :span="10">
                                        <el-form-item label="字段名称" prop="columnName">
                                            <el-input v-model="modelDetailForm.columnName"/>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="类型" prop="columnTypeId">
                                            <el-select placeholder="请选择" v-model="modelDetailForm.columnTypeId"
                                                       @focus="loadColTypeList">
                                                <el-option v-for="(item,index) in colTypeList" :key="item.id"
                                                           :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="长度" prop="columnLength">
                                            <el-input v-model.number="modelDetailForm.columnLength" autocomplete="off"/>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-form-item>
                                    <el-button type="primary" @click="submitModelDetailForm('modelDetailForm')"
                                               :loading="loading">{{ loading ? "正在提交 ..." : "提 交" }}
                                    </el-button>
                                    <el-button @click="resetModelDetailForm('modelDetailForm')">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </el-col>
                    <el-col :span="16" v-else>
                        <el-card shadow="never" class="el_card_right">
                            <div class="form_title">修改属性信息</div>
                            <el-form :model="modelDetailForm" ref="modelDetailForm" :rules="modelDetailFormRules"
                                     label-width="100px">
                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="属性名称" prop="propertyName">
                                            <el-input v-model="modelDetailForm.propertyName" autocomplete="off"/>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="属性类型" prop="propertyTypeId">
                                            <el-select placeholder="请选择" v-model="modelDetailForm.propertyTypeId"
                                                       @focus="loadProTypeList">
                                                <el-option v-for="(item,index) in proTypeList" :key="item.id"
                                                           :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="描述 / 注释" prop="remark">
                                    <el-input type="textarea" :rows="2" placeholder="请输入内容" resize="horizontal"
                                              v-model="modelDetailForm.remark">
                                    </el-input>
                                </el-form-item>

                                <el-divider/>

                                <el-row>
                                    <el-col :span="10">
                                        <el-form-item label="字段名称" prop="columnName">
                                            <el-input v-model="modelDetailForm.columnName"/>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="类型" prop="columnTypeId">
                                            <el-select placeholder="请选择" v-model="modelDetailForm.columnTypeId"
                                                       @focus="loadColTypeList">
                                                <el-option v-for="(item,index) in colTypeList" :key="item.id"
                                                           :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="长度" prop="columnLength">
                                            <el-input v-model.number="modelDetailForm.columnLength" autocomplete="off"/>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-form-item>
                                    <el-button type="primary" @click="editSave('modelDetailForm')"
                                               :loading="loading">{{ loading ? "正在提交 ..." : "保存修改" }}
                                    </el-button>
                                    <el-button @click="cancelEdit('modelDetailForm')">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </el-col>
                </el-row>
            </el-header>

            <el-main>
                <el-table :data="modelDetailData" style="width: 100%" size="mini" border>
                    <el-table-column prop="propertyName" label="属性名" width="180" align="center" :resizable="false"/>
                    <el-table-column prop="proType" label="属性类型" width="120" align="center"/>
                    <el-table-column prop="remark" label="描述"/>
                    <el-table-column prop="sortNo" label="排序" width="100" align="center" :resizable="false"/>
                    <el-table-column prop="columnName" label="字段名" width="180"/>
                    <el-table-column prop="_colType" label="字段类型" width="160"/>

                    <el-table-column label="操作">
                        <template slot-scope="scope" v-if="scope.row.inherentFlag !== 1">
                            <el-button @click="editBtnClick(scope.row)" type="text" size="small">修改</el-button>
                            <el-button @click="delBtnClick(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {

    methods: {
        // 加载属性类型数据
        loadProTypeList() {
            console.log(this.proTypeList);
            // 没有值时才去后端加载
            if (this.proTypeList === null || this.proTypeList.length === 0) {
                // 请求后端
                this.$axios.get("/api/demo/property/type/s", {timeout: 1000,}).then(response => {
                    if (response.status === 200 && response.data.code === '200' && response.data.data !== null
                        && response.data.data.optCode === '1') {
                        console.log(response.data.data);
                        if (response.data.data.propertyTypeList !== null) {
                            this.proTypeList = response.data.data.propertyTypeList;
                        } else {
                            this.$message.warning("列表数据为空");
                        }
                    } else {
                        this.$message.error("列表数据加载失败");
                    }
                }).catch(error => {
                    this.$message.error("服务器错误：" + error.message);
                });
            }
        },

        // 加载字段类型数据
        loadColTypeList() {
            console.log("========= start load column type data !");
            if (this.colTypeList === null || this.colTypeList.length === 0) {
                this.$axios.get("/api/demo/property/type/colTypes", {timeout: 1000,}).then(response => {
                    if (response.status === 200 && response.data.code === '200' && response.data.data !== null
                        && response.data.data.optCode === '1') {
                        console.log(response.data.data);
                        if (response.data.data.columnTypeList !== null) {
                            this.colTypeList = response.data.data.columnTypeList;
                            console.log(this.colTypeList);
                        } else {
                            this.$message.warning("列表数据为空");
                        }
                    } else {
                        this.$message.error("列表数据加载失败");
                    }
                }).catch(error => {
                    this.$message.error("服务器错误：" + error.message);
                });
            }
        },

        // 加载模型明细列表数据
        async loadModelDetailList() {
            await this.$axios.get("/api/demo/model/detail/list", {
                params: {
                    modelId: this.modelInfoId,
                },
                timeout: 1000,
            }).then(response => {
                if (response.status === 200 && response.data.code === '200' && response.data.data !== null
                    && response.data.data.optCode === '1') {
                    console.log(response.data.data);
                    if (response.data.data.detailList !== null) {
                        this.modelDetailData = response.data.data.detailList;
                        // 设置字段类型（带长度）
                        for (let i = 0; i < this.modelDetailData.length; i++) {
                            // 字段类型的长度未设置，可以取默认长度
                            let _colType = this.modelDetailData[i].colType;
                            if (this.modelDetailData[i].columnLength !== null && this.modelDetailData[i].columnLength !== '0') {
                                _colType += ('(' + this.modelDetailData[i].columnLength + ')');

                            } else if (this.modelDetailData[i].defaultColLen !== null && this.modelDetailData[i].deafaultColLen !== '0') {
                                _colType += ('(' + this.modelDetailData[i].defaultColLen + ')');
                            }
                            this.modelDetailData[i]._colType = _colType;
                        }
                    } else {
                        this.$message.warning("列表数据为空");
                    }
                } else {
                    this.$message.error("列表数据加载失败");
                }
            }).catch(error => {
                this.$message.error("服务器错误：" + error.message);
            });
        },

        // 点击了修改按钮
        async editBtnClick(row,formName) {
            // const {data: res} = await this.$axios.get("/api/demo/model");
            if (row === null) { // 前端数据丢失
                this.$notify({
                    title: '警告',
                    message: '前端数据丢失，请刷新后重试',
                    type: 'warning',
                    offset: 100
                });
                return;
            }
            this.isAdd = false;
            this.resetModelDetailForm('modelDetailForm')
            this.modelDetailForm.id = row.id;
            this.modelDetailForm.propertyName = row.propertyName;
            this.modelDetailForm.propertyTypeId = row.propertyTypeId;
            this.modelDetailForm.remark = row.remark;
            this.modelDetailForm.columnName = row.columnName;
            this.modelDetailForm.columnTypeId = row.columnTypeId;
            this.modelDetailForm.columnLength = row.columnLength;
            console.log(this.modelDetailForm);
            // this.dialogFormVisible
            /*await this.$axios.get("/api/demo/model/" + row.id).then(response => {
                console.log(response);
                if (response.status === 200 && response.data.code === '200' && response.data.data !== null) {
                    if (response.data.data.optCode === '1') {

                        // this.dialog = true;
                    }
                } else {
                    this.$message.error("请求失败");
                }
            }).catch(error => {
                this.$message.error("服务器错误：" + error.message);
            });*/

        },

        // 处理修改模型明细中的保存动作
        editSave(formName) {
            if (this.loading) {
                return;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    // 请求后端
                    this.$axios.put('/api/demo/model/detail/' + this.modelDetailForm.id, {}, {
                        params: {
                            propertyName: this.modelDetailForm.propertyName,
                            propertyTypeId: this.modelDetailForm.propertyTypeId,
                            remark: this.modelDetailForm.remark,
                            columnName: this.modelDetailForm.columnName,
                            columnTypeId: this.modelDetailForm.columnTypeId,
                            columnLength: this.modelDetailForm.columnLength,
                        },
                        timeout: 2000,
                    }).then(response => {
                        console.log(response);
                        if (response.status === 200 && response.data.code === '200' && response.data.data !== null) {
                            if (response.data.data.optCode === '1') {
                                this.$message.success("更新成功");
                                // 刷新列表
                                this.loadModelDetailList();
                                this.resetModelDetailForm(formName);
                            }else{
                                this.$message.error(response.data.data.message);
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
                            this.isAdd = true;
                        }, 100);
                    });

                }
            });

        },
        // 取消编辑
        cancelEdit(formName){
            this.resetModelDetailForm(formName);
            this.isAdd = true;
        },

        // 点击了删除按钮
        delBtnClick(row) {
            console.log(row);

            this.$confirm('此操作将永久删除该属性和字段, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete("/api/demo/model/detail/" + row.id, {timeout: 1000,}).then(response => {
                    console.log(response);
                    if (response.status === 200 && response.data.code === '200' && response.data.data !== null) {
                        console.log(response.data.data);
                        if (response.data.data.optCode === '1') {
                            // this.modelData.slice(row.index - 1, 1);
                            this.loadModelDetailList();
                            this.$notify({
                                title: '成功',
                                message: '已永久删除',
                                type: 'success',
                                offset: 100
                            });
                        }else {
                            this.$message.error(response.data.data.message);
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

        // 保存模型明细
        submitModelDetailForm(formName) {
            if (this.loading) {
                return;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.modelInfoId === null || this.modelInfoId === '') {
                        this.$notify({
                            title: '警告',
                            message: '模型ID为空，请刷新重试',
                            type: 'error',
                            offset: 100
                        });
                        return;
                    }
                    this.modelDetailForm.modelId = this.modelInfoId;
                    this.loading = true;
                    // 请求后端
                    console.log(this.modelDetailForm);
                    this.$axios.post('/api/demo/model/detail', this.modelDetailForm, {timeout: 1000,}).then(response => {
                        if (response.status === 200 && response.data.code === '200' && response.data.data !== null) {
                            console.log(response.data.data);
                            if (response.data.data.optCode === '1' && response.data.data.modelDetail !== null) {
                                this.$notify({
                                    title: '成功',
                                    message: '已成功添加',
                                    type: 'success',
                                    offset: 100
                                });
                                // 刷新列表
                                this.loadModelDetailList();
                            } else {
                                this.$message.error(response.data.data.message);
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

                }
            });
        },

        // 重置录入
        resetModelDetailForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
    // 相当于 onload方法
    created() {
        // 获取父组件传来的 模型信息
        this.modelInfoId = this.$route.query.modelInfoId;
        if (this.modelInfoId === null) { //未获取到值，直接返回
            this.$router.go(-1);
        }
        console.log("===========" + this.modelInfoId);
        this.$axios.get("/api/demo/model/" + this.modelInfoId, {timeout: 1000,}).then(response => {
            if (response.status === 200 && response.data.code === '200' && response.data.data !== null
                && response.data.data.optCode === '1') {
                console.log(response.data.data);
                if (response.data.data.detailList !== null) {
                    this.modelInfo = response.data.data;
                } else {
                    this.$message.warning("列表数据为空");
                }
            } else {
                this.$message.error("列表数据加载失败");
            }
        }).catch(error => {
            this.$message.error("服务器错误：" + error.message);
        });
        if(this.modelInfo !== null){
            this.loadModelDetailList();
            this.loadProTypeList();
            this.loadColTypeList();
        }else{
            this.$message.error("服务器错误，请重试");
        }
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
            modelDetailData: [],
            modelInfo: {},
            modelInfoId: '',

            // 修改和添加共用的表单数据
            isAdd: true,
            modelDetailForm: {
                id: '',
                modelId: '',
                propertyName: '',
                propertyTypeId: '',
                remark: '',
                columnName: '',
                columnTypeId: '',
                columnLength: '',
            },
            // 修改和添加共用的表单数据
            modelDetailForm1: {
                id: '',
                modelId: '',
                propertyName: '',
                propertyTypeId: '',
                remark: '',
                columnName: '',
                columnTypeId: '',
                columnLength: '',
            },


            modelDetailFormRules: {
                propertyName: [
                    {required: true, message: '请输入属性名（符合驼峰命名）', trigger: 'blur'},
                ],
                propertyTypeId: [
                    {required: true, message: '请选择属性类型', trigger: 'blur'},
                ],
                remark: [
                    {required: true, message: '请输入该属性或字段的解释', trigger: 'blur'},
                ],
                columnName: [
                    {required: true, message: '请输入表字段名（两个单词间用“_”隔开）', trigger: 'blur'},
                ],
                columnTypeId: [
                    {required: true, message: '请选择表字段类型', trigger: 'blur'},
                ],
                columnLength: [
                    {validator: isNum, message: '请输入正整数', trigger: 'blur'},
                ],
            },

            typeSelectLoading: false,
            proTypeList: [],
            colTypeList: [],
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
.el-container {
    width: 90%;
    height: 100%;
    margin: 0 auto;
}

.el-header {
    padding: 0;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;;
    font-weight: 400;
    //height: 200px;
    flex: 1;
}

.el-main {
    background-color: #E9EEF3;
    padding: 2px;
    padding-bottom: 20px;
}

/****************************************/

/*** 抽屉式弹框样式 ***/
.demo_model_detail /deep/ .el-drawer__body {
    padding: 10px;
    flex: 1;
    display: block;


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
    font-size: 16px;
}

.el-row {
    //margin-bottom: 15px;
}

/**********************************************************/

.model_detail_collapse {

    margin-bottom: 24px;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    padding: 24px;
}

.el-collapse {
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
}


/****************************/
.mode_info_item {
    font-size: 16px;
    margin-bottom: 20px;

    div {
        text-align: right;
        width: 70px;
        float: left;
        padding-right: 20px;
        padding-top: 0;

        label {
            font-weight: bold;
        }
    }
}

/****************************/
.el-page-header {
    line-height: 40px;
    background-color: #8CC5FF;
}

.el-card {
    border: none;
}

.el_card_right {
    margin-left: 10px;
    border-left: 1px solid #C6E2FF;
}

.el_card_left {
    padding-right: 10px;
}

/**********************************/
.form_title {
    font-size: large;
    margin-bottom: 10px;
}


</style>
