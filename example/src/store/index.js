import Vue from 'vue';
import Vuex from 'vuex'
//使用
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        name: '',
        permission: '',
        id: ''
    },
    getters: {
        getInfo(state) {
            return state;
        },
    },
    mutations: {
        initInformation(state,mes) {
            for(let i in state) {
                state[i] = mes[i];
            }
        }
    },
    actions: {
        initInfo(context,mes) {
            context.commit('initInformation',mes);
        }
    },

})