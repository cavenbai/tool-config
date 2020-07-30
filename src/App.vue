<template>
  <div id="app">
    <el-container>
      <!-- <el-header>
        <el-form :model="form" ref="ruleForm" label-width="100px">
          <el-form-item label="工具名称" prop="name">
            <el-select v-model="form.template" placeholder="请选择工具" @change='changeTools'>
              <el-option label="底库" value="1"></el-option>
              <el-option label="NVR" value="2"></el-option>
            </el-select>
          </el-form-item>      
        </el-form>
      </el-header> -->
      <el-main><router-view/></el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data() {
      return {
        // form: { template: '1' }
      }
    },
    methods: {
      // changeTools(val) {
      //   if (val === '1') { this.$router.push('/')}
      //   if (val === '2') { this.$router.push('/nvr')}
      // }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
