<template>
	<div id="mz_cinemas">
		<template v-for="(item,key) in formatCinemas">
			<div class="district hidden" @touchstart="handleShowOffContent($event)">
				<div class="title">{{key}}</div>
				<div class="content ">
					<div class="cinema-wrap" v-for="(val,index) in item">
						<div class="cinema-title clear">
							<div class="cinema-title-cinemaname">
								<span class="">{{val.name}}</span>
								<!--<i>座</i>
								<i>通</i>-->
							</div>
							<div class="cinema-link-to">
								<i class="iconfont icon-more"></i>
							</div>
						</div>
						<span v-if="val.labels.length!=0" class="cinema-title-tip">可乐爆米花</span>
						<div class="cinema-title-address">{{val.address}}</div>
						<div class="cinema-title-location">
							<span>距离</span><span>未知</span>
						</div>
					</div>
				</div>
			</div>
		</template>
		
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		 
		name : 'mz-cinemas',
		data(){
			return {
				cinemas:[]
			};
		},
		mounted(){
			axios.get('/v4/api/cinema').then((res)=>{
				//console.log(res);
				var status = res.data.status;
				if(status === 0){
					this.cinemas = res.data.data.cinemas;
					window.localStorage.setItem('cinemas',JSON.stringify(this.cinemas));
					
				}
			},(err)=>{
				this.cinemas = JSON.parse(window.localStorage.getItem('cinemas'));
			});
			
		},
		computed : {
			formatCinemas(){
				
				var newCinemas={};
				
				this.cinemas.forEach((v,i)=>{
					newCinemas[v.district.name]=[];
				})
				this.cinemas.forEach((v,i)=>{
					newCinemas[v.district.name].push({
						"name":v.name,
						"labels":v.labels,
						"address":v.address,
						"isFavorite":v.isFavorite
					});
				})
				//console.log(newCinemas)
				
				return newCinemas;
			}
		},
		methods : {
			handleShowOffContent(ev){
				if(ev.path[1].classList.contains('active')==true){
					ev.path[1].classList.remove("active")
					ev.path[1].classList.add("hidden")
				}else if(ev.path[1].classList.contains('hidden')==true){
					ev.path[1].classList.add("active")
					ev.path[1].classList.remove("hidden")
				}
				
			}
		}
	}
</script>

<style scoped="scoped">
.clear:after{
	clear: both;
	content: '.';
	height: 0;
	visibility: hidden;
	display: block;
}
#mz_cinemas{
	margin-top: 50px;
}
.district{
	border-top: 2px solid #fff;
	box-sizing: border-box;
}
.district .title{
	height: 40px;
	line-height: 40px;
	background: #ebebeb;
	padding-left: 16px;
	color: #333;
	font-size: 14px;
}
.district .content{
	background: #fff;
	color: #ccc;
	font-size: 12px;
}
.district.hidden .content{
	display: none;
}
.district.active .content{
	display: block;
}
.cinema-wrap{
	padding: 10px 16px 12px 16px;
	border-bottom: 1px solid #eee;
	box-sizing: border-box;
}
.cinema-title{
	color: #666;
	height: 30px;
	line-height: 30px;
	font-size: 16px;
	margin-bottom: 8px;
}	
.cinema-title-cinemaname{
	float: left;
}
.cinema-link-to{
	float: right;
	font-size: 26px;
	margin-top: -5px;
}
.cinema-title-tip{
	background-color: #51add0;
	display: inline-block;
    border-radius: 3px;
    padding: 0 5px;
    margin-left: 0px;
    font-style: normal;
    color: #fff;
    height: 15px;
    line-height: 15px;
    margin-bottom: 12px;
}
.cinema-title-address{
	margin-bottom: 12px;
}
</style>