<template>
  <div class="scene">
    <el-card shadow="hover">
        <div slot="header" class="clearfix">
            <span>动作信息</span>
            <el-button style="margin-left:20px" type="text" icon="el-icon-plus" @click="addScene">添加动作信息</el-button>
        </div>
        <el-button v-if="dimensionDisplay.actionGroup" type="text" size="mini" icon="el-icon-edit" @click="editDimension">编辑</el-button>
        <div v-for="(item, index) in dimensionDisplay.actionGroup" :key=index>
            <div style="margin-top:10px">
                <span style="font-size: 14px;">动作信息 {{index + 1}}</span>
            </div>
        </div>
    </el-card>

    <el-dialog title="动作信息" :visible.sync="dialogScene" width="100%" :close-on-click-modal=false :close-on-press-escape=false @open='open' @close="clear">
      <el-form :model="addForm" label-width="100px">
          <el-row :gutter="10">
            <el-col :span="6" v-for="item in initialData" :key="item.key">
              <el-form-item :label="item.name">
                <el-select v-model="addForm[item.key]" multiple collapse-tags  placeholder="请选择">
                  <el-option
                    v-for="m in item.option"
                    :key="m.key"
                    :label="m.name"
                    :value="m.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <el-button type="primary" plain icon="el-icon-plus" style="margin-left:30px" @click="actionList">生成动作项</el-button>
      <el-row :gutter="10" v-if="combination.length > 0" style="margin:20px 0 20px 30px">
            <el-checkbox-group v-model="checkedList">
                <el-col :span="6" v-for="(item, index) in combination" :key="index" style="margin-bottom:20px">
                    <el-checkbox :label="item">{{item.map( n => n.name).join('-')}}</el-checkbox>
                </el-col>
            </el-checkbox-group>
      </el-row>
      <el-row v-if="combination.length > 0" style="margin:0 0 20px 30px"><el-button type="primary" plain icon="el-icon-plus" @click="actionGroup">动作分组</el-button></el-row>
      <el-row v-if="finalActionGroup.length > 0" style="margin:0 0 20px 30px">
          <el-col :span="2" v-for="(item, index) in finalActionGroup" :key="index" style="margin-bottom:20px">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        动作信息{{index + 1}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                        <i style="padding-left: 20px;" class="el-icon-circle-close" @click="deleteActionGroup(index)"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(value, index) in item.details" :key="index">{{value.map( n => n.name).join('-')}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
          </el-col>
      </el-row>

      <div style="text-align:center">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { permutationCombination } from '@/utils/common'
export default {
  name: 'Scene',
  data() {
      return {
        dialogScene: false,
        addForm: {},
        initialData: [],
        dimensionDisplay: {},
        combination: [], // 获取所有动作的排列组合项
        checkedList: [], // 当前选择的动作分组
        finalActionGroup: [], // 动作分组集合 
    };
  },
  props: {
    value: Object
  },
  mounted() {
    this.initialData = [{
        "key": "decoration",
        "name": "配饰/装饰",
        "option": [
            {
                "key": "none——a",
                "name": "无配饰 "
            },
            {
                "key": "none_none",
                "name": "无表情无配饰"
            },
            {
                "key": "glasses",
                "name": "透明眼镜 "
            },
            {
                "key": "sunglasses",
                "name": "墨镜/非透明眼镜 "
            },
            {
                "key": "hat",
                "name": "帽子 "
            },
            {
                "key": "mask",
                "name": "口罩-遮挡鼻子/露出鼻子"
            },
            {
                "key": "scarf",
                "name": "围巾 "
            },
            {
                "key": "beard",
                "name": "胡子 "
            },
            {
                "key": "bangs",
                "name": "刘海 "
            },
            {
                "key": "wig",
                "name": "假发 "
            },
            {
                "key": "makeup",
                "name": "化妆 "
            },
            {
                "key": "headscarf",
                "name": "头巾 "
            },
            {
                "key": "headdress",
                "name": "头饰"
            },
            {
                "key": "transparent_umbrella",
                "name": "透明雨伞"
            },
            {
                "key": "opaque_umbrella",
                "name": "不透明雨伞"
            },
            {
                "key": "transparent_raincoat",
                "name": "透明雨衣"
            },
            {
                "key": "opaque_raincoat",
                "name": "不透明雨衣"
            },
            {
                "key": "else_decoration",
                "name": "其他装饰 "
            },
            {
                "key": "null",
                "name": "无"
            }
        ]
        },
        {
            "key": "colour",
            "name": "颜色",
            "option": [
                {
                    "key": "black",
                    "name": "黑色"
                },
                {
                    "key": "white",
                    "name": "白色"
                },
                {
                    "key": "gray",
                    "name": "灰色 "
                },
                {
                    "key": "red",
                    "name": "红色"
                },
                {
                    "key": "orange",
                    "name": "橙色"
                },
                {
                    "key": "yellow",
                    "name": "黄色"
                },
                {
                    "key": "green",
                    "name": "绿色"
                },
                {
                    "key": "blue",
                    "name": "蓝色"
                },
                {
                    "key": "purple",
                    "name": "紫色"
                },
                {
                    "key": "pink",
                    "name": "粉色"
                },
                {
                    "key": "brown",
                    "name": "棕色"
                },
                {
                    "key": "colorful",
                    "name": "花色"
                }
            ]
        },
        {
            "key": "face_pitch",
            "name": "人脸垂直角度",
            "option": [
                {
                    "key": "down_small",
                    "name": "低头小角度0-30° "
                },
                {
                    "key": "down_medium",
                    "name": "低头中角度30-60° "
                },
                {
                    "key": "down_large",
                    "name": "低头大角度60-90° "
                },
                {
                    "key": "down_super",
                    "name": "低头超大角度90°以上"
                },
                {
                    "key": "head_up",
                    "name": "平视0° "
                },
                {
                    "key": "up_small",
                    "name": "仰头小角度0-30° "
                },
                {
                    "key": "up_medium",
                    "name": "仰头中角度30-60° "
                },
                {
                    "key": "up_large",
                    "name": "仰头大角度60-90° "
                },
                {
                    "key": "up_super",
                    "name": "仰头超大角度90°以上"
                }
            ]
        },
        {
            "key": "face_yaw",
            "name": "人脸水平角度",
            "option": [
                {
                    "key": "small_yaw",
                    "name": "小角度0-30° "
                },
                {
                    "key": "medium_yaw",
                    "name": "中角度30-60° "
                },
                {
                    "key": "large_yaw",
                    "name": "大角度60-90° "
                },
                {
                    "key": "super_yaw",
                    "name": "超大角度90°以上"
                }
            ]
        },
        {
            "key": "face_size",
            "name": "人脸大小",
            "option": [
                {
                    "key": "small_face",
                    "name": "小 20-40px "
                },
                {
                    "key": "medium_face",
                    "name": "中40-200px "
                },
                {
                    "key": "large_face",
                    "name": "大200-400px "
                }
            ]
        },
        {
            "key": "person_size",
            "name": "人体大小",
            "option": [
                {
                    "key": "small_person",
                    "name": "小 60-100px "
                },
                {
                    "key": "medium_person",
                    "name": "中100-200px "
                },
                {
                    "key": "large_person",
                    "name": "大200-1500px "
                }
            ]
        },
        {
            "key": "face_blur",
            "name": "人脸模糊度",
            "option": [
                {
                    "key": "large_clear",
                    "name": "非常清晰0-0.2 "
                },
                {
                    "key": "small_clear",
                    "name": "基本清晰0.2-0.4 "
                },
                {
                    "key": "secondary",
                    "name": "一般清晰0.4-0.7"
                },
                {
                    "key": "small_blur",
                    "name": "模糊 0.7-0.9 "
                },
                {
                    "key": "large_blur",
                    "name": "非常模糊0.9以上 "
                }
            ]
        },
        {
            "key": "distance",
            "name": "距离",
            "option": [
                {
                    "key": "20",
                    "name": "20cm"
                },
                {
                    "key": "30",
                    "name": "30cm "
                },
                {
                    "key": "40",
                    "name": "40cm"
                },
                {
                    "key": "45",
                    "name": "45cm"
                },
                {
                    "key": "50",
                    "name": "50cm"
                },
                {
                    "key": "60",
                    "name": "60cm"
                },
                {
                    "key": "80",
                    "name": "80cm"
                },
                {
                    "key": "100",
                    "name": "1m"
                },
                {
                    "key": "100_200",
                    "name": "1-2m"
                },
                {
                    "key": "200_300",
                    "name": "2-3m"
                },
                {
                    "key": "300_400",
                    "name": "3-4m"
                },
                {
                    "key": "400_500",
                    "name": "4-5m"
                },
                {
                    "key": "distance_1",
                    "name": "距离1"
                },
                {
                    "key": "distance_2",
                    "name": "距离2"
                },
                {
                    "key": "none",
                    "name": "无"
                }
            ]
        },
        {
            "key": "expression",
            "name": "表情",
            "option": [
                {
                    "key": "none_a",
                    "name": "无表情/中性 "
                },
                {
                    "key": "disgust",
                    "name": "厌恶 "
                },
                {
                    "key": "happy",
                    "name": "高兴 "
                },
                {
                    "key": "sad",
                    "name": "伤心 "
                },
                {
                    "key": "scared",
                    "name": "害怕 "
                },
                {
                    "key": "surprised",
                    "name": "惊讶 "
                },
                {
                    "key": "angry",
                    "name": "生气 "
                },
                {
                    "key": "confused",
                    "name": "困惑 "
                },
                {
                    "key": "none",
                    "name": "无"
                }
            ]
        },
        {
            "key": "movement",
            "name": "动作",
            "option": [
                {
                    "key": "squint",
                    "name": "眯眼 "
                },
                {
                    "key": "close_eyes",
                    "name": "闭眼 "
                },
                {
                    "key": "stare",
                    "name": "瞪眼 "
                },
                {
                    "key": "pout",
                    "name": "捂嘴 "
                },
                {
                    "key": "squat",
                    "name": "蹲下"
                },
                {
                    "key": "stand",
                    "name": "站立"
                },
                {
                    "key": "bend",
                    "name": "弯腰"
                },
                {
                    "key": "sit",
                    "name": "坐下"
                },
                {
                    "key": "watch_phone",
                    "name": "看手机"
                },
                {
                    "key": "call",
                    "name": "打电话"
                },
                {
                    "key": "smoke",
                    "name": "抽烟"
                },
                {
                    "key": "smile",
                    "name": "微笑 "
                },
                {
                    "key": "pain",
                    "name": "痛苦 "
                },
                {
                    "key": "supline",
                    "name": "仰卧"
                },
                {
                    "key": "side_lie",
                    "name": "侧卧"
                },
                {
                    "key": "cheek_support",
                    "name": "托腮"
                },
                {
                    "key": "chin_support",
                    "name": "托下巴"
                },
                {
                    "key": "frown",
                    "name": "皱眉"
                },
                {
                    "key": "mouth_open",
                    "name": "张嘴 "
                },
                {
                    "key": "nausea",
                    "name": "恶心 "
                },
                {
                    "key": "cry",
                    "name": "哭泣 "
                },
                {
                    "key": "laugh",
                    "name": "大笑 "
                },
                {
                    "key": "side_phone",
                    "name": "侧头夹手机"
                },
                {
                    "key": "normal_watch",
                    "name": "正常注视"
                },
                {
                    "key": "turn_horizontal",
                    "name": "水平内左右转头"
                },
                {
                    "key": "low_head",
                    "name": "低抬头"
                },
                {
                    "key": "else",
                    "name": "其他"
                },
                {
                    "key": "random",
                    "name": "任意动作 "
                },
                {
                    "key": "move_volume",
                    "name": "移动音量/进度调节"
                },
                {
                    "key": "return_stop",
                    "name": "返回/终止"
                },
                {
                    "key": "determine_pause",
                    "name": "确定/暂停"
                },
                {
                    "key": "reserved_gesture",
                    "name": "预留手势"
                },
                {
                    "key": "silent_operation",
                    "name": "静音操作/终止"
                },
                {
                    "key": "photograph",
                    "name": "拍照"
                },
                {
                    "key": "thumb_up",
                    "name": "点赞"
                },
                {
                    "key": "ok",
                    "name": "ok"
                },
                {
                    "key": "lying_desk",
                    "name": "趴桌子"
                },
                {
                    "key": "eat",
                    "name": "吃东西"
                },
                {
                    "key": "drink_water",
                    "name": "喝水"
                },
                {
                    "key": "fight",
                    "name": "打架"
                },
                {
                    "key": "play_phone",
                    "name": "玩手机"
                },
                {
                    "key": "null",
                    "name": "无"
                }
            ]
        },
        {
            "key": "density",
            "name": "人员密度",
            "option": [
                {
                    "key": "high",
                    "name": "高密（20人+）"
                },
                {
                    "key": "medium",
                    "name": "中密 （5-20人）"
                },
                {
                    "key": "low",
                    "name": "低密 （1-5人）"
                },
                {
                    "key": "none",
                    "name": "无人（0人）"
                },
                {
                    "key": "none_none",
                    "name": "无"
                }
            ]
        },
        {
            "key": "speed",
            "name": "速度",
            "option": [
                {
                    "key": "slow",
                    "name": "慢走2.5秒/步"
                },
                {
                    "key": "fast",
                    "name": "快走1.5秒/步"
                }
            ]
        },
        {
            "key": "walk_direction",
            "name": "动态流向",
            "option": [
                {
                    "key": "come",
                    "name": "来向"
                },
                {
                    "key": "go",
                    "name": "去向"
                },
                {
                    "key": "come_go",
                    "name": "双向"
                },
                {
                    "key": "side",
                    "name": "侧向"
                },
                {
                    "key": "cross",
                    "name": "十字交叉"
                },
                {
                    "key": "scattered",
                    "name": "散乱"
                }
            ]
        },
        {
            "key": "face_location",
            "name": "人脸位置",
            "option": [
                {
                    "key": "center",
                    "name": "中部"
                },
                {
                    "key": "left",
                    "name": "左侧"
                },
                {
                    "key": "right",
                    "name": "右侧"
                },
                {
                    "key": "up",
                    "name": "上侧"
                },
                {
                    "key": "down",
                    "name": "下侧"
                },
                {
                    "key": "left_up",
                    "name": "左上"
                },
                {
                    "key": "left_down",
                    "name": "左下"
                },
                {
                    "key": "right_up",
                    "name": "右上"
                },
                {
                    "key": "right_down",
                    "name": "右下"
                }
            ]
        },
        {
            "key": "face_occlusion",
            "name": "人脸遮挡",
            "option": [
                {
                    "key": "none",
                    "name": "无遮挡 "
                },
                {
                    "key": "eye",
                    "name": "单眼 "
                },
                {
                    "key": "eyes",
                    "name": "双眼 "
                },
                {
                    "key": "nose",
                    "name": "鼻子 "
                },
                {
                    "key": "mouth",
                    "name": "嘴 "
                },
                {
                    "key": "chin",
                    "name": "下巴 "
                }
            ]
        }
    ]
  },
  methods: {
    open() {},
    actionList() { this.getCombination();},
    getCombination() {
        const selectData = Object.entries(this.addForm).filter(x => x[1].length > 0)
        const arrList = [];
        selectData.forEach( x => {
            let arr = [];
            x[1].forEach( m => {
                this.initialData.forEach( n => {
                    if (x[0] === n.key) {
                        arr.push(Object.assign(n.option.find( v => v.key === m),{parent: x[0]}))
                    }
                })
            })
            arrList.push(arr)
        })
        this.combination = permutationCombination(arrList); // 获取所有动作的排列组合项
    },
    actionGroup() {
        if (this.checkedList.length > 0) {
            this.finalActionGroup.push({id:new Date().getTime(),details:this.checkedList})
            this.checkedList = []
        }
    },
    deleteActionGroup(index) {
        this.finalActionGroup.splice(index, 1);
    },
    addScene() {
        this.dialogScene = true;
        this.initialData.forEach(v => { this.$set(this.addForm, v.key, []);}); 
    },
    cancel() {
        this.dialogScene = false;
    },
    submitForm() {
        if(!this.finalActionGroup.length) { this.$message.warning('请配置动作分组！'); return; }
        this.dimensionDisplay = Object.assign({},{action:JSON.parse(JSON.stringify(this.addForm))},{actionGroup:this.finalActionGroup})
        this.cancel();
        this.$emit('input', this.dimensionDisplay);
    },
    clear() {
        this.addForm = {}
        this.combination = []
        this.checkedList = []
        this.finalActionGroup = []
    },
    editDimension() {
        this.dialogScene = true
        this.addForm = Object.assign({}, this.dimensionDisplay.action)
        this.getCombination()
        this.finalActionGroup = this.dimensionDisplay.actionGroup
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
