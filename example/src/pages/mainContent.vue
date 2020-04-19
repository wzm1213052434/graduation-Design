<template>
  <div class="main-content-pane">
    <div class="left-content-pane">
         <el-menu
                default-active="/homePage"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                style="height:100%;"
                :router="true"
            >   
            <el-menu-item v-for="(item,index) in routersArr" :key="index + ''" :index="item.path" @click="changeTitle(item.children[0].meta.title)">
                <i :class="item.children[0].meta.icon"></i>
                <span slot="title" v-text="item.children[0].meta.title"></span>
            </el-menu-item>
        </el-menu>
    </div>
    <div class="right-content-pane">
        <div class="right-pane-breadCrumb">
            <bread-crumbs :names="breadTitle"></bread-crumbs>
        </div>
        <div class="right-pane-botPane">
            <transition name="component-fade" mode="out-in">
                <router-view/>
            </transition>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import breadCrumbs from './../components/breadCrumbs'
export default {
    name: 'mainContent',
    components:{
        breadCrumbs
    },
    mounted() {
        this.getRoutersArr();
    },
    data() {
        return {
            routersArr: [],
            breadTitle: ""
        }
    },
    computed: {
    ...mapGetters([
            'getInfo'
        ])
    },
    methods: {
        getRoutersArr() {
            let temp = this.$router.options.routes;
            let vuexState = this.getInfo;
            let res = [];
            for(let i in temp) {
                if(!!temp[i].children && temp[i].permission <= vuexState.permission) {
                    res.push(temp[i]);
                }
            }
            this.routersArr = res;
            this.breadTitle = res[0].children[0].meta.title
        },
        changeTitle(title) {
            this.breadTitle = title;
        }
    }
}
</script>

<style scoped>
    .main-content-pane {
        width: 100%;
        height: 100%;
        display: flex;
    }
    .left-content-pane {
        width: 10%;
        height: 100%;
    }
    .right-content-pane {
        width: 89%;
        height: 100%;
    }
    .right-pane-breadCrumb {
        width: 100%;
        height: 5%;
    }
    .right-pane-botPane {
        width: 100%;
        height: 93%;
        padding-top: 1%;
    }
    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .6s ease;
    }
    .component-fade-enter, .component-fade-leave-to {
        opacity: 0;
    }
</style>