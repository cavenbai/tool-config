<template>
  <div class="scene-list-component">
    <el-card shadow="hover">
        <div slot="header" class="clearfix"><span>场景选项</span></div>
        <el-form :model="addForm" label-width="100px">
          <el-row :gutter="20">
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
        <div style="text-align:center"><el-button type="primary" @click="configuration">生成场景项</el-button></div>
        <el-card shadow="hover" style="margin-top:40px" v-if="configurationList.length > 0">
          <el-table :data="configurationList" border style="width: 100%" :header-cell-style="{'text-align':'center'}">
            <el-table-column label="场景项" prop="name" min-width="30%" align="center"></el-table-column>
            <el-table-column label="选择动作" min-width="40%">
              <template slot-scope='scope'>
                <div v-for="(item,index) in scope.row.action" :key='index'>
                  <el-radio-group v-model="item.radio">
                    <el-radio v-for="(n,idx) in item.radioList" :key='idx' :label="n.id">{{index === 0 ? '采集方式': (index === 1 ? '基本信息':'CV数据')}} {{idx + 1}}</el-radio>
                  </el-radio-group>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="30%" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
    </el-card>
  </div>
</template>

<script>
import { permutationCombination } from '@/utils/common'
export default {
  name: 'SceneListComponent',
  props: {
    list: Array
  },
  data() {
    return {
      addForm: {},
      configurationList: [],
      initialData: []
    }
  },
  mounted() {
    this.initialData = [{
            "key": "region",
            "name": "区域",
            "option": [
                {
                    "key": "city",
                    "name": "城市"
                },
                {
                    "key": "countryside",
                    "name": "农村"
                }
            ]
        },
        {
            "key": "place",
            "name": "场景",
            "option": [
                {
                    "key": "indoor",
                    "name": "室内 "
                },
                {
                    "key": "outdoor",
                    "name": "室外 "
                },
                {
                    "key": "darkroom",
                    "name": "暗室"
                }
            ]
        },
        {
            "key": "location_type",
            "name": "地点类型",
            "option": [
                {
                    "key": "security_checkpoint",
                    "name": "安检口 "
                },
                {
                    "key": "school",
                    "name": "学校"
                },
                {
                    "key": "station",
                    "name": "车站 "
                },
                {
                    "key": "subway",
                    "name": "地铁 "
                },
                {
                    "key": "shoppingmall",
                    "name": "商场 "
                },
                {
                    "key": "office_building",
                    "name": "办公楼 "
                },
                {
                    "key": "airport",
                    "name": "机场 "
                },
                {
                    "key": "lift",
                    "name": "电梯 "
                },
                {
                    "key": "crossroad",
                    "name": "十字路口 "
                },
                {
                    "key": "sidewalk",
                    "name": "人行道 "
                },
                {
                    "key": "overbridge",
                    "name": "天桥 "
                },
                {
                    "key": "town_road",
                    "name": "城镇道路 "
                },
                {
                    "key": "highway",
                    "name": "高速公路 "
                },
                {
                    "key": "square",
                    "name": "广场 "
                },
                {
                    "key": "community",
                    "name": "小区"
                },
                {
                    "key": "in_car",
                    "name": "车内 "
                },
                {
                    "key": "internet_bar",
                    "name": "网吧 "
                },
                {
                    "key": "restaurant",
                    "name": "餐厅 "
                },
                {
                    "key": "office",
                    "name": "办公室 "
                },
                {
                    "key": "park",
                    "name": "公园 "
                },
                {
                    "key": "ktv",
                    "name": "KTV"
                },
                {
                    "key": "glass_occ",
                    "name": "玻璃遮挡"
                },
                {
                    "key": "parking_lot",
                    "name": "停车场"
                },
                {
                    "key": "parking_underground",
                    "name": "地下停车场"
                },
                {
                    "key": "security_post",
                    "name": "保安亭"
                },
                {
                    "key": "scenic_spot",
                    "name": "景区"
                },
                {
                    "key": "store",
                    "name": "商店"
                },
                {
                    "key": "corridor",
                    "name": "走廊"
                },
                {
                    "key": "classroom",
                    "name": "教室"
                },
                {
                    "key": "office_campuses",
                    "name": "办公园区"
                },
                {
                    "key": "hotel",
                    "name": "酒店"
                },
                {
                    "key": "museum",
                    "name": "博物馆"
                },
                {
                    "key": "resort",
                    "name": "度假村"
                },
                {
                    "key": "industrial_park",
                    "name": "工业园区"
                },
                {
                    "key": "cars_dense",
                    "name": "车辆密集场景"
                }
            ]
        },
        {
            "key": "season",
            "name": "季节",
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
            ]
        },
        {
            "key": "light_intensity",
            "name": "光照强度",
            "option": [
                {
                    "key": "normallight",
                    "name": "正常光 "
                },
                {
                    "key": "darklight",
                    "name": "暗光 "
                },
                {
                    "key": "stronglight",
                    "name": "强光 "
                },
                {
                    "key": "blacklight",
                    "name": "全黑 "
                },
                {
                    "key": "lowlight",
                    "name": "弱光 "
                }
            ]
        },
        {
            "key": "light_direction",
            "name": "光照方向",
            "option": [
                {
                    "key": "frontlight",
                    "name": "顺光"
                },
                {
                    "key": "backlight",
                    "name": "逆光"
                },
                {
                    "key": "toplight",
                    "name": "顶光"
                },
                {
                    "key": "bottomlight",
                    "name": "底光"
                },
                {
                    "key": "sidelight",
                    "name": "侧光"
                },
                {
                    "key": "null",
                    "name": "无"
                }
            ]
        },
        {
            "key": "direction",
            "name": "方向",
            "option": [
                {
                    "key": "front",
                    "name": "正面"
                },
                {
                    "key": "up",
                    "name": "上方 "
                },
                {
                    "key": "down",
                    "name": "下方 "
                },
                {
                    "key": "left",
                    "name": "左方 "
                },
                {
                    "key": "right",
                    "name": "右方 "
                },
                {
                    "key": "center",
                    "name": "中间 "
                },
                {
                    "key": "left_up",
                    "name": "左上方 "
                },
                {
                    "key": "right_up",
                    "name": "右上方 "
                },
                {
                    "key": "left_down",
                    "name": "左下方 "
                },
                {
                    "key": "right_down",
                    "name": "右下方 "
                },
                {
                    "key": "left_90",
                    "name": "左90°"
                },
                {
                    "key": "right_90",
                    "name": "右90°"
                },
                {
                    "key": "rear",
                    "name": "背面"
                },
                {
                    "key": "direction_random",
                    "name": "自由方向"
                }
            ]
        },
        {
            "key": "light_type",
            "name": "光线类型",
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
            ]
        },
        {
            "key": "imaging_effect",
            "name": "成像效果",
            "option": [
                {
                    "key": "normal",
                    "name": "正常"
                },
                {
                    "key": "overexposure",
                    "name": "过曝"
                }
            ]
        },
        {
            "key": "weather",
            "name": "天气",
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
            ]
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
            ]
        },
        {
            "key": "cooperate_degree",
            "name": "演员配合度",
            "option": [
                {
                    "key": "cooperate",
                    "name": "配合式"
                },
                {
                    "key": "non_cooperate",
                    "name": "非配合式"
                }
            ]
        },
        {
            "key": "event_type",
            "name": "事件类型",
            "option": [
                {
                    "key": "store_outside",
                    "name": "店外经营"
                },
                {
                    "key": "sundries",
                    "name": "杂物堆放"
                },
                {
                    "key": "peddler",
                    "name": "流动小贩"
                },
                {
                    "key": "motor_vehicle_violation",
                    "name": "机动车违停"
                },
                {
                    "key": "non_motor_vehicle_violation",
                    "name": "非机动车违停"
                },
                {
                    "key": "garbage_exposure",
                    "name": "暴露垃圾"
                },
                {
                    "key": "illegal_outdoor_advertising",
                    "name": "违规户外广告"
                },
                {
                    "key": "illegal_advertisement",
                    "name": "非法小广告"
                },
                {
                    "key": "corridor_illegal_parking",
                    "name": "楼道违停"
                },
                {
                    "key": "elevator_illegal_parking",
                    "name": "电梯违停"
                },
                {
                    "key": "illegal_parking",
                    "name": "违停"
                },
                {
                    "key": "enter",
                    "name": "进入"
                },
                {
                    "key": "leave",
                    "name": "离开"
                },
                {
                    "key": "muck_car_unclosed_transport",
                    "name": "渣土车未密闭运输"
                },
                {
                    "key": "air_dry_street",
                    "name": "沿街晾晒"
                },
                {
                    "key": "garbage",
                    "name": "积存垃圾渣土"
                },
                {
                    "key": "street_dirty",
                    "name": "道路不洁"
                },
                {
                    "key": "private_construction",
                    "name": "私搭乱建"
                },
                {
                    "key": "public_facilities_damage",
                    "name": "公共设施损坏"
                }
            ]
        },
        {
            "key": "stuff_type",
            "name": "物品类型",
            "option": [
                {
                    "key": "fruits_vegetables",
                    "name": "果蔬类"
                },
                {
                    "key": "clothing",
                    "name": "衣物类"
                },
                {
                    "key": "catering",
                    "name": "餐饮类"
                },
                {
                    "key": "department_store",
                    "name": "百货类"
                },
                {
                    "key": "food_processing",
                    "name": "食品加工类"
                },
                {
                    "key": "snack_cover",
                    "name": "小吃罩子类"
                },
                {
                    "key": "express",
                    "name": "快递堆"
                },
                {
                    "key": "cargo_box",
                    "name": "货物框堆"
                },
                {
                    "key": "building_mess",
                    "name": "建筑杂物堆"
                },
                {
                    "key": "domestic_garbage",
                    "name": "生活垃圾堆"
                },
                {
                    "key": "floor_advertising",
                    "name": "落地布制广告"
                },
                {
                    "key": "floor_light_ad",
                    "name": "落地灯箱广告"
                },
                {
                    "key": "floor_electronic_ad",
                    "name": "落地电子广告"
                },
                {
                    "key": "roll_screen",
                    "name": "易拉宝"
                },
                {
                    "key": "truss_ad",
                    "name": "桁架广告"
                },
                {
                    "key": "poster_ad_samll",
                    "name": "海报广告"
                },
                {
                    "key": "door_ad",
                    "name": "门头广告"
                },
                {
                    "key": "column_ad",
                    "name": "立柱广告"
                },
                {
                    "key": "neon_ad",
                    "name": "霓虹灯广告"
                },
                {
                    "key": "light_box_ad",
                    "name": "灯箱广告"
                },
                {
                    "key": "banner_ad",
                    "name": "旗帜广告"
                },
                {
                    "key": "wall_ad",
                    "name": "墙体广告"
                },
                {
                    "key": "iron_frame_ad",
                    "name": "铁架广告"
                },
                {
                    "key": "paper_ad",
                    "name": "纸质小广告"
                },
                {
                    "key": "poster_ad",
                    "name": "海报小广告"
                },
                {
                    "key": "stamp_ad",
                    "name": "图章小广告"
                },
                {
                    "key": "print_ad",
                    "name": "喷涂小广告"
                },
                {
                    "key": "compliant_sealed",
                    "name": "合规密闭"
                },
                {
                    "key": "compliant_unsealed",
                    "name": "合规未密闭"
                },
                {
                    "key": "uncompliant_unsealed",
                    "name": "违规未密闭"
                },
                {
                    "key": "clothes",
                    "name": "衣物类"
                },
                {
                    "key": "bedclothes",
                    "name": "床上用品类"
                },
                {
                    "key": "manhole_cober",
                    "name": "井盖破损"
                },
                {
                    "key": "food",
                    "name": "食品类"
                },
                {
                    "key": "bricks",
                    "name": "砖块类"
                },
                {
                    "key": "rubble",
                    "name": "瓦砾类"
                },
                {
                    "key": "leaves",
                    "name": "树叶类"
                },
                {
                    "key": "throw",
                    "name": "遗撒类"
                },
                {
                    "key": "steel_house",
                    "name": "彩钢板房"
                },
                {
                    "key": "well_round",
                    "name": "圆形井"
                },
                {
                    "key": "glove_box_pile",
                    "name": "杂物箱堆"
                },
                {
                    "key": "gargo_bag_pile",
                    "name": "货物袋堆"
                },
                {
                    "key": "furniture_pile",
                    "name": "家具堆"
                },
                {
                    "key": "closed_food_stall",
                    "name": "封闭大排档"
                },
                {
                    "key": "cement_pile",
                    "name": "水泥堆"
                },
                {
                    "key": "lumber_pile",
                    "name": "木材堆"
                },
                {
                    "key": "rebar_pile",
                    "name": "钢筋堆"
                },
                {
                    "key": "paint_bucket",
                    "name": "油漆桶"
                },
                {
                    "key": "PVC_pipe",
                    "name": "PVC管材"
                }
            ]
        },
        {
            "key": "shooting_content",
            "name": "拍摄内容",
            "option": [
                {
                    "key": "people",
                    "name": "人"
                },
                {
                    "key": "bicycle",
                    "name": "自行车"
                },
                {
                    "key": "electric_vehicle",
                    "name": "电动车"
                },
                {
                    "key": "body",
                    "name": "人体"
                },
                {
                    "key": "gesture",
                    "name": "手势"
                }
            ]
        }
    ]
    this.initialData.forEach( v => { this.$set(this.addForm, v.key, []);})
  },
  methods: {
    configuration() {
     for (let item of this.list) {
       if (!item.length) {
         this.$message.warning('维度配置不完全！')
         return
       }
     }
     permutationCombination([["美食/餐厅线上活动", "地推活动"],["线下主题活动", "单纯品牌曝光"],["地推活动","单纯品牌曝光"]], 0).forEach( x => {
         let actionArr = []
         this.list.forEach( x => {
           actionArr.push({radio: x[0].id,radioList: x})
         })
         this.configurationList.push({name : x, action: actionArr})
     })
    },
    handleDelete(index) {
      this.configurationList.splice(index, 1);
    }
  }
}
</script>

<style scoped lang="scss">
</style>
