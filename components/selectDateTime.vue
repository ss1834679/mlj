<template>
	<view>
		<u-popup v-model="pstatus"  mode="center" :closeable="true" width="600" @close="popupClose">
			<view class="content">
				<u-gap height="60" bg-color="#fff"></u-gap>
				<view class="title">{{title}}</view>
				<u-gap height="20" bg-color="#fff"></u-gap>
				<view class="main">
					<u-input class="main-input" v-model="startTime" disabled :border="true" :placeholder="placeStart" @click="startShow=true"></u-input>
					<span>至</span>
					<u-input class="main-input" v-model="endTime" disabled :border="true" :placeholder="placeEnd" @click="endShow=true"></u-input>
				</view>
				<u-gap height="30" bg-color="#fff"></u-gap>
				<view class="sure-btn">
					<u-button type="primary" @click="confirmTime">确认</u-button>
				</view>
				<u-gap height="30" bg-color="#fff"></u-gap>
			</view>
			
		</u-popup>
		<u-picker v-model="startShow" :title="placeStart" mode="time" :params="params" @confirm="startTimeSure" @cancel="startTimeCancel"></u-picker>
		<u-picker v-model="endShow" :title="placeEnd" :default-time="endStartShow" mode="time" :params="params" @confirm="endTimeSure" @cancel="endTimeCancel"></u-picker>
	</view>
</template>

<script>
/* 
***时间范围选择组件
* 
*/
export default {
	props: {
		//弹窗状态
		status:{
		  type: Boolean,
		  default: false
		},
		//弹框标题
		title:{
			type: String,
			default: '请选择时间范围'
		},
		placeStart:{
			type: String,
			default: '请选择开始时间'
		},
		placeEnd:{
			type: String,
			default: '请选择结束时间'
		}
	},
	computed: {
		pstatus:{
			get(){
				return this.status ? true : false
			},
			set(val){}
		}
	},
	data() {
		return {
			startTime:'',//开始时间
			endTime:'',//结束时间
			params: {
				year: true,
				month: true,
				day: true,
				hour: true,
				minute: true,
				second: false
			},
			startShow:false,
			endShow:false,
			endStartShow:""
		};
	},
	methods: {
		popupClose(){
			this.$emit('timePopupClose', false)
		},
		startTimeSure(val){
			this.startTime=val.year+'-'+val.month+'-'+val.day+' '+val.hour+':'+val.minute;
			this.endShow=true;
			this.endStartShow=this.startTime.toString();
		},
		startTimeCancel(val){
			this.startTime="";
		},
		endTimeSure(val){
			this.endTime=val.year+'-'+val.month+'-'+val.day+' '+val.hour+':'+val.minute;
		},
		endTimeCancel(val){
			this.endTime=""
		},
		confirmTime(){
			const beginTimeFormat = this.startTime.replace("-","/");//替换字符，变成标准格式
			const endTimeFormat = this.endTime.replace("-","/");//替换字符，变成标准格式
			const beginTimeParae = new Date(Date.parse(beginTimeFormat));
			const endTimeFormatParse = new Date(Date.parse(endTimeFormat));
			if(beginTimeParae>endTimeFormatParse){
				uni.showToast({
					title:"开始时间不能晚于结束时间，请重新选择！",
					icon:'none'
				})
			}else{
				var obj={
					startTime:this.startTime,
					endTime:this.endTime
				}
				this.$emit('timePopupSure',obj,false);
			}
			
		}
	}
}
</script>

<style lang="scss" scoped>
	.content{
		// margin-top: 50rpx;
		text-align: center;
		padding: 0 30rpx;
		box-sizing: border-box;
		.title{
			// margin-bottom: ;
		}
		.main{
			
			.main-input{
				font-size: 20rpx;
			}
		}

	}
</style>
