<template>
    <div class="demo_model">
        <el-container>
            <el-header>代码生成工具</el-header>
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div>
                            <el-input placeholder="请输入模型名" v-model="searchInput">
                                <el-button @click="searchModel" slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <el-button @click="addBtnClick" type="primary" plain>添加模型</el-button>
                    </el-col>
                </el-row>
                <el-table :data="modelData" style="width: 100%">
                    <!--                    <el-table-column prop="sortNo" label="序号" width="60"></el-table-column>-->
                    <el-table-column prop="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="name" label="模型名"></el-table-column>
                    <el-table-column prop="remark" label="描述"></el-table-column>
                    <el-table-column prop="tableName" label="对应表名"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
                    <el-table-column prop="createUser" label="创建人" width="100"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="configBtnClick(scope.row)" type="text" size="small">配置</el-button>
                            <el-button @click="editBtnClick(scope.row)" type="text" size="small">修改</el-button>
                            <el-button @click="delBtnClick(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>

        <el-drawer title=" 你正在编辑模型..." :before-close="handleClose" :visible.sync="dialog" direction="rtl" custom-class="demo-drawer" ref="drawer">
            <div class="demo-drawer__content">
                <el-form :model="form">
                    <el-form-item label="模型名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="模型描述" :label-width="formLabelWidth">
                        <el-input v-model="form.remark" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" :label-width="formLabelWidth">
                        <el-input v-model="form.sortNo" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="表名" :label-width="formLabelWidth">
                        <el-input v-model="form.tableName" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    methods: {
        // 加载模型列表数据
        async loadModelList() {
            const {data: res} = await this.$axios.get("/api/demo/model/s")
            console.log(res);
            if (res.code === '200' && res.data.optCode === '1') {
                if (res.data.records !== null) {
                    this.modelData = res.data.records;
                    for (let i = 0; i < this.modelData.length; i++) {
                        this.modelData[i].index = i + 1;
                    }
                    this.$message.success("数据加载成功");
                } else {
                    this.$message.warning("模型列表数据为空");
                }
            } else {
                alert("模型列表数据加载失败");
            }
        },
        configBtnClick(row) {
            console.log(row);
        },
        async editBtnClick(row) {
            console.log(row);
            // const {data: res} = await this.$axios.get("/api/demo/model");
            if(row.id.trim() !== null && row.id.trim() !== ''){
                await this.$axios.get("/api/demo/model/"+row.id).then(response => {
                    console.log(response);
                    if (response.status === 200 && response.data.code === '200' && response.data.data !== null) {
                        if (response.data.data.optCode === '1') {
                            this.form.name = response.data.data.name;
                            this.form.remark = response.data.data.remark;
                            this.form.sortNo = response.data.data.sortNo;
                            this.form.tableName = response.data.data.tableName;
                            this.dialog = true;

                        }
                    } else {
                        this.$message.error("请求失败");
                    }
                }).catch(error => {
                    this.$message.error("请求未到服务器：" + error.message);
                });
            }

            //
            //
            //
            // if(res.code === '200' && res.data.optCode === '1'){
            //     // 弹出修改框
            //     this.dialog = true;
            // }
        },
        async delBtnClick(row) {
            console.log(row);
        },
        async addBtnClick() {
            console.log("点击的添加按钮");
        },
        async searchModel() {
            console.log(this.searchInput);
            let modelName = this.searchInput.trim();
            if (modelName !== null && modelName !== '') {
                console.log("即将请求后台数据..." + modelName);
                await this.$axios.get("/api/demo/model/s", {
                    params: {
                        modelName: this.searchInput,
                    }
                }).then(response => {
                    console.log(response);
                    if (response.status === 200 && response.data.code === '200' && response.data.data !== null) {
                        if (response.data.data.optCode === '1') {
                            this.modelData = response.data.data.records;
                            // response.data.data.records.forEach((item, index) => {
                            //     this.modelData[index] = item;
                            //     this.modelData[index].index = index + 1;
                            // });
                            for (let i = 0; i < this.modelData.length; i++) {
                                this.modelData[i].index = i + 1;
                            }
                        }
                    } else {
                        this.$message.error("请求失败");
                    }
                }).catch(error => {
                    this.$message.error("请求未到服务器：" + error.message);
                });
            }else{
                this.$message.info("请输入内容后访问");
            }
        },

        handleClose(done) {
            if (this.loading) {
                return;
            }
            this.$confirm('确定要提交表单吗？')
                .then(_ => {
                    this.loading = true;
                    this.timer = setTimeout(() => {
                        done();
                        // 动画关闭需要一定的时间
                        setTimeout(() => {
                            this.loading = false;
                        }, 400);
                    }, 2000);
                }).catch(_ => {});
        },
        cancelForm() {
            this.loading = false;
            this.dialog = false;
            clearTimeout(this.timer);
        }
    },
    // 相当于 onload方法
    created() {
        //自动加载方法
        this.loadModelList();
    },
    data() {
        return {
            modelData: [],
            searchInput: '',

            dialog: false,
            loading: false,
            form: {
                name: '',
                tableName: '',
                remark: '',
                sortNo: '',
                delivery: false,
                type: [],
            },
            formLabelWidth: '70px',
            timer: null,
        };
    },
}
</script>

<style lang="less" scoped>
.demo_model{
    overflow-y: unset;

}


.el-header {
    padding-left: 30px;
    padding-top: 10px;
    font-family: "Arial Black", "微软雅黑", serif;
    font-size: 20px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    //text-align: center;
    //height: 500px;
}


.el-row {
    margin-bottom: 5px;
}
.demo_model /deep/ .el-drawer__body {
    padding: 10px;
    flex: 1;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;;
    font-weight: 400;

}
//.demo-drawer__content {
//    padding: 20px;
//    flex: 1;
//
//}


.grid-content {
    border-radius: 4px;
    min-height: 30px;
}

.el-table {
    background: oldlace;
    font-family: "新宋体", serif;
    font-size: 16px;
}
//.el-drawer{
//    padding: 10px;
//}

</style>
