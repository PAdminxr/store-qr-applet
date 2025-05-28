<template>
    <view class="gauge-container">
        <!-- 仪表盘 -->
        <uni-ec-canvas class="uni-ec-canvas" ref="canvas" canvas-id="gaugeChart" id="gaugeChart"
            :ec="ec"></uni-ec-canvas>

        <!-- 中间的信用等级圆形背景 -->
        <!-- <view class="center-circle">
            <text class="credit-value">{{ value }}</text>
            <text class="credit-label">信用等级</text>
        </view> -->

        <!-- 上方刻度线和范围指示器
        <view class="scale-lines">
            <view v-for="(item, index) in scaleLabels" :key="index" class="scale-line-container">
                <view class="scale-line"></view>
                <text :class="['range-indicator', { active: isActiveRange(index) }]">{{ item.label }}</text>
            </view>
        </view> -->

        <!-- 底部进度条和标签 -->
        <view class="progress-bar-container">
            <view class="progress-bar">
                <block v-for="(item, index) in progressItems" :key="index">
                    <view :class="[
                        'progress-item',
                        {
                            active: isActive(index),
                            first: index === 0,
                            last: index === progressItems.length - 1,
                        },
                    ]" :style="{
                        backgroundColor: isActive(index) ? item.color : '#D3D3D3',
                    }">
                        <text :class="['label-text', { 'active-text': isActive(index) }]">{{
                            ["较差", "一般", "好", "较好", "极好"][index]
                            }}</text>
                    </view>
                </block>
            </view>
            <view class="progress-numbers">
                <text v-for="(num, idx) in [0, 60, 70, 80, 90, 100]" :key="idx" class="number-text">{{ num }}</text>
            </view>
        </view>
    </view>
</template>

<script>
import uniEcCanvas from "../../components/uni-ec-canvas/uni-ec-canvas.vue";
import * as echarts from "../../components/uni-ec-canvas/echarts";


