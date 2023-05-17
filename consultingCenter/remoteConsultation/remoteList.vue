<template>
	<view class="page">
		<view class="u-flex u-row-between">
			<u-button type="primary" size="medium" shape="square" plain @click="goToPage(1)">发起会诊</u-button>
			<u-button type="warning" size="medium" shape="square" plain @click="goToPage(2)">发起记录</u-button>
		</view>
		<u-gap height="10" color="#fff"></u-gap>
		<u-section title="进行中的会诊" sub-title="查看更多" @click="goToPage(3)"></u-section>
		<u-gap height="10" color="#fff"></u-gap>
		<view class="group">
			<view class="item">
				<view class="u-flex u-row-between u-border-bottom item-top">
					<p>2020-12-17 15:00-16:00</p>
					<span>进行中</span>
				</view>
				<view class="u-flex u-row-between text">
					<view class="content">
						<p>患者信息：王林 女 45岁</p>
						<p>会诊病种：肠癌</p>
						<p>领衔专家：心海无忧、心海无忧、心海无忧</p>
					</view>
					<u-button type="primary" size="mini" shape="square">发起会诊</u-button>
				</view>
			</view>
			<view class="item">
				<view class="u-flex u-row-between u-border-bottom item-top">
					<p>2020-12-17 15:00-16:00</p>
					<span>待会诊</span>
				</view>
				<view class="u-flex u-row-between text">
					<view class="content">
						<p>患者信息：王林 女 45岁</p>
						<p>会诊病种：肠癌</p>
						<p>领衔专家：心海无忧、心海无忧、心海无忧</p>
					</view>
					<u-button type="primary" size="mini" shape="square">发起会诊</u-button>
				</view>
			</view>
			<view class="item">
				<view class="u-flex u-row-between u-border-bottom item-top">
					<p>2020-12-17 15:00-16:00</p>
					<span>待接受</span>
				</view>
				<view class="u-flex u-row-between text">
					<view class="content">
						<p>患者信息：王林 女 45岁</p>
						<p>会诊病种：肠癌</p>
						<p>领衔专家：心海无忧、心海无忧、心海无忧</p>
					</view>
					<u-button type="primary" size="mini" shape="square">发起会诊</u-button>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			//加载更多
			status: 'loadmore',
			iconType: 'flower',
			loadText: {
				loadmore: '上拉加载更多',
				loading: '努力加载中',
				nomore: '实在没有了'
			}
		};
	},
	//页面首次加载触发
	onLoad() {},
	//页面打开触发
	onShow() {},
	methods: {
		goToPage(val){
			switch (val){
				case 1:
				//发起会诊
				uni.navigateTo({
					url:'./fillConsultation'
				})
					break;
				case 2:
				//发起记录
				uni.navigateTo({
					url:'./consultateRecord'
				})
					break;
				case 3:
				//查看更多->会诊列表
				uni.navigateTo({
					url:'./consultationList'
				})
					break;
				default:
					break;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	background: #ffffff;
	.u-flex {
		margin: 15rpx 0;
	}
	.group {
		.item {
			border: 2rpx solid #f7f8fa;
			border-radius: 20rpx;
			margin: 15rpx 0;
			.item-top {
				padding: 20rpx;
				box-sizing: border-box;
				p {
					color: #999;
				}
			}
			.text {
				padding: 20rpx;
				box-sizing: border-box;
			}
		}
	}
}
</style>
