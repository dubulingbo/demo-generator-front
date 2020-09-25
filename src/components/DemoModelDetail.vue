<template>
    <div class="demo_model_detail">
        <el-container>
            <el-page-header @back="" content="模型明细信息面板"></el-page-header>

            <el-header>
                <el-row>
                    <el-col :span="8">
                        <el-card shadow="never" class="box-card el_card_left">
                            <div slot="header" class="clearfix">
                                <span style="font-size: 20px;">模型摘要信息</span>
                            </div>
                            <div class="mode_info_panel">
                                <div>
                                    <label>模型名</label>
                                </div>
                                {{ modelInfo.modelName }}
                            </div>
                            <div class="mode_info_panel">
                                <div>
                                    <label class="clearfix">包 名</label>
                                </div>
                                {{ modelInfo.packageDir }}
                            </div>
                            <div class="mode_info_panel">
                                <div>
                                    <label>表 名</label>
                                </div>
                                {{ modelInfo.tableName }}
                            </div>
                            <div class="mode_info_panel">
                                <div>
                                    <label>创建人</label>
                                </div>
                                {{ modelInfo.createUser }}
                            </div>
                            <div class="mode_info_panel">
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
                <div class="raw_code_panel">
                    <el-button-group class="model_download_btn">
                        <el-button icon="el-icon-refresh" @click="loadCode">加载/刷新</el-button>
                        <el-button icon="el-icon-download" @click="downloadCode01">下载源码</el-button>
                    </el-button-group>
                    <el-tabs tab-position="right">
                        <el-tab-pane label="表结构"><pre>{{ demo.tableStructure }}</pre></el-tab-pane>
                        <el-tab-pane label="实体类"><pre>{{ demo.entity }}</pre></el-tab-pane>
                        <el-tab-pane label="Mapper Interface层"><pre>{{ demo.mapperInter }}</pre></el-tab-pane>
                        <el-tab-pane label="Mapper Xml层"><pre>{{ demo.mapperXml }}</pre></el-tab-pane>
                        <el-tab-pane label="Service层"><pre>{{ demo.service }}</pre></el-tab-pane>
                        <el-tab-pane label="Controller层"><pre>{{ demo.controller }}</pre></el-tab-pane>
                    </el-tabs>
                </div>
            </el-main>
        </el-container>
    </div>
</template>


<script>
import JSZip from "jszip";
import {saveAs} from 'file-saver'

