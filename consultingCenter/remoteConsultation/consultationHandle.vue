<template>
  <view class="page">
    <view class="u-flex u-row-between u-border-bottom item">
    	<p>患者：</p>
			<span>高陵 女 45岁</span>
    </view>
		<view class="u-flex u-row-between u-border-bottom item">
			<p>会诊病种：</p>
			<span>肠癌</span>
		</view>
		
		<view class="item">
			<p>病情摘要：</p>
			<span>病情摘要病情摘要病情摘要病情摘要病情摘要病情摘要病情摘要</span>
		</view>
		<view class="item u-border-bottom">
			<p>相关图片：</p>
			<view class="imgs-box">
				<u-row gutter="10">
					<u-col span="3">
						<u-image width="120rpx" height="120rpx" src="/static/img/doctor-female.png" />
					</u-col>
					<u-col span="3">
						<u-image width="120rpx" height="120rpx" src="/static/img/doctor-female.png" />
					</u-col>
					<u-col span="3">
						<u-image width="120rpx" height="120rpx" src="/static/img/doctor-female.png" />
					</u-col>
					<u-col span="3">
						<u-image width="120rpx" height="120rpx" src="/static/img/doctor-female.png" />
					</u-col>
					<u-col span="3">
						<u-image width="120rpx" height="120rpx" src="/static/img/doctor-female.png" />
					</u-col>
				</u-row>
			</view>
		</view>
		
		<view class="u-flex u-row-between u-border-bottom item">
			<p>会诊时间：</p>
			<span>2020-12-12  09:12:21~09:12:21</span>
		</view>
		<view class="u-flex u-row-between u-border-bottom item">
			<p>会诊目的：</p>
			<span>讨论</span>
		</view>
		<view class="u-border-bottom item">
			<p>会诊要求：</p>
			<span>请提前入场。</span>
		</view>
		<view class="group">
				<u-section title="专家列表" :arrow="false" sub-color="#00BFFF" sub-title="查看会诊" :show-line="false" @click="pickerShow=true"></u-section>
				<view class="list">
					<view class="u-flex item u-border-bottom">
						<u-avatar size="80" src="/static/img/doctor-female.png" />
						<view class="content u-flex-1">
							<p>王林</p>
							<p>南充身心医院 精神科/心理科</p>
						</view>
					</view>
					<view class="u-flex item u-border-bottom">
						<u-avatar size="80" src="/static/img/doctor-female.png" />
						<view  class="content u-flex-1">
							<p>王林</p>
							<p>南充身心医院 精神科/心理科</p>
						</view>
					</view>
					<view class="u-flex item u-border-bottom">
						<u-avatar size="80" src="/static/img/doctor-female.png" />
						<view  class="content u-flex-1">
							<p>王林</p>
							<p>南充身心医院 精神科/心理科</p>
						</view>
					</view>
				</view>
			</view>
		<u-picker mode="selector" v-model="pickerShow" confirm-text="去查看" :range="selectorObj" range-key="cateName" @confirm="pickerWays"></u-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pickerShow:false,
			selectorObj:[{
					cateName: '待会诊',
					id: 1
				},
				{
					cateName: '进行中',
					id: 2
				},
				{
					cateName: '已完成',
					id: 3
				}]
    };
  },
	//页面首次加载触发
	onLoad() {
		
	},
	//页面打开触发
	onShow() {
		
	},
  methods: {
    pickerWays(val){
			// if(val[0]==1){
			// 	uni.navigateTo({
			// 		url:'/consultingCenter/remoteConsultation/consultationListDetail'
			// 	})
			// }
			uni.navigateTo({
				url:'/consultingCenter/remoteConsultation/consultationListDetail'
			})
			
		}
  }
};
</script>

<style lang="scss" scoped>
.page{
	background: #FFFFFF;
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	.u-flex,.item{
		span{
			color: #C0C0C0;
		}
		.imgs-box{
			margin: 20rpx 0;
		}
	}
	.item{
		padding: 20rpx 0;
		box-sizing: border-box;
		line-height: 1.5rem;
	}
	.group{
		margin-top: 40rpx;
		.list{
			margin-top: 20rpx;
			.item{
				padding: 15rpx 0;
				box-sizing: border-box;
				.content{
					margin-left: 20rpx;
				}
			}
		}
	}
}
</style>
