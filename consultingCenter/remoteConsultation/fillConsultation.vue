<template>
  <view class="page">
    <u-form :model="consultForm" ref="consultFormRules" label-width="150">
			<u-form-item label="患者" prop="name">
				<!-- <u-input v-model="form.name" type="select" /> -->
				<u-input type="select" :select-open="selectShow" v-model="consultForm.name" placeholder="请选择商品类型" @click="selectShow = true"></u-input>
			</u-form-item>
			<u-form-item label="会诊病种" prop="type">
				<u-input v-model="consultForm.type"  placeholder="请填写会诊病种"/>
			</u-form-item>
			<u-form-item label="病情摘要" prop="intr">
				<u-input v-model="consultForm.intr" type="textarea" placeholder="请填写病情摘要"/>
			</u-form-item>
			<u-form-item label="上传图片" prop="photo">
				<u-upload width="160" height="160"></u-upload>
			</u-form-item>
			<u-form-item label="会诊时间" prop="time">
				<u-input v-model="consultForm.time" disabled placeholder="请选择会诊时间" @click="this.timeStatus=true"/>
			</u-form-item>
			<u-form-item label="会诊目的" prop="aim">
				<u-input v-model="consultForm.aim" placeholder="请填写会诊目的"/>
			</u-form-item>
			<u-form-item label="会诊要求" prop="require">
				<u-input v-model="consultForm.require" type="textarea" placeholder="请填写会议要求，如拟邀请的专家、其他备注事项（不超过100字）" />
			</u-form-item>
		</u-form>
		<view class="btns">
			<u-button type="primary" shape="circle" @click="submitFrom">提交</u-button>
		</view>
		<!-- 选择病患底部弹框 -->
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<!-- 选择时间范围 -->
		<selectDateTime :status="timeStatus" @timePopupClose="timePopupClose" @timePopupSure="timePopupSure"></selectDateTime>
  </view>
</template>

<script>
import selectDateTime from '../../components/selectDateTime.vue'
export default {
	components:{selectDateTime},
  data() {
    return {
      consultForm:{
				name:'',
				type:'',
				intr:'',
				photo:'',
				time:'',
				aim:'',
				require:''
			},
			selectShow: false,//控制选择病患弹框
			timeStatus:false,//控制选择时间范围弹框
			//病患数组
			selectList:[
				{
					value: '高陵 女 45岁',
					label: '高陵 女 45岁'
				},
				{
					value: '李明 女 36岁',
					label: '李明 女 36岁'
				},
				{
					value: '张三 男 21岁',
					label: '张三 男 21岁'
				}
			],
    };
  },
	//页面首次加载触发
	onLoad() {
		
	},
	//页面打开触发
	onShow() {
		
	},
  methods: {
    selectConfirm(e){
			this.consultForm.name = '';
			e.map((val, index) => {
				this.consultForm.name += this.consultForm.name == '' ? val.label : '-' + val.label;
			})
			// console.log('选择的病患',e)
		},
		timePopupClose(value){
			this.timeStatus=value;
		},
		timePopupSure(res,status){
			this.timeStatus=status;
			this.consultForm.time=res.startTime+"至"+res.endTime;
		}
  }
};
</script>

<style lang="scss" scoped>
.page{
	background: #FFFFFF;
	padding: 10rpx 30rpx;
	box-sizing: border-box;
	.btns{
		margin-top: 60rpx;
	}
}
</style>
