<template>
  <view class="page">
		<u-gap height="20" bg-color="#f7f8fa"></u-gap>
		<view class="u-flex info">
			<view class="desc">
				<u-tag text="进行中" type="success" />
				<u-tag text="待接受" type="error" />
				<u-tag text="待会诊" type="primary" />
				<u-tag text="已完成" type="info" />
				<p>陈丹    女   35岁</p>
				<p>会诊时间：2020-12-12 09:12:21~09:12:21</p>
			</view>
		</view>
		<u-gap height="20" bg-color="#f7f8fa"></u-gap>
		<view class="detail">
			<view class="u-flex u-row-between">
				<p>会诊病种：</p>
				<span>肠癌</span>
			</view>
			<view class="u-flex u-row-between">
				<p>病情摘要：</p>
				<span>病情摘要病情摘要病情摘要病情摘要病情摘要</span>
			</view>
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
			<view class="u-flex u-row-between">
				<p>会诊医院：</p>
				<span>会诊医院会诊医院会诊医院会诊医院会诊医院</span>
			</view>
			<view class="u-flex u-row-between">
				<p>会诊目的：</p>
				<span>会诊目的会诊目的会诊目的会诊目的会诊目的</span>
			</view>
			<view class="u-flex u-row-between">
				<p>会诊要求：</p>
				<span>会诊要求会诊要求会诊要求会诊要求</span>
			</view>
			<!-- 已拒绝的时候不显示专家列表 -->
			<view class="group">
				<u-section title="专家列表" :right="false" :show-line="false"></u-section>
				<view class="list">
					<view class="u-flex item u-border-bottom">
						<u-avatar size="80" src="/static/img/doctor-female.png" />
						<view class="content u-flex-1">
							<p>王林</p>
							<p>南充身心医院 精神科/心理科</p>
						</view>
						<!-- 已完成的时候显示 -->
						<u-button type="info" size="mini" shape="circle" plain @click="consultationOpinion">会诊意见</u-button>
					</view>
					<view class="u-flex item u-border-bottom">
						<u-avatar size="80" src="/static/img/doctor-female.png" />
						<view  class="content u-flex-1">
							<p>王林</p>
							<p>南充身心医院 精神科/心理科</p>
						</view>
						<!-- 已完成的时候显示 -->
						<u-button type="info" size="mini" shape="circle" plain @click="consultationOpinion">会诊意见</u-button>
					</view>
					<view class="u-flex item u-border-bottom">
						<u-avatar size="80" src="/static/img/doctor-female.png" />
						<view  class="content u-flex-1">
							<p>王林</p>
							<p>南充身心医院 精神科/心理科</p>
						</view>
						<!-- 已完成的时候显示 -->
						<u-button type="info" size="mini" shape="circle" plain @click="consultationOpinion">会诊意见</u-button>
					</view>
				</view>
			</view>
		</view>
		<!-- 已拒绝的时候不显示按钮组 -->
		<u-gap height="20" bg-color="#f7f8fa"></u-gap>
		<view class="u-flex bottom u-row-right">
			<!-- 进行中 -->
			<!-- <u-button class="btns" type="primary" size="medium" plain>进入会诊</u-button> -->
			<!-- 待接受 -->
			<!-- <u-button class="btns" type="primary" size="medium" plain @click="refuseConsulte">拒绝会诊</u-button>
			<u-button class="btns" type="primary" size="medium" plain>接受会诊</u-button> -->
			<!-- 待会诊 -->
			<u-button class="btns" type="primary" size="medium" plain>开始会诊</u-button> 
		</view>
		
		<u-modal v-model="refuseShow" content="请确认是否拒绝本次会诊申请" :show-cancel-button="true" @confirm="confirmRefuse"></u-modal>
		<!-- 会诊意见弹窗 -->
		<expertOpinionsPopup :status="expertStatus" :popupType="false" doctorMessage='建议住院治疗' @popupClose="expertPopupClose"/>
  </view>
</template>

<script>
	import expertOpinionsPopup from "./components/expertOpinionsPopup.vue"
export default {
	components:{expertOpinionsPopup},
  data() {
    return {
      refuseShow:false,
			expertStatus:false
    };
  },
	//页面首次加载触发
	onLoad() {
		
	},
	//页面打开触发
	onShow() {
		
	},
  methods: {
		//点击拒绝会诊按钮
    refuseConsulte(){
			this.refuseShow=true;
		},
		//点击确认拒绝会诊弹框按钮
		confirmRefuse(){
			this.refuseShow=false;
		},
		//点击会诊意见按钮
		consultationOpinion(){
			this.expertStatus=true;
		},
		expertPopupClose (val){
			this.expertStatus=val;
		}
  }
};
</script>

<style lang="scss" scoped>
	.page{
		background: #FFFFFF;

		.info{
			padding: 30rpx 20rpx;
			box-sizing: border-box;
			.desc{
				margin-left: 15rpx;
				line-height: 1.5rem;
				font-size: 26rpx;
			}
		}
		.detail{
			padding: 30rpx 20rpx;
			box-sizing: border-box;
			line-height: 1.5rem;
			font-size: 26rpx;
			span{
				color: #909090;
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
		.bottom{
			background: #f7f8fa;
			padding: 0 30rpx;
			box-sizing: border-box;
			.btns{
				margin-left: 20rpx;
			}
		}
	}

</style>
