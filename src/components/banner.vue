<template>
	<div id="mz_banner" class="swiper-container">
		<ul class="swiper-wrapper">
		<li class="swiper-slide" v-for="item in bannerList"><img :src="item.imageUrl"></li>
		</ul>
	</div>
</template>

<script>

import axios from 'axios';

	export default {
		name : 'mz-banner',
		data(){
			return {
				bannerList : []
			};
		},
		mounted(){

			axios.get('/v4/api/billboard/home',{
				
			}).then((res)=>{
				//console.log(res);
				//res.data -> 真实数据的根节点
				var status = res.data.status;
				if(status === 0){
					window.localStorage.setItem('bannerList',JSON.stringify(res.data.data.billboards));
					this.bannerList = res.data.data.billboards;
					this.$nextTick().then(()=>{
    					// DOM 更新了
    					//Swiper必须等到DOM加载完成后，JS才会生效
    					var $mz_banner = $('#mz_banner');
						new Swiper($mz_banner,{
							loop : true
						});
  					});
				}
			},(err)=>{
				this.bannerList = JSON.parse(window.localStorage.getItem('bannerList'));
				this.$nextTick().then(()=>{
					var $mz_banner = $('#mz_banner');
					new Swiper($mz_banner,{
						loop : true,
						/*pagination: {
					    	el: '.swiper-pagination',
					    	clickable: true
					    },*/
					    autoplay:true
					});
				});
			});

		}
	}
</script>

<style>
#mz_banner{ margin-top: 50px; width: 100%; overflow:hidden; }
#mz_banner img{ width: 100%; }
</style>