<template>
	<view>
		<u-popup v-model="pstatus"  mode="bottom" :closeable="true" @open="popupOpen" @close="popupClose">
			<view class="content">
				<u-gap height="40" bg-color="#fff"></u-gap>
				<u-form :model="opinionFrom" ref="uForm" :border-bottom="false" label-position="top">
					<u-form-item label="专家意见">
						<u-input v-model="opinionFrom.message" maxlength="1000" class="input-fontsz" :disabled="!popupType" type="textarea" placeholder="请输入建议(不超过1000字)" :border="true" height="400"/>
					</u-form-item>
				</u-form>
				<u-button v-if="popupType" type="primary" @click="confirm">确认</u-button>
				<view class="u-flex u-row-between bottom-tips">
					<p>医生：{{doctorName}}</p>
					<p>日期：{{doctorDate}}</p>
				</view>
			</view>
			
		</u-popup>
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
		popupType:{
			type: Boolean,
			default: false //false 查看模式 true输入模式
		},
		doctorMessage:{
			type: String,
			default: ''
		},
		doctorName:{
			type: String,
			default: '王医生'
		},
		doctorDate:{
			type: String,
			default: '2020-12-22  11:29:04'
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
			opinionFrom:{
				message:this.doctorMessage
			},
		};
	},
	methods: {
		//关闭弹窗
		popupClose(){
			this.opinionFrom.message="";
			this.$emit('popupClose', false)
		},
		
		popupOpen(){
			
		},
		confirm(){
			// var obj={
			// 	startTime:this.startTime,
			// 	endTime:this.endTime
			// }
			this.popupClose();
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
		height: 800rpx;
		.bottom-tips{
			color: #C0C0C0;
			padding: 30rpx 0;
			box-sizing: border-box;
			font-size: 24rpx;
		}
		.input-fontsz{
			font-size: 26rpx;
		}
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
