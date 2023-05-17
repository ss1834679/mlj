<template>
	<view class="page">
		<view class="search-box"><u-search placeholder="搜索患者姓名" shape="round" :clearabled="true" :show-action="false" input-align="center" v-model="keyword"></u-search></view>
		<view class="tabs-box"><u-tabs :list="tabslist" :is-scroll="false" :current="tabsCurrent" @change="tabsChange"></u-tabs></view>
		<view class="group">
			<view class="u-border-bottom">
				<u-gap height="20" bg-color="#fff"></u-gap>
				<view class="u-flex u-row-between">
					<p>会诊时间：2020-12-17 15:00-16:00</p>
					<p class="red">待接诊</p>
				</view>
				<view class="u-flex">
					<u-avatar size="100" src="/static/img/doctor-female.png"></u-avatar>
					<view class="u-flex-1 main">
						<view class="name">
							<span>陈丹 女 35岁</span>
						</view>
						<view>病种：肠癌</view>
						<view>专家：心海、无忧、心海、无忧、心海、无忧</view>
					</view>
					<view class="btns">
						<u-button type="info" size="medium" plain>查看</u-button>
					</view>
				</view>
			</view>
			<view class="u-border-bottom">
				<u-gap height="20" bg-color="#fff"></u-gap>
				<view class="u-flex u-row-between">
					<p>会诊时间：2020-12-17 15:00-16:00</p>
					<p class="red">待接诊</p>
				</view>
				<view class="u-flex">
					<u-avatar size="100" src="/static/img/doctor-female.png"></u-avatar>
					<view class="u-flex-1 main">
						<view class="name">
							<span>陈丹 女 35岁</span>
						</view>
						<view>病种：肠癌</view>
						<view>专家：心海、无忧、心海、无忧、心海、无忧</view>
					</view>
					<view class="btns">
						<u-button type="info" size="medium" plain>查看</u-button>
					</view>
				</view>
			</view>
			<view class="u-border-bottom">
				<u-gap height="20" bg-color="#fff"></u-gap>
				<view class="u-flex u-row-between">
					<p>会诊时间：2020-12-17 15:00-16:00</p>
					<p class="blue">待接诊</p>
				</view>
				<view class="u-flex">
					<u-avatar size="100" src="/static/img/doctor-female.png"></u-avatar>
					<view class="u-flex-1 main">
						<view class="name">
							<span>陈丹 女 35岁</span>
						</view>
						<view>病种：肠癌</view>
						<view>专家：心海、无忧、心海、无忧、心海、无忧</view>
					</view>
					<view class="btns">
						<u-button type="info" size="medium" plain>查看</u-button>
					</view>
				</view>
			</view>
		</view>
		<u-gap height="20" bg-color="#fff"></u-gap>
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			keyword: '',
			tabslist: [
				{
					name: '全部'
				},
				{
					name: '进行中'
				},
				{
					name: '待接收',
					// count: 5
				},
				{
					name: '待会诊',
					// count: 5
				},
				{
					name: '已拒绝',
					// count: 5
				}
			],
			tabsCurrent: 0,
			//底部加载更多组件
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
		tabsChange(index) {
			this.tabsCurrent = index;
		}
	}
};
</script>

<style lang="scss" scoped>
	.page{
		padding: 30rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		.group {
			.u-flex {
				padding: 10rpx 0;
				box-sizing: border-box;
			}
			.btns {
				text-align: center;
				line-height: 1rem;
				p {
					margin-bottom: 10rpx;
				}
				.blue {
					color: #00bfff;
				}
				.red {
					color: #ff5555;
				}
			}
			.main {
				margin: 15rpx 0 15rpx 15rpx;
				.name {
					span {
						margin-right: 10rpx;
					}
				}
				.price {
					span {
						font-weight: 600;
					}
				}
			}
		}
	}

</style>
