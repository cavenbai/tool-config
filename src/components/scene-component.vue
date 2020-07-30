<template>
  <div class="scene">
    <el-card shadow="hover">
        <div slot="header" class="clearfix">
            <span>采集方式</span>
            <el-button style="margin-left:20px" type="text" icon="el-icon-plus" @click="addScene">添加采集方式</el-button>
        </div>
        <div v-for="(item, index) in dimensionDisplay" :key=index>
            <div style="margin-top:10px">
                <span style="font-size: 14px;">采集方式 {{index + 1}}</span>
                <el-button type="text" style="margin-left:40px" size="mini" icon="el-icon-edit" @click="editDimension(item)">编辑</el-button>
                <el-button type="text" size="mini" icon="el-icon-delete" @click="deleteDimension(index)">删除</el-button>
            </div>
        </div>
    </el-card>

    <el-dialog title="添加采集方式" :visible.sync="dialogScene" width="800px" :close-on-click-modal=false :close-on-press-escape=false @open='open' @close="clear">
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="110px">
        <el-row :gutter="20">
          <el-col v-for="(item,index) in initialData" :key="index" :span="12">
            <el-form-item :label="item.name + ':'" :prop="item.key">
              <el-input v-if="item.type ==='input'"  v-model="addForm[item.key]" :placeholder="item.placeholder"></el-input>
              <el-select style="width:100%" :multiple="item.multiple" v-if="item.type ==='select'" v-model="addForm[item.key]" :placeholder="item.placeholder">
                <el-option v-for="k of item.option" :key="k.key" :label="k.name" :value="k.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
  data() {
      return {
        dialogScene: false,
        addForm: {},
        addRules: {},
        initialData: [],
        dimensionDisplay: [],
        model: {}
    };
  },
  props: {
    value: Array
  },
  mounted() {
    this.initialData = [
    {
        "key": "shoot_type",
        "name": "拍摄方式",
        "type": "select",
        "option": [
            {
                "key": "photo",
                "name": "拍照"
            },
            {
                "key": "video",
                "name": "录像"
            },
            {
                "key": "countdown_video",
                "name": "倒计时录像"
            }
        ],
        "default": "photo",
        "placeholder": "",
        "required": true
    },
    {
        "key": "duration",
        "name": "倒计时时长",
        "type": "input",
        "option": [],
        "default": 0,
        "placeholder": "shoot_type为2时需要，单位秒",
        "required": false
    },
    {
        "key": "save_mode",
        "name": "存储方式",
        "type": "select",
        "option": [
            {
                "key": "photo",
                "name": "图片"
            },
            {
                "key": "sequence_frame",
                "name": "图片序列"
            },
            {
                "key": "video",
                "name": "视频"
            }
        ],
        "default": "photo",
        "placeholder": "",
        "required": true
    },
    {
        "key": "data_mode",
        "name": "数据格式",
        "type": "select",
        "option": [
            {
                "key": "png",
                "name": "PNG"
            },
            {
                "key": "jpeg",
                "name": "JPEG"
            },
            {
                "key": "raw",
                "name": "RAW"
            },
            {
                "key": "yuv",
                "name": "YUV"
            }
        ],
        "default": "png",
        "placeholder": "",
        "required": true
    },
    {
        "key": "resolution_w",
        "name": "分辨率宽",
        "type": "input",
        "option": [],
        "default": 1080,
        "placeholder": "分辨率水平像素值",
        "required": true
    },
    {
        "key": "resolution_h",
        "name": "分辨率高",
        "type": "input",
        "option": [],
        "default": 1920,
        "placeholder": "分辨率垂直像素值",
        "required": true
    },
    {
        "key": "fps",
        "name": "期望帧率",
        "type": "input",
        "option": [],
        "default": 20,
        "placeholder": "",
        "required": false
    },
    {
        "key": "cameraid",
        "name": "摄像头选择",
        "type": "select",
        "option": [
            {
                "key": "front",
                "name": "前置"
            },
            {
                "key": "back",
                "name": "后置"
            }
        ],
        "default": 2,
        "placeholder": "",
        "required": true
    },
    {
        "key": "estimated_time",
        "name": "预计耗时",
        "type": "input",
        "option": [],
        "default": 0,
        "placeholder": "当前配置采集一个人的预计耗时",
        "required": false
    }
]
    this.initialData.forEach(v => {
        this.model[v.key] = v.default;
        this.$set(this.addForm, v.key, v.default);
        this.addRules[v.key] = [{ required: v.required, message: `请${v.type === "input" ? "输入" : "选择"}${v.name}` }]
    }); 
  },
  methods: {
    open() {  
      if (!this.addForm.id) {
        this.addForm = Object.assign({},this.model)
      }
    },
    addScene() {
        this.dialogScene = true
    },
    cancel() {
        this.dialogScene = false;
    },
    submitForm() {
        this.$refs.addForm.validate((valid) => {
            if (valid) {
                if (this.addForm.id) {
                    this.dimensionDisplay = this.dimensionDisplay.map( x => x.id === this.addForm.id ? Object.assign({}, this.addForm) : x)
                    this.cancel();
                    this.$emit('input', this.dimensionDisplay);
                } else {
                    this.addForm.id = new Date().getTime()
                    this.dimensionDisplay.push(Object.assign({}, this.addForm))
                    this.cancel();
                    this.$emit('input', this.dimensionDisplay);
                }
            }
        });
    },
    clear() {
        this.$refs.addForm.resetFields();
        this.addForm = {}
    },
    editDimension(item) {
        this.addForm =  Object.assign({}, item)
        this.dialogScene = true
    },
    deleteDimension(index) {
        this.dimensionDisplay.splice(index, 1);
    },
  }
}
</script>

<style scoped lang="scss">
    .scene{
        margin-top: 40px;
    }
</style>
