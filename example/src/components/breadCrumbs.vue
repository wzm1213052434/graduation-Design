<template>
  <div class="breadCrumb">
      <div>
          {{names}}
      </div>
      <div style="width: 20%;font-size:15px;text-align:center;">
          <el-link type="primary" :underline="false">欢迎您：{{name}} </el-link>
          <el-link type="primary" style="margin-left:10%;font-size:15px;" @click="exit">退出</el-link>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name:"breadCrumb",
    props: ["names"],
    computed: {
        ...mapGetters([
            'getInfo'
        ]),
        name: function() {
            let a = this.getInfo;
            return a.name
        }
    },
    methods:{
        exit: function() {
            window.location.href = 'http://localhost:8080/';
        }
    }
}
</script>

<style>
    .breadCrumb {
        width: 100%;
        height: 100%;
        padding-top: 1%;
        padding-left: 2%;
        border-bottom: 1px solid rgba(188,188,188,.5);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
    }
</style>