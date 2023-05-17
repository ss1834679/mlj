<template>
	<view class="page">
		<view class="search-box"><u-search placeholder="搜索患者姓名" shape="round" :clearabled="true" :show-action="false" input-align="center" v-model="keyword"></u-search></view>
		<view class="tabs-box"><u-tabs :list="tabslist" :is-scroll="false" :current="tabsCurrent" @change="tabsChange"></u-tabs></view>
		<view class="group">
			<view class="u-border-bottom item">
				<view class="u-flex u-row-between">
					<p>陈思思</p>
					<p class="date">2020-10-22 10:10:10</p>
				</view>
				<view>
					最新心情老是很烦躁，不知道该怎么办？
				</view>
				<view class="u-flex u-row-between end">
					<span>删除</span>
					<u-button size="mini" type="primary" plain>开具量表</u-button>
				</view>
			</view>
			<view class="u-border-bottom item">
				<view class="u-flex u-row-between">
					<p>陈思思</p>
					<p class="date">2020-10-22 10:10:10</p>
				</view>
				<view>
					最新心情老是很烦躁，不知道该怎么办？
				</view>
				<view class="u-flex u-row-between end">
					<span>删除</span>
					<u-button size="mini" type="error" plain>待交费</u-button>
					<u-button size="mini" type="info" plain>查看</u-button>
				</view>
			</view>
			<view class="u-border-bottom item">
				<view class="u-flex u-row-between">
					<p>陈思思</p>
					<p class="date">2020-10-22 10:10:10</p>
				</view>
				<view>
					最新心情老是很烦躁，不知道该怎么办？
				</view>
				<view class="u-flex u-row-between end">
					<span>删除</span>
					<u-button size="mini" type="success" plain>已交费</u-button>
				</view>
			</view>
			<view class="u-border-bottom item">
				<view class="u-flex u-row-between">
					<p>陈思思</p>
					<p class="date">2020-10-22 10:10:10</p>
				</view>
				<view>
					最新心情老是很烦躁，不知道该怎么办？
				</view>
				<view class="u-flex u-row-between end">
					<span>删除</span>
					<u-button size="mini" type="info" plain>查看</u-button>
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
					name: '待处理'
				},
				{
					name: '已处理'
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
			.item{
				padding: 20rpx 0;
				line-height: 1.5rem;
				.date{
					color: #999999;
					font-size: 24rpx;
				}
				.end{
					margin-top: 30rpx;
				}
			}
			.u-flex{
				span{
					color: #ff5555;
				}
			}
		}
	}

</style>
