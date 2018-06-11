<template>
	<div id="mz_city">
		<div class="hot-city">
			<div class="city-name">热门城市</div>
			<div class="clear cities">
				<div class="w_25 cities-item">北京</div>
				<div class="w_25 cities-item">上海</div>
				<div class="w_25 cities-item">广州</div>
				<div class="w_25 cities-item">深圳</div>
			</div>
			<div class="city-name">按字母排序</div>
			<div class="clear cities">
				<div @touchstart="handlemaodian(val)" class="w_25 cities-item" v-for="val in this.showCityFir">{{val}}</div>
			</div>
		</div>
		<ul>
			<li v-for="(item,key) in formatCities">
				<div v-if="item.length==0? false:true">
					<div class="city-name" :id="key">{{key}}</div>
					<div class="clear cities">
						<div class="w_25 cities-item" v-for="val in item" @tap="didian(val.name)">
							{{val.name}}
						</div>
					</div>
				</div>
			</li>
		</ul>	
	</div>
</template>

<script>

import axios from 'axios';

	export default {
		name : 'mz-city',
		data(){
			return {
				cities : [],
				showCityFir:[],
				time:null
			};
		},
		mounted(){
			axios.get('/v4/api/city').then((res)=>{
				//console.log(res);
				var status = res.data.status;
				if(status === 0){
					this.cities = res.data.data.cities;
					window.localStorage.setItem('cities',JSON.stringify(this.cities));
				}
			},(err)=>{
				this.cities = JSON.parse(window.localStorage.getItem('cities'));
			});
			this.$store.commit('CHANGE_HEADER_TITLE','城市选择');
		},
		computed : {
			 formatCities(){
			 	var newCitiesObiect={};
			 	var arr=[];
			 	var ABC=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
			 	for(var i=0;i<ABC.length;i++){
			 		newCitiesObiect[ABC[i]]=[]
			 	};
			 	this.cities.forEach((item)=>{
			 		var idx=item.pinyin.charAt(0);
					newCitiesObiect[idx].push(item)
			 		
			 	})
			 	
			 	//console.log(newCitiesObiect)
			 	for(let v in newCitiesObiect){
			 		if(newCitiesObiect[v].length!=0){
			 			arr.push(v)
			 		}
			 	}
			 	//console.log(arr)
			 	this.showCityFirstLetter(arr)
			 	
			 	return newCitiesObiect;
			 	
			 }
		},
		methods : {
			didian(name){
				this.$store.commit('CHANGE_HEADER_DIDIAN',name);
				
				this.$router.push({path:'/index'});
			},
			showCityFirstLetter(arr){
				/*this.showCityFir=arr;*/
				this.showCityFir=arr;
			},
			handlemaodian(val){
				
				var scroll_val=document.getElementById(val).offsetTop-50;
				var count=0;
				var tt=scroll_val/5;
				var This=this;
				this.time=setInterval(()=>{
					count+=tt;
					if(count>=scroll_val){
						clearInterval(This.time)
					};
					document.documentElement.scrollTop=count;
					document.body.scrollTop=count;
				},100)
				
			}
		}
	}
</script>

<style scoped="scoped">
#mz_city{ margin-top: 50px }
.clear:after{
	clear: both;
	content: '.';
	height: 0;
	visibility: hidden;
	display: block;
}
.w_25{
	width: 25%;
	float: left;
}
.city-name{
	height: 30px;
	line-height: 30px;
	background: #ebebeb;
	padding-left: 20px;
	color: #333;
	font-size: 12px;
}
.cities{
	background: #fff;
	color: #666;
	font-size: 14px;
}
.cities-item{
	text-align: center;
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #eee;
}
</style>