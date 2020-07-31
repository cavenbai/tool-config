<template>
  <div class="basement">
    <el-row :gutter="20">
      <el-col :span="8"><scene-component v-model="sceneList"></scene-component></el-col>
      <el-col :span="8"><base-component v-model="baseList"></base-component></el-col>
      <el-col :span="8"><behavior-component v-model="behaviorList"></behavior-component></el-col>
    </el-row>
    <el-row style="margin-top:40px">
      <scene-list-component :list="message" v-model="sceneGroupList"></scene-list-component>
    </el-row>
    <el-row style="margin-top:40px">
      <essential-information></essential-information>
    </el-row>
    <div style="margin-top:40px;text-align: center">
     <el-button type="primary" @click="buildConfiguration">生成配置文件</el-button>
    </div>
  </div>
</template>

<script>
// import { getBasement } from '@/api'
import SceneComponent from '@/components/scene-component.vue'
import SceneListComponent from '@/components/scene-list-component.vue'
import EssentialInformation from '@/components/essential-information.vue'
import BaseComponent from '@/components/base-component.vue'
import BehaviorComponent from '@/components/behavior-component.vue'
export default {
  name: 'basement',
  components: { SceneComponent, SceneListComponent, EssentialInformation, BaseComponent, BehaviorComponent },
  data() {
    return {
      sceneList: [],
      baseList: [],
      behaviorList: {},
      sceneGroupList: {}
    };
  },
  computed: {
    message: function () {
      let arr = []
      arr.push(this.sceneList,this.baseList,this.behaviorList)
      return arr
    }
  },
  methods: {
    buildConfiguration() {
      let obj = { 
        collect:{
          collect_mode_list: [],
          base_info_group: [],
          vision_data: {
            scene_list: [],
            action_list: []
          },
          custom_hook: {
            vision_data: {
              scene_group: [],
              action_group: []
            }
          }
        } 
      }
      obj.collect.collect_mode_list = this.sceneList
      this.baseList.forEach( x => {
        x.info_list.forEach( n => {
          x.requirementList.forEach( m => {
            if (n.key === m.key) {
              n.required = m.required
            }
          })
          n.key_zh = n.name
        })
      })
      obj.collect.base_info_group = this.baseList
      Object.entries(this.sceneGroupList.action).filter(x => x[1].length > 0).forEach( v => {
        obj.collect.vision_data.scene_list.push({key: v[0], attr_list: v[1]})
      })
      Object.entries(this.behaviorList.action).filter(x => x[1].length > 0).forEach( v => {
        obj.collect.vision_data.action_list.push({key: v[0], attr_list: v[1]})
      })
      this.sceneGroupList.actionGroup.forEach( x => {
        let obj2 = {}
        x.name.forEach( item => { obj2[item.parent] = item.key })
        obj.collect.custom_hook.vision_data.scene_group.push({
          detail: obj2,
          hook: {
            disable: x.disabled,
            collect_mode_id: x.action[0].radio,
            base_info_group_id: x.action[1].radio,
            action_group_id: x.action[2].radio
          }
        })
      })
      this.behaviorList.actionGroup.forEach( x => {
        let arr = []
        x.details.forEach(item => {
          item.forEach( r => {
            let obj3 = {}
            obj3[r.parent] = r.key
            arr.push(obj3)
          })
        })
        obj.collect.custom_hook.vision_data.action_group.push({ id: x.id, details: arr })
      })
      console.log(obj)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
