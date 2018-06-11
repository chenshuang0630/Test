<template>
	<transition name="slide">
		<div id="mz_menu" v-if="isNavShow">
			<ul>
				<router-link to="/index" tag="li">首页<i class="iconfont icon-more"></i></router-link>
				<router-link to="/film" tag="li">影片<i class="iconfont icon-more"></i></router-link>
				<router-link to="/cinemas" tag="li">影院<i class="iconfont icon-more"></i></router-link>
				<router-link to="/index" tag="li">商城<i class="iconfont icon-more"></i></router-link>
				<router-link to="/index" tag="li">我的<i class="iconfont icon-more"></i></router-link>
				<router-link to="/index" tag="li">卖座卡<i class="iconfont icon-more"></i></router-link>
			</ul>
		</div>
	</transition>
</template>

<script>
	
	export default {
		name : 'mz-nav',
		data(){
			return {};
		},
		computed : {
			isNavShow(){
				return this.$store.state.isNavShow
			}
		}
	}
</script>

<style scoped>
#mz_menu{ width: 265px; height: 100%; background: #282828; color:#999999; position: fixed; left: 0; top:50px; z-index:10;}
#mz_menu ul{}
#mz_menu li{ line-height: 50px; height: 50px; border-bottom: 1px dashed #333333; padding-left: 10px; }
#mz_menu li i{ float:right; padding-right: 10px; }

.slide-enter-active{
	animation : .5s navMove linear;
}
.slide-leave-active{
	animation : .5s navMove linear reverse;
}
@keyframes navMove{
	0%{
		transform : translateX(-100%);
		opacity: 0;
	}
	100%{
		transform : translateX(0);
		opacity: 1;
	}
}
</style>