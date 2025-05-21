<template>
    <view class="penalty-info-page">


        <!-- 处罚信息列表 -->
        <view class="penalty-list">
            <uni-card v-for="(penalty, index) in penalties" :key="index" :is-shadow="false">
                <text class="penalty-title">{{ penalty.title }}</text>
                <p class="penalty-item"><text>处罚单位：</text>{{ penalty.authority }}</p>
                <p class="penalty-item"><text>罚款金额：</text>{{ penalty.amount }}元</p>
                <p class="penalty-item"><text>罚款日期：</text>{{ penalty.date }}</p>
                <p class="penalty-item"><text>处罚理由：</text>{{ penalty.reason }}</p>
            </uni-card>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            penalties: [
                {
                    title: '卫生违规罚款',
                    authority: '山东省卫健委',
                    amount: 2000,
                    date: '2025年3月10日',
                    reason: '日常巡检，卫生条件不达标，罚款2000元，引以为戒！'
                },
                {
                    title: '偷税漏税罚款',
                    authority: '税务局',
                    amount: 2000,
                    date: '2025年3月10日',
                    reason: '经营过程中，存在偷税漏税行为，罚款2000元'
                },
                {
                    title: '虚假宣传罚款',
                    authority: '工商局',
                    amount: 2000,
                    date: '2025年3月10日',
                    reason: '经营过程中，存在虚假宣传行为，罚款2000元'
                }
            ]
        };
    },
    methods: {
        goBack() {
            uni.navigateBack();
        }
    }
};
</script>

<style scoped>
.penalty-info-page {
    background-color: #f4f4f4;
}

.penalty-list {
    padding: 10rpx;

}

::v-deep .uni-card {
    margin-bottom: 20rpx;
    border-radius: 30rpx;
}

.penalty-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
    display: block;
    margin-bottom: 30rpx;
    padding-top: 10rpx;
}

.penalty-item {
    display: grid;
    grid-template-columns: 120rpx 1fr;
    font-size: 24rpx;
    color: #333;
    margin-bottom: 10rpx;

}
</style>