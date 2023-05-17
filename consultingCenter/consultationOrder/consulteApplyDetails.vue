<template>
	<view class="page">
		<view class="top-title u-flex u-row-between">
			<p>陈思思</p>
			<p class="date">2020-10-22 10:10:10</p>
		</view>
		<view class="content">
			最新心情老是很烦躁，不知道该怎么办？最新心情老是很烦躁，不知道该怎么办？最新心情老是很烦躁，不知道该怎么办？最新心情老是很烦躁，不知道该怎么办？最新心情老是很烦躁，不知道该怎么办？最新心情老是很烦躁，不知道该怎么办？
		</view>
		<u-gap height="20" bg-color="#f7f8fa"></u-gap>
		<view class="card">
			<view class="card-item">
				<view class="item-top u-flex u-row-between">
					<view>
						<p class="title">测测你教育孩子的风格（PBI）</p>
						<p>测评时间：2020-09-18 18:02:00</p>
						<p>时长：41秒</p>
					</view>
					<span>正常</span>
				</view>
				<view class="u-flex u-row-between btns">
					<u-button size="mini" type="error" shape="circle" plain>处理</u-button>
					<u-button size="mini" type="primary" shape="circle" plain>查看</u-button>
					<u-button size="mini" type="info" shape="circle" plain>联系</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	//页面首次加载触发
	onLoad() {},
	//页面打开触发
	onShow() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
	.page{
		background: #FFFFFF;
		.top-title{
			padding: 20rpx 30rpx 0 30rpx;
			box-sizing: border-box;
			.date {
				color: #999999;
				font-size: 24rpx;
			}
		}
		.content{
			padding: 20rpx 30rpx;
			box-sizing: border-box;
		}
		.card{
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			.card-item{
				.item-top{
					.title{
						font-weight: 28rpx;
						font-weight: bolder;
					}
					span{
						color: #00BFFF;
					}
				}
				.btns{
					margin-top: 20rpx;
				}
			}
		}
	}

</style>