export default {
    methods: {
        // 加载代码
        loadCode(){
            if(this.modelInfoId === null || this.modelInfoId === ''){
                this.$message.warning("模型为空，请刷新后重试");
                return;
            }
            this.$axios.get("/api/code/load/" + this.modelInfoId, {timeout: 3000,}).then(response => {
                console.log(response);
                if (response.status === 200 && response.data.code === '200') {
                    if(response.data.data !== null && response.data.data.optCode === '1') {
                        console.log(response.data.data);
                        this.demo.tableStructure = response.data.data.tableStructureDemo;
                        this.demo.entity = response.data.data.entityDemo;
                        this.demo.mapperInter = response.data.data.mapperInterfaceDemo;
                        this.demo.mapperXml = response.data.data.mapperXmlDemo;
                        this.demo.service = response.data.data.serviceDemo;
                        this.demo.controller = response.data.data.controllerDemo;
                    } else {
                        this.$message.error("业务处理错误：" + response.data.data.message);
                    }
                } else {
                    this.$message.error("通讯错误：" + response.data.msg);
                }
            }).catch(error => {
                this.$message.error("Server error：" + error.message);
            });
        },

        // 点击下载源码的按钮
        downloadCode01() {
            if (this.modelInfoId === null || this.modelInfoId === '') {
                this.$message.warning("模型为空，请刷新后重试");
                return;
            }

            if(this.demo.tableStructure === '' || this.demo.entity === ''
                || this.demo.mapperInter === '' || this.demo.controller === ''
                || this.demo.mapperXml === '' || this.demo.service === ''){
                this.$message.warning("请先加载源码后再下载");
            }


            // 前端显示开始下载，弹框显示loading
            const loading = this.$loading({
                lock: true,
                text: '正在下载 ',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            // 请求后端，第二种方法：浏览器中不会出现新建标签页，但是需要手动获取下载的文件名
            const config = {
                responseType: 'blob',
                timeout: 3000,
            };
            let data = {
                modelId: this.modelInfoId,
                tableDemo: this.demo.tableStructure,
                entityDemo: this.demo.entity,
                mapperInterDemo: this.demo.mapperInter,
                mapperXmlDemo: this.demo.mapperXml,
                serviceDemo: this.demo.service,
                controllerDemo: this.demo.controller,
            }
            this.$axios.post('/api/code/download', data, config).then(resp => {
                console.log(resp)
                // 如果未获取到文件名，则使用指定的文件全名
                let contentDisposition = resp.headers['content-disposition'];
                let fileName = "源码.zip";
                if (contentDisposition) {
                    console.log(contentDisposition);
                    fileName = window.decodeURI(contentDisposition.split('=')[1]);
                    console.log('获取到的文件名 = ' + fileName)
                }

                // 获取文件里的内容
                let content = new Blob([resp.data], {type: 'application/octet-stream'});
                if (window.navigator.msSaveOrOpenBlob) { //支持IE
                    navigator.msSaveBlob(content, fileName);
                } else {
                    let link = document.createElement('a');
                    link.style.display = "none";
                    link.href = window.URL.createObjectURL(content);
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    //释放内存
                    window.URL.revokeObjectURL(link.href);
                    document.body.removeChild(link);
                }
            }).catch(error => {
                console.log(error.message);
                this.$message.error("Server error: " + error.message);
            }).finally(() =>{
                loading.close();
            });
        },
        // 下载代码区的源码
        downloadCode(){
            // 获取页面上的包路径
            if( this.modelInfo === null){
                this.$message.warning("页面信息缺失，请刷新");
                return;
            }
            console.log(this.modelInfo);

            if(this.demo.tableStructure === '' || this.demo.entity === ''
                || this.demo.mapperInter === ''
                || this.demo.mapperXml === '' || this.demo.service === ''){
                this.$message.warning("请先加载源码后再下载");
            }
            // 前端显示开始下载，弹框显示loading
            const loading = this.$loading({
                lock: true,
                text: '正在下载 ',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            setTimeout(() => {
                // 创建压缩文件对象
                let reg=new RegExp('[.]','g')//g代表全部
                let path= this.modelInfo.modelName +"_model/" + this.modelInfo.packageDir2.replace(reg,'/');
                console.log(path);

                let ziper = new JSZip();
                ziper.folder(path);
                ziper.folder(path + "/model").file(this.modelInfo.modelName + ".java", this.demo.entity);
                ziper.folder(path + "/model").file( this.modelInfo.modelName + ".sql", this.demo.tableStructure);
                ziper.folder(path + "/mapper").file(this.modelInfo.modelName + "Mapper.java", this.demo.mapperInter);
                ziper.folder(path + "/mapper").file(this.modelInfo.modelName + "Mapper.xml", this.demo.mapperXml);
                let service = this.modelInfo.modelName.substring(1,2).toUpperCase() + this.modelInfo.modelName.substring(2);
                ziper.folder(path + "/service").file(service + "Service.java", this.demo.service);
                ziper.folder(path + "/controller").file(service + "Controller.java", this.demo.controller);

                ziper.generateAsync({type: 'blob'}).then(fruit => {
                    saveAs(fruit, `源码.zip`);
                }).catch(err => {
                    this.$message.error(err.message);
                }).finally(() =>{
                    loading.close();
                });
            }, 1000);


        },
        // compressFiles(ziper,zipName) {
        //
        //     zip.file('ca.crt', '字符串内容')
        //     zip.file(`${zipName}.txt`, 'this is a string!\n')
        //     zip.file(`${zipName}.doc`, 'please test!')
        //     zip.file('config.ovpn', 'hhhhhhhh')
        //     zip.generateAsync({type: 'blob'}).then(fruit => {
        //         saveAs(fruit, `${zipName}.zip`)
        //     })
        // },

        // 加载属性类型数据
        loadProTypeList() {
            // 没有值时才去后端加载
            if (this.proTypeList === null || this.proTypeList.length === 0) {
                // 请求后端
                this.$axios.get("/api/basic/property/type/s", {timeout: 1000,}).then(response => {
                    if (response.status === 200 && response.data.code === '200' && response.data.data !== null
                        && response.data.data.optCode === '1') {
                        console.log(response.data.data);
                        if (response.data.data.propertyTypeList !== null) {
                            this.proTypeList = response.data.data.propertyTypeList;
                        } else {
                            console.log("The data of list is empty!");
                        }
                    } else {
                        this.$message.error("The data of list load failed!");
                    }
                }).catch(error => {
                    this.$message.error("Server error：" + error.message);
                });
            } else {
                console.log("Start load local property type data!");
            }
        },

        // 加载字段类型数据
        loadColTypeList() {
            if (this.colTypeList === null || this.colTypeList.length === 0) {
                this.$axios.get("/api/basic/property/type/colTypes", {timeout: 1000,}).then(response => {
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
            } else {
                console.log("========= start load local column type data !");
            }
        },

        // 加载模型明细列表数据
        async loadModelDetailList() {
            await this.$axios.get("/api/basic/model/detail/list", {
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
        async editBtnClick(row, formName) {
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
                    this.$axios.put('/api/basic/model/detail/' + this.modelDetailForm.id, {}, {
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
                            this.isAdd = true;
                        }, 100);
                    });

                }
            });

        },
        // 取消编辑
        cancelEdit(formName) {
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
                this.$axios.delete("/api/basic/model/detail/" + row.id, {timeout: 1000,}).then(response => {
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
                        } else {
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
                    this.$axios.post('/api/basic/model/detail', this.modelDetailForm, {timeout: 1000,}).then(response => {
                        if (response.status === 200 && response.data.code === '200' && response.data.data !== null) {
                            console.log(response.data.data);
                            if (response.data.data.optCode === '1' && response.data.data.modelDetail !== null) {
                                // 刷新列表
                                this.loadModelDetailList();
                                // 重置输入框
                                this.resetModelDetailForm(formName);
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
        this.$axios.get("/api/basic/model/" + this.modelInfoId, {timeout: 1000,}).then(response => {
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
        if (this.modelInfo !== null) {
            this.loadModelDetailList();
            this.loadProTypeList();
            this.loadColTypeList();
        } else {
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
            loading: false,
            proTypeList: [],
            colTypeList: [],
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

            // 代码面板的数据
            demo: {
                tableStructure: '',
                entity: '',
                mapperInter: '',
                mapperXml: '',
                service: '',
                controller: '',
            },
        };
    },
}
</script>


<style lang="less" scoped>
.demo_model {
    overflow-y: hidden;
}

/** 页面头部样式 **/
.el-page-header {
    line-height: 40px;
    background-color: #8CC5FF;
}
/***********************************************/

/** 容器布局样式 **/
.el-container {
    width: 80%;
    height: 100%;
    margin: 0 auto;
}

.el-header {
    padding: 0;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-weight: 400;
    //height: 200px;
    flex: 1;
}

.el-main {
    background-color: #E9EEF3;
    padding: 2px;
    padding-bottom: 20px;
}
/***********************************************/

/** 列表样式 **/
.el-table {
    background: oldlace;
    font-size: 16px;
}
/***********************************************/

/** 卡片区样式 **/
.el-card {
    border: none;
}

// 模型信息显示面板样式
.el_card_left {
    padding-right: 10px;
}
.mode_info_panel {
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
// 添加或修改模型属性 的面板样式
.el_card_right {
    margin-left: 10px;
    border-left: 1px solid #C6E2FF;
}
.form_title {
    font-size: 20px;
    margin-bottom: 20px;
}
/***********************************************/

/** 源代码面板区样式 **/
.raw_code_panel {
    margin-top: 20px;
    background: ghostwhite;

    .model_download_btn {
        margin-left: 20px;
        margin-bottom: 0;
    }

    .el-tabs {
        min-height: 200px;
        padding: 10px;
        border-top: 1px solid #EBEEF5;
    }

    .el-tabs /deep/ .el-tab-pane {
        font-size: 16px;
    }
}
/***********************************************/
</style>