export default {
    components: {
        uniEcCanvas,
    },
    props: {
        value: {
            type: Number,
            default: 60, // 默认值调整为60更合理
        },
    },
    data() {
        return {
            ec: {
                lazyLoad: true,
                option: {},
            },
            progressItems: [
                { range: [0, 60], color: "#FF4949" },
                { range: [60, 70], color: "#FF913A" },
                { range: [70, 80], color: "#FFC629" },
                { range: [80, 90], color: "#66CC66" },
                { range: [90, 100], color: "#4CAF50" },
            ],
            scaleLabels: [
                { label: '较差', range: [0, 20] },
                { label: '一般', range: [20, 40] },
                { label: '好', range: [40, 60] },
                { label: '较好', range: [60, 80] },
                { label: '极好', range: [80, 100] }
            ],
            creditLevelText: '' // 新增：用于保存信用等级文本


        };
    },

    watch: {
        value(newVal) {
            this.$refs.canvas.init(this.initChart);
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.updateCreditLevel(this.value); // 初始化信用等级文本
            if (this.$refs.canvas) {
                this.$refs.canvas.init(this.initChart);
            }
        });
    },
    methods: {
        updateCreditLevel(value) {
            if (value <= 59) this.creditLevelText = '较差';
            else if (value <= 69) this.creditLevelText = '一般';
            else if (value <= 79) this.creditLevelText = '好';
            else if (value <= 89) this.creditLevelText = '较好';
            else this.creditLevelText = '极好';
        },
        getGradientColorStops(value) {
            const progressItems = this.progressItems;

            let stops = [];

            for (let item of progressItems) {
                const [min, max] = item.range;

                if (value > min) {
                    const startRatio = min / 100;
                    const endRatio = Math.min(value / 100, max / 100);

                    stops.push({ offset: startRatio, color: item.color });

                    if (endRatio < max / 100) {
                        stops.push({ offset: endRatio, color: "#D3D3D3" });
                        break;
                    }
                } else if (value === min && stops.length === 0) {
                    // 特殊情况：值刚好等于某个区间的起点，并且还没有添加任何颜色
                    stops.push({ offset: min / 100, color: item.color });
                    stops.push({ offset: min / 100, color: "#D3D3D3" });
                    break;
                } else {
                    break; // 后面的区间不再匹配
                }
            }

            // 如果还没覆盖到100%，补灰色
            if (stops.length === 0 || stops[stops.length - 1].offset < 1) {
                const lastOffset = stops.length ? stops[stops.length - 1].offset : 0;
                stops.push({ offset: 1, color: "#D3D3D3" });
            }

            return stops;
        },

        initChart(canvas, width, height, canvasDpr) {
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: canvasDpr,
            });
            canvas.setChart(chart);

            const option = {
                // 鼠标悬浮的提示
                tooltip: {
                    formatter: '{b} : {c}'
                },
                series: [
                    {
                        type: 'gauge',
                        min: 0, //最大值
                        max: 100, //最小值
                        startAngle: 200, //仪表盘起始角度。正右手侧为0度，正上方为90度，正左手侧为180度。
                        endAngle: -20, //仪表盘结束角度
                        splitNumber: 5, //仪表盘刻度的分割段数
                        itemStyle: {
                            color: '#f37215', //颜色
                            shadowColor: 'rgba(0,138,255,0.45)', //阴影颜色
                            shadowBlur: 10, //图形阴影的模糊大小
                            shadowOffsetX: 2, //阴影水平方向上的偏移距离
                            shadowOffsetY: 2 //阴影垂直方向上的偏移距离
                        },
                        progress: {
                            show: true, //是否显示进度条
                            roundCap: true, //是否在两端显示成圆形
                            width: 18, //进度条宽度
                            itemStyle: {
                                color: {
                                    type: 'linear',
                                    x: 1,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: '#f12711' // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: '#f5af19' // 100% 处的颜色
                                        }
                                    ],
                                    global: false // 缺省为 false
                                }
                            }
                        },
                        pointer: {
                            show: true, //是否显示指针
                            itemStyle: {
                                color: {
                                    type: 'linear',
                                    x: 1,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: '#f12711' // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: '#f5af19' // 100% 处的颜色
                                        }
                                    ],
                                    global: false // 缺省为 false
                                }
                            }
                        },

                        axisLine: {
                            show: true, //是否显示仪表盘轴线
                            roundCap: true, //是否在两端显示成圆形
                            width: 18,//轴线宽度
                            lineStyle: {
                                color: [

                                    [0.59, '#FF4949'],
                                    [0.69, '#FF913A'],
                                    [0.79, '#FFC629'],
                                    [0.89, '#66CC66'],
                                    [1, '#4CAF50'],
                                ]
                            }
                        },

                        axisTick: {
                            show: true, //是否显示刻度
                            distance: -29,
                            itemStyle: {
                                color: '#fff',
                                width: 2
                            }
                        },
                        splitLine: {
                            show: true, //是否显示分隔线
                            distance: -30
                        },
                        axisLabel: {
                            show: false, //是否显示标签
                            distance: -10
                        },
                        title: {
                            show: true, //是否显示标题
                            fontSize: 20
                        },
                        detail: {
                            show: true, //是否显示详情
                            valueAnimation: true, //是否开启标签的数字动画
                            borderRadius: 8, //文字块的圆角
                            offsetCenter: [0, '60%'], //相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比
                            fontSize: 50, //文字的字体大小
                            fontWeight: 'bolder', //文字字体的粗细
                            formatter: (value) => {
                                return `{value|${value}}\n{name|信用${this.creditLevelText}}`;
                            },
                            rich: {
                                name: {
                                    fontSize: 18,
                                    padding: [5, 0]
                                },
                                value: {
                                    fontSize: 38,
                                    fontWeight: 'bold',
                                }
                            },
                            color: 'auto' //文本颜色
                        },
                        data: [
                            {
                                value: this.value
                            }
                        ]
                    }
                ]
            };

            chart.setOption(option);
            return chart;
        },
        isActive(index) {
            const currentValue = this.value;
            const currentItem = this.progressItems[index];
            if (index < this.progressItems.length - 1) {
                // 不是最后一个区间
                return (
                    currentValue >= currentItem.range[0] &&
                    currentValue < currentItem.range[1]
                );
            } else {
                // 最后一个区间
                return (
                    currentValue >= currentItem.range[0] &&
                    currentValue <= currentItem.range[1]
                );
            }
        },
    },
};
</script>
<style scoped>
.gauge-container {
    position: relative;
}

.uni-ec-canvas {
    width: 100%;
    height: 500rpx;
    display: block;
    margin-top: 30rpx;
}

.center-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 180rpx;
    height: 180rpx;
    background: linear-gradient(180deg, #a6a09c, #412a1b);
    border-radius: 50%;
    text-align: center;
    padding: 20rpx;
    box-sizing: border-box;
    color: #ffc282;
}

.credit-value {
    font-size: 40rpx;
    display: block;
}

.credit-label {
    font-size: 24rpx;
    display: block;
}

.scale-lines {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 80%;
    top: 45%;
    left: 10%;
    z-index: 1;
}

.scale-line-container {
    text-align: center;
}

.scale-line {
    width: 1px;
    height: 15px;
    background-color: #bb9477;
    margin-bottom: 5px;
}

.range-indicator {
    font-size: 24rpx;
    color: #808080;
    display: none;
}

.range-indicator.active {
    display: block;
    color: #bb9477;
}

.progress-bar-container {
    margin-top: 40rpx;
    text-align: center;
    padding: 0 60rpx;
    /* 添加左右间距 */
}

.progress-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.progress-item {
    width: 18%;
    height: 40rpx;
    position: relative;
    margin: 0 10rpx;
}

.first {
    border-radius: 30rpx 0 0 15px;
}

.last {
    border-radius: 0 15px 15px 0;
}

.active {
    box-shadow: 0 0 10px rgba(244, 230, 193, 0.8);
    height: 50rpx;
}

.label-text {
    font-size: 24rpx;
    color: #808080;
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
}

.active-text {
    color: #bb9477;

}

.progress-numbers {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
}

.number-text {
    font-size: 24rpx;
    color: #000000;
}
</style>