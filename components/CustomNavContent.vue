<template>
    <view class="nav-container" :style="{
        height: customBarHeight + 'px',
        paddingTop: statusBarHeight + 'px',
        backgroundColor: background,
        color: color
    }">
        <!-- 中间内容区域 -->
        <view class="center-content">
            <view class="search-bar-container">

                <my-icon type="location" size="24rpx" color="#333" />

                <picker mode="selector" :range="array" :value="index" @change="bindPickerChange">
                    <view class="uni-input">{{ array[index] }}</view>
                </picker>

                <uni-icons type="down" size="26rpx" color="#333" @click="bindPickerChange" />
            </view>

            <view class="search-bar" @click="onSearchConfirm">
                <uni-search-bar placeholder="枣庄辣子鸡" clearButton="none" cancelButton="none" :readonly="true">

                    <uni-icons slot="searchIcon" color="black" size="36rpx" type="search" />
                </uni-search-bar>
            </view>
        </view>
    </view>
</template>

<script>

import myIcon from '@/components/myIcon.vue'
export default {
    components: {
        myIcon
    },
    name: 'CustomNavBarWithSearch',
    props: {
        // 标题
        title: {
            type: String,
            default: ''
        },
        // 背景颜色
        background: {
            type: String,
            default: 'transparent'
        },
        // 字体颜色
        color: {
            type: String,
            default: '#333333'
        },

        // 当前选择索引
        index: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            statusBarHeight: 0,
            customBarHeight: 0,
            array: ['台儿庄区', '山亭区', '峄城区', '市中区', '滕州市', '薛城区']
        };
    },
    mounted() {
        uni.getSystemInfo({
            success: (res) => {
                this.statusBarHeight = res.statusBarHeight;

                if (res.customBarHeight) {
                    this.customBarHeight = res.customBarHeight;
                } else {
                    this.customBarHeight = res.statusBarHeight + 44;
                }
            }
        });
    },
    methods: {
        handleLeft() {
            this.$emit('left-click');
        },
        bindPickerChange(e) {
            this.$emit('picker-change', e);
        },
        onSearchConfirm() {
            this.$emit('search');
        }
    }
};
</script>

<style scoped>
.nav-container {
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding: 0 30rpx; */
    box-sizing: border-box;
    font-size: 28rpx;
}




.center-content {
    flex: 1;
    display: flex;
    /* justify-content: flex-end; */
    margin-left: 24rpx;
    justify-content: flex-start;
    /* padding-left: 20px; */
}

.search-bar-container {
    display: flex;
    align-items: center;
    /* gap: 10rpx; */
    flex-shrink: 0;
    max-width: 50%;
    white-space: nowrap;
}

.search-bar-container picker .uni-input {
    font-size: 28rpx;
    padding: 0 10rpx;


    color: #333333;
}

.search-bar {
    /* flex: 1; */
    min-width: 47%;
    max-width: 80%;
}

::v-deep .uni-icons {
    color: #333333 !important;
}

::v-deep .uni-searchbar__text-placeholder {
    font-size: 24rpx !important;
}
</style>