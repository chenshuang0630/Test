import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

var store = new Vuex.Store({
	//初始化要改变的变量
	state:{
		isNavShow:false,
		headerTitle:'电影',
		didian:'大连'
	},
	//同步操作要改变变量的方法写在这里面
	mutations:{
		CHANGE_NAV_SHOW(state,payload){
			state.isNavShow = payload
		},
		CHANGE_HEADER_TITLE(state,payload){
			state.headerTitle = payload
		},
		CHANGE_HEADER_DIDIAN(state,payload){
			state.didian=payload
		}
	}
})
export default store