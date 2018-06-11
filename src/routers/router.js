import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../components/index.vue';
import Film from '../components/film.vue';

import Detail from '../components/detail.vue';

import NowPlaying from '../components/nowPlaying.vue';
import CommingSoon from '../components/commingSoon.vue';

import City from '../components/city.vue';
import Cinemas from '../components/cinemas.vue';

Vue.use(VueRouter);

var router = new VueRouter({
	routes: [
		{
			path: '/index',
			component: Index
		},
		{
			path: '/film',
			component: Film,
			children: [{
					path: 'now-playing',
					component: NowPlaying
				},
				{
					path: 'comming-soon',
					component: CommingSoon
				}
			],
			redirect : '/film/now-playing'
		},
		{
			path: '/detail/:id?',
			component: Detail
		} ,
		{
			path: '/city',
			component: City
		},
		{
			path: '/cinemas',
			component: Cinemas
		},
		{
			path: '/*',
			redirect: '/index'
		}
	],
	//切换路由时候，回到页面顶端
	scrollBehavior(to, from, savedPosition) {
		return {
			x: 0,
			y: 0
		}
	},
	//默认是hash,这个属性是改成history模式
	mode:'history'
})
export default router