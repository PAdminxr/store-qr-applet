<template>
    <view>
        <view class="penalty-info">

            <view class="penalty-info-desc">榴花分</view>
        </view>
        <view class="penalty-info-content">

            <!-- #ifdef H5 -->
            <gauge-charth5 :value="value" />
            <!-- #endif -->

            <!-- #ifndef H5 -->
            <gauge-chart :value="value" />
            <!-- #endif -->



        </view>


    </view>
</template>

<script>
import GaugeChart from '@/components/gauge-chart/gauge-chart.vue'
import GaugeCharth5 from '@/components/gauge-chart/gauge-charth5.vue'

export default {
    components: {
        GaugeChart,
        GaugeCharth5
    },
    data() {
        return {
            value: 60
        }
    },
    onLoad(options) {
        if (options.id && options.score) {
            this.value = parseInt(options.score);
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
.penalty-info {
    padding: 20rpx;

    .penalty-info-desc {
        font-size: 38rpx;
        color: #333;
        margin-top: 40rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
}

.penalty-info-content {
    margin-top: -40rpx;
}
</style>