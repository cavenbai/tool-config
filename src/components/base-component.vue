<template>
  <div class="scene">
    <el-card shadow="hover">
        <div slot="header" class="clearfix">
            <span>基本信息</span>
            <el-button style="margin-left:20px" type="text" icon="el-icon-plus" @click="addScene">添加基本信息</el-button>
        </div>
        <div v-for="(item, index) in dimensionDisplay" :key=index>
            <div style="margin-top:10px">
                <span style="font-size: 14px;">基本信息 {{index + 1}}</span>
                <el-button type="text" style="margin-left:40px" size="mini" icon="el-icon-edit" @click="editDimension(item)">编辑</el-button>
                <el-button type="text" size="mini" icon="el-icon-delete" @click="deleteDimension(index)">删除</el-button>
            </div>
        </div>
    </el-card>

    <el-dialog title="添加基本信息" :visible.sync="dialogScene" width="1000px" :close-on-click-modal=false :close-on-press-escape=false @open='open' @close="clear">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-row :gutter="20">
            <el-checkbox-group v-model="checkedCities.info_list" @change="handleCheckedCitiesChange">
                <el-col :span="8" v-for="item in initialData" :key="item.key" style="margin-bottom:20px">
                    <el-checkbox :label="item">
                        {{item.name}}
                        <span v-if="requirementList.length > 0">（是否必填：<el-switch v-model="requirementList.find( x => x.key === item.key).required" active-color="#13ce66" inactive-color="#ff4949"></el-switch>）</span> 
                    </el-checkbox>
                    <el-popover
                        v-if="item.option.length > 0"
                        placement="top-start"
                        width="200"
                        trigger="hover">
                        <div style="display:flex;flex-wrap: wrap;justify-content: start;">
                            <el-tag style="margin-bottom:10px; margin-left:10px" type="info" v-for="(v,index) in item.option" :key='index'>{{v.name}}</el-tag>
                        </div>
                        <el-button type="text" size="mini" slot="reference" style="padding:0 15px">详情</el-button>
                    </el-popover>
                </el-col>
            </el-checkbox-group>
        </el-row>
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
        initialData: [],
        dimensionDisplay: [],
        isIndeterminate: false,
        checkedCities: {info_list: []},
        checkAll: false,
        requirementList: []
    };
  },
  props: {
    value: Array
  },
  mounted() {
    this.initialData = [{
            "key": "number_id",
            "name": "号码牌",
            "mold": "input",
            "option": [],
            "required": true
            },
            {
                "key": "name",
                "name": "姓名",
                "mold": "input",
                "option": [],
                "required": true
            },
            {
                "key": "gender",
                "name": "性别",
                "mold": "radio",
                "option": [
                    {
                        "key": "male",
                        "name": "男"
                    },
                    {
                        "key": "female",
                        "name": "女"
                    }
                ],
                "required": true
            },
            {
                "key": "age",
                "name": "年龄",
                "mold": "radio",
                "option": [],
                "required": true
            },
            {
                "key": "age_group",
                "name": "年龄段",
                "mold": "radio",
                "option": [
                    {
                        "key": "children",
                        "name": "儿童【0-6】"
                    },
                    {
                        "key": "early_youth",
                        "name": "少年【7-17】"
                    },
                    {
                        "key": "youth",
                        "name": "青年【18-40】"
                    },
                    {
                        "key": "middle_aged",
                        "name": "中年【41-65】"
                    }
                ],
                "required": true
            },
            {
                "key": "nationality",
                "name": "民族",
                "mold": "radio",
                "option": [
                    {
                        "key": "han",
                        "name": "汉族"
                    },
                    {
                        "key": "else",
                        "name": "其他"
                    }
                ],
                "required": true
            },
            {
                "key": "relationship",
                "name": "亲属关系",
                "mold": "radio_input",
                "option": [
                    {
                        "key": "none",
                        "name": "无"
                    },
                    {
                        "key": "twins",
                        "name": "双胞胎"
                    },
                    {
                        "key": "relatives",
                        "name": "亲属"
                    },
                    {
                        "key": "other",
                        "name": "其他"
                    }
                ],
                "required": true
            },
            {
                "key": "id_card",
                "name": "ID 照",
                "mold": "input",
                "option": [],
                "required": true
            },
            {
                "key": "card_type",
                "name": "ID照类型",
                "mold": "radio",
                "option": [
                    {
                        "key": "original",
                        "name": "高清原始图"
                    },
                    {
                        "key": "card_reader",
                        "name": "读卡器小图"
                    },
                    {
                        "key": "textured_removed",
                        "name": "去网纹图"
                    },
                    {
                        "key": "flop",
                        "name": "翻拍图"
                    }
                ],
                "required": true
            },
            {
                "key": "idnum",
                "name": "ID信息",
                "mold": "input",
                "option": [],
                "required": true
            },
            {
                "key": "issue_date",
                "name": "签发日期",
                "mold": "date",
                "option": [],
                "required": true
            },
            {
                "key": "race",
                "name": "人种",
                "mold": "radio",
                "option": [
                    {
                        "key": "chinese",
                        "name": "中国人 "
                    },
                    {
                        "key": "east_asian",
                        "name": "东亚人 "
                    },
                    {
                        "key": "middle_asian",
                        "name": "中亚人"
                    },
                    {
                        "key": "southeast_asian",
                        "name": "东南亚人 "
                    },
                    {
                        "key": "indian",
                        "name": "印度人 "
                    },
                    {
                        "key": "middle_eastern",
                        "name": "中东人 "
                    },
                    {
                        "key": "oceanian",
                        "name": "大洋洲人 "
                    },
                    {
                        "key": "european",
                        "name": "欧洲人 "
                    },
                    {
                        "key": "north_american",
                        "name": "北美人 "
                    },
                    {
                        "key": "south_american",
                        "name": "南美人 "
                    },
                    {
                        "key": "african",
                        "name": "非洲人 "
                    },
                    {
                        "key": "south_african",
                        "name": "南非人 "
                    },
                    {
                        "key": "white_people",
                        "name": "白种人 "
                    },
                    {
                        "key": "black_people",
                        "name": "黑种人 "
                    },
                    {
                        "key": "yellow_people",
                        "name": "黄种人 "
                    },
                    {
                        "key": "foreigners",
                        "name": "外国人"
                    }
                ],
                "required": true
            },
            {
                "key": "lifephoto_date",
                "name": "生活照时间",
                "mold": "radio",
                "option": [
                    {
                        "key": "within_3years",
                        "name": "三年内"
                    },
                    {
                        "key": "3years_ago",
                        "name": "三年前"
                    }
                ],
                "required": true
            },
            {
                "key": "remarks",
                "name": "备注",
                "mold": "input",
                "option": [],
                "required": true
            },
            {
                "key": "birthday",
                "name": "出生日期",
                "mold": "date",
                "option": [],
                "required": true
            },
            {
                "key": "certificate_date",
                "name": "证件照时间",
                "mold": "radio",
                "option": [
                    {
                        "key": "within_3years",
                        "name": "三年内"
                    },
                    {
                        "key": "3years_ago",
                        "name": "三年前"
                    }
                ],
                "required": true
            },
            {
                "key": "student_type",
                "name": "学生类别",
                "mold": "radio",
                "option": [
                    {
                        "key": "kindergarten",
                        "name": "幼儿园【3-6】"
                    },
                    {
                        "key": "primary_school",
                        "name": "小学生【7-12】"
                    },
                    {
                        "key": "middle_school",
                        "name": "初中生【13-15】"
                    },
                    {
                        "key": "high_school",
                        "name": "高中生【16-18】"
                    }
                ],
                "required": true
            },
            {
                "key": "shoot_mode",
                "name": "拍摄方式",
                "mold": "radio",
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
                "required": true
            },
            {
                "key": "season",
                "name": "季节",
                "mold": "radio",
                "option": [
                    {
                        "key": "spring",
                        "name": "春天 "
                    },
                    {
                        "key": "summer",
                        "name": "夏天 "
                    },
                    {
                        "key": "autumn",
                        "name": "秋天 "
                    },
                    {
                        "key": "winter",
                        "name": "冬天 "
                    }
                ],
                "required": true
            },
            {
                "key": "light_type",
                "name": "光线类型",
                "mold": "radio",
                "option": [
                    {
                        "key": "naturallight",
                        "name": "自然光"
                    },
                    {
                        "key": "fill_inlight",
                        "name": "补光灯"
                    },
                    {
                        "key": "lighting",
                        "name": "补灯光"
                    },
                    {
                        "key": "lighting_yellow",
                        "name": "补黄光"
                    },
                    {
                        "key": "lighting_white",
                        "name": "补白光"
                    },
                    {
                        "key": "filllight_screen",
                        "name": "屏幕补光"
                    },
                    {
                        "key": "nolight",
                        "name": "无光"
                    }
                ],
                "required": true
            },
            {
                "key": "weather",
                "name": "天气",
                "mold": "radio",
                "option": [
                    {
                        "key": "sunny",
                        "name": "晴天 "
                    },
                    {
                        "key": "cloudy",
                        "name": "阴天 "
                    },
                    {
                        "key": "rainy",
                        "name": "下雨 "
                    },
                    {
                        "key": "snowy",
                        "name": "雪天 "
                    },
                    {
                        "key": "frog",
                        "name": "雾霾 "
                    }
                ],
                "required": true
            },
            {
                "key": "time_slot",
                "name": "时间段",
                "option": [
                    {
                        "key": "day",
                        "name": "白天 "
                    },
                    {
                        "key": "night",
                        "name": "黑夜 "
                    }
                ],
                "required": true
            }
        ]
  },
  methods: {
    open() {},
    addScene() {
        // 新增基本时初始化requirementList（全为true）
        JSON.parse(JSON.stringify(this.initialData)).forEach( x => {
            this.requirementList.push({key: x.key, required: x.required})
        })
        this.dialogScene = true
    },
    cancel() {
        this.dialogScene = false;
    },
    handleCheckAllChange(val) {
        this.checkedCities.info_list = val ? this.initialData : [];
        this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.initialData.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.initialData.length;
    },
    submitForm() {
        if (this.checkedCities.info_list.length === 0) { this.$message.warning("请添加基本信息！"); return; }
        if (this.checkedCities.id) {
            this.dimensionDisplay = this.dimensionDisplay.map( x => x.id === this.checkedCities.id ? Object.assign({}, {id: this.checkedCities.id,info_list: this.checkedCities.info_list,requirementList: this.requirementList}) : x)
            this.cancel();
            this.$emit('input', this.dimensionDisplay);
        } else {
            this.dimensionDisplay.push(Object.assign({}, {id:new Date().getTime(),info_list: this.checkedCities.info_list,requirementList: this.requirementList}))
            this.cancel();
            this.$emit('input', this.dimensionDisplay);
        }
    },
    clear() {
       this.checkedCities = { info_list: [] };
       this.requirementList = [];
    //    this.checkAll = false;
    //    this.isIndeterminate = false;
    },
    editDimension(item) {
        this.dialogScene = true;
        this.checkedCities = Object.assign({}, {id: item.id, info_list: item.info_list})
        this.requirementList = item.requirementList;
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
