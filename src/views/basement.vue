<template>
  <div class="basement">
    <el-row :gutter="20">
      <el-col :span="8"><scene-component v-model="sceneList"></scene-component></el-col>
      <el-col :span="8"><base-component v-model="baseList"></base-component></el-col>
      <el-col :span="8"><behavior-component v-model="behaviorList"></behavior-component></el-col>
    </el-row>
    <el-row style="margin-top:40px">
      <scene-list-component :list="message"></scene-list-component>
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
      behaviorList: []
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
      console.log(this.sceneList)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
