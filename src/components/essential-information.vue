<template>
  <div class="scene">
    <el-card shadow="hover">
        <div slot="header" class="clearfix">
            <span>项目相关</span>
            <el-button style="margin-left:20px" type="text" icon="el-icon-plus" @click="addScene">添加数据</el-button>
        </div>
        <el-form :model="form"  label-width="100px">
            <el-form-item label="项目编号" prop="name">
                <el-row :gutter="10">
                    <el-col :span= 4>
                        <el-form-item label="">
                            <el-input v-model="form.name" placeholder="请输入项目编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span = 4>
                        <el-form-item label="">
                            <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>      
            </el-form-item>
        </el-form>
        <div style="margin-top:20px">
            <el-tag v-for="(v, idx) in dimensionDisplay" 
                :key=idx 
                style="margin-right:20px" 
                @close="handleClose(idx)"
                closable>{{v.optionKey}} ---> {{v.optionValue}}
            </el-tag>
            <el-button v-if="dimensionDisplay.length > 0" type="primary" size="mini" icon="el-icon-edit" circle @click="editDimension"></el-button>
        </div>
    </el-card>

    <el-dialog title="添加数据" :visible.sync="dialogScene" width="620px" :close-on-click-modal=false :close-on-press-escape=false @close="clear">
      <el-form :model="addForm" :inline="true" :rules="addRules" ref="addForm" label-width="90px">
        <el-form-item v-for="(pa, paIdx) in addForm.currentDimensionOption" :key="paIdx" :label="'选项'+ (paIdx + 1)" :prop="'currentDimensionOption.' + paIdx + '.optionKey'" :rules="[{required: true, message: '请输入选项', trigger: 'blur'}]">
            <el-row :gutter="10">
                <el-col :span= 10>
                    <el-form-item label="" :prop="'currentDimensionOption.' + paIdx + '.optionKey'" :rules="[{required: true, message: '请输入选项', trigger: 'blur'}]">
                        <el-input v-model="pa.optionKey" placeholder="请输入选项key"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span = 10>
                    <el-form-item label="" :prop="'currentDimensionOption.' + paIdx + '.optionValue'" :rules="[{required: true, message: '请输入选项', trigger: 'blur'}]">
                        <el-input v-model="pa.optionValue" placeholder="请输入选项value"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span = 2>
                    <i class="el-icon-circle-plus" v-if="paIdx + 1 == 1" style="padding-left:20px" @click="addPayer"></i>
                    <i class="el-icon-remove" v-else style="padding-left:20px" @click="removePayer(paIdx)"></i>
                </el-col>
            </el-row>      
        </el-form-item>
      </el-form>
      <div style="text-align:center">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Scene',
  props: {
    msg: String
  },
  data() {
      return {
        dialogScene: false,
        addForm: {
            currentDimensionOption: [{optionKey: '',optionValue: ''}], // 当前维度对象对应option
        },
        form: {},
        addRules: {},
        dimensionDisplay: [],
    };
  },
  methods: {
    addScene() {
        this.dialogScene = true
    },
    addPayer() {
        this.addForm.currentDimensionOption.push({optionKey:'',optionValue:''});
    },
    removePayer(index) {
        this.addForm.currentDimensionOption.splice(index, 1);
    },
    cancel() {
        this.dialogScene = false;
    },
    handleClose(v) {
        this.dimensionDisplay.splice(v, 1);
    },
    submitForm() {
        this.$refs.addForm.validate((valid) => {
            if (valid) {
               this.dimensionDisplay = JSON.parse(JSON.stringify(this.addForm.currentDimensionOption))
               this.cancel();
            }
        });
    },
    clear() {
        this.$refs.addForm && this.$refs.addForm.resetFields();
        this.addForm = {currentDimensionOption: [{optionKey:'',optionValue:''}]}
    },
    editDimension() {
        this.addForm.currentDimensionOption = JSON.parse(JSON.stringify(this.dimensionDisplay))
        this.dialogScene = true
    },
  }
}
</script>

<style scoped lang="scss">

</style>
