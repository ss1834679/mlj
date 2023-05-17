<template>
  <view class="page">
    <view class="u-flex u-row-around header">
    	<p>问诊类型:图文问诊</p>
			<p>￥50</p>
			<view class="bule">待接诊</view>
    </view>
		<u-gap height="20" bg-color="#f7f8fa"></u-gap>
		<view class="u-flex info">
			<u-avatar size="100" src="/static/img/doctor-female.png"></u-avatar>
			<view class="desc">
				<p>陈丹    女   35岁</p>
				<p>173****5665</p>
			</view>
		</view>
		<u-gap height="20" bg-color="#f7f8fa"></u-gap>
		<view class="detail">
			<u-section title="订单详情" :right="false" :show-line="false"></u-section>
			<p>订单编号：2012569771268</p>
			<p>支付时间：2020-12-12 10:02</p>
			<p>应付金额：50.00元</p>
			<p>实付金额：50.00元</p>
			<p>实付金额：50.00元</p>
			<p>支付方式：微信支付</p>
		</view>
		<u-gap height="20" bg-color="#f7f8fa"></u-gap>
		<view class="bottom">
			<u-button type="primary" size="medium" plain>接诊</u-button>
		</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
	//页面首次加载触发
	onLoad() {
		
	},
	//页面打开触发
	onShow() {
		
	},
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
	.page{
		background: #FFFFFF;
		.header{
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			font-weight: bolder;
			.bule{
				color: #00BFFF;
			}
		}
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
		}
		.bottom{
			text-align: end;
			background: #f7f8fa;
			padding: 0 30rpx;
			box-sizing: border-box;
		}
	}

</style>
