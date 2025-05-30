<template>
    <view class="container">
        <!-- 标签页 -->
        <!-- <view class="tabs">
            <view class="tab-item" :class="{ active: currentTab === 'info' }" @click="switchTab('info')">站内消息</view>
            <view class="tab-item" :class="{ active: currentTab === 'gonggao' }" @click="switchTab('gonggao')">系统公告
            </view>
        </view> -->
        <view class="tab-bar">
            <view v-for="(tab, index) in tabs" :key="index" :class="['tab-item', { active: currentTab === index }]"
                @click="switchTab(index)">
                {{ tab }}
            </view>
        </view>

        <!-- 消息列表 -->
        <scroll-view scroll-y="true" class="message-list">
            <block v-if="currentTab === 0">
                <view class="message-item" v-for="(item, index) in siteMessages" :key="index"
                    @click="handleClick(item)">
                    <view>
                        <image class="icon-placeholder" :src="item.icon" mode="aspectFill"></image>
                        <uni-badge v-if="item.value > 100" class="uni-badge-left-margin" :text="item.value"
                            absolute="rightTop" :offset="[30, -42]" size="normal">

                        </uni-badge>
                        <uni-badge v-else class="uni-badge-left-margin" :text="item.value" absolute="rightTop"
                            :offset="[15, -42]" size="normal"> </uni-badge>
                    </view>
                    <view class="message-content">
                        <view class="title-view">
                            <view class="title-info">
                                <view class="title">{{ item.title }}</view>
                                <view class="tag-view" v-if="item.tag">
                                    <uni-tag text="官方" type="error" :inverted="true" size="mini" />
                                </view>
                            </view>
                            <view class="time">{{ item.time }}</view>
                        </view>

                        <view class="description">{{ item.description }}</view>
                    </view>

                </view>
            </block>
            <block v-else>
                <view class="message-item" v-for="(item, index) in systemAnnouncements" :key="index"
                    @click="handleClick(item)">
                    <view>
                        <image class="icon-placeholder" :src="item.icon" mode="aspectFill"></image>

                    </view>
                    <view class="message-content">
                        <view class="title-view">
                            <view class="title-info">
                                <view class="title">{{ item.title }}</view>
                            </view>
                            <view class="time">{{ item.time }}</view>
                        </view>

                        <view class="description">{{ item.description }}</view>
                    </view>

                </view>

            </block>
        </scroll-view>
    </view>
</template>

<script>
import mockDATA from "@/utils/mock.js";
export default {
    data() {
        return {
            currentTab: 0,
            tabs: ['站内消息', '系统公告'],
            siteMessages: mockDATA.siteMessages,
            systemAnnouncements: mockDATA.systemAnnouncements,
        };
    },
    methods: {
        onClickItem(index) {
            if (this.current !== index) {
                this.current = index;
            }
        },
        switchTab(tab) {
            this.currentTab = tab;
        },
        handleClick(item) {
            //根据id修改mockdtad的value 
            if (this.currentTab === 0) {
                const index = this.siteMessages.findIndex(message => message.id === item.id);
                if (index !== -1) {
                    this.siteMessages[index].value -= 1;
                }
            }
            else {
                const index = this.systemAnnouncements.findIndex(message => message.id === item.id);
                if (index !== -1) {
                    this.systemAnnouncements[index].value -= 1
                }
            }
            uni.navigateTo({
                url: `/izaozixunpages/message/detail?id=${item.id}`
            });

        }
    }
};
</script>

<style scoped lang="scss">
.container {
    padding: 40rpx;
    background-color: #ffffff;
}



/* Tab栏样式 */
.tab-bar {
    display: flex;
    background-color: white;
    gap: 40rpx;
    padding: 0rpx 20rpx 25rpx 20rpx;
}

.tab-item {
    position: relative;
    padding: 10rpx 20rpx;
    font-size: 32rpx;
    color: #929292;
    transition: all 0.3s ease;
}

.tab-item.active {
    color: #000000;
    font-weight: bold;
}

.tab-item.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 8rpx;
    background-color: #020202;
    border-radius: 20rpx;
}

.message-list {
    height: calc(100vh - 100rpx);
}

.message-item {
    display: flex;
    align-items: center;
    padding: 40rpx 0;
    border-bottom: 1rpx solid #ebebeba6;
}

.icon-placeholder {
    width: 100rpx;
    height: 100rpx;
    margin-right: 20rpx;
}

.message-content {
    flex: 1;
    padding-left: 10rpx;
    width: 80%;

    .title-view {
        display: flex;
        align-items: end;
        justify-content: space-between;

    }

    .title-info {
        display: flex;
        flex-direction: row;

        gap: 20rpx;



    }
}

.title {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
    // margin-bottom: 10rpx;
}

.description {
    font-size: 26rpx;
    color: #999;
    margin-top: 25rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}

.time {
    font-size: 22rpx;
    color: #999;
}

::v-deep .uni-tag--mini {
    // padding: 0 0 !important;
    font-size: 20rpx !important;
    display: flex;
}
</style>