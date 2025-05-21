<template>
    <view class="search-page">
        <!-- 顶部搜索栏 -->
        <view class="header" :style="{ paddingTop: statusBarHeight + 'rpx' }">
            <view class="bar-container">
                <view class="search-bar-container" @click="goBack">
                    <uni-icons type="back" size="24"></uni-icons>
                </view>

                <view class="search-container">
                    <view class="search-box">
                        <uni-search-bar placeholder="搜一搜吧~" clearButton="none" cancelButton="none" :radius="100"
                            v-model="searchKeyword" class="search-input">
                        </uni-search-bar>
                        <button class="search-button" @click="search">搜索</button>
                    </view>
                </view>
            </view>


        </view>
        <!-- 历史搜索记录 -->
        <view class="history-search" v-if="historySearchList && historySearchList.length > 0">
            <text class="title">历史搜索</text>
            <view class="history-list">
                <view class="history-item" v-for="(item, index) in historySearchList" :key="index"
                    @click="selectHistory(item)">
                    <text class="text">{{ item }}</text>
                </view>
            </view>
        </view>

    </view>

</template>

<script>
export default {
    name: "searchPage", // 组件命名，与页面文件名呼应
    data() {
        return {
            statusBarHeight: 0,
            searchKeyword: "",
            // 模拟历史搜索记录数据，实际可从本地存储等获取
            historySearchList: [
                "辣子鸡",
                "微山湖烤鱼",
                "台儿庄古城",
                "铁锅炖",
                "全季酒店",
            ],
        };
    },
    onLoad() {
        uni.getSystemInfo({
            success: (res) => {
                this.statusBarHeight = res.statusBarHeight;
            },
        });
        const historyList = uni.getStorageSync("historySearchList");
        if (historyList) {
            this.historySearchList = historyList;
        }


    },
    methods: {
        // 点击返回按钮逻辑
        goBack() {
            uni.navigateBack();
        },
        // 点击搜索按钮逻辑
        search() {
            if (this.searchKeyword.trim() !== "") {
                this.addToHistory(this.searchKeyword);
                uni.showToast({
                    title: "暂无更多数据...",
                    icon: "none",
                    duration: 2000,
                });
            }
            this.searchKeyword = "";
        },
        // 点击历史搜索记录项逻辑
        selectHistory(keyword) {
            this.searchKeyword = keyword;
            // 同样可以在这里添加搜索逻辑
            console.log("选择历史搜索关键词:", keyword);
        },
        // 将关键词添加到历史搜索记录（简单去重）
        addToHistory(keyword) {
            if (!this.historySearchList.includes(keyword)) {
                this.historySearchList.unshift(keyword);
            }
            // 限制历史记录数量，假设最多保留10条
            if (this.historySearchList.length > 10) {
                this.historySearchList.pop();
            }
            // 实际开发中可将历史记录保存到本地存储
            uni.setStorageSync("historySearchList", this.historySearchList);
        },
    },
};
</script>

<style scoped lang="scss">
.search-page {
    background-color: #ffffff;
    height: 100vh;
}

.header {
    width: 100%;

    .zixun {
        font-size: 48rpx;
        color: #000000;
        font-weight: 600;
    }

    .search-bar-container {
        z-index: 20;
    }

    .search-container {

        width: 90%;

    }

    .search-box {
        position: relative;
        width: 80%;

    }


    .search-input ::v-deep.uni-searchbar__box {
        padding-right: 160rpx;
        border-radius: 100rpx;
        box-sizing: border-box;
    }

    .search-button {
        position: absolute;
        right: 20rpx;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 24rpx;
        font-size: 24rpx;
        color: white;
        background: linear-gradient(to right, #fea518, #fe7b18);
        border-radius: 40rpx;
        z-index: 200;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .bar-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding-top: 40rpx;
        margin: 0rpx 30rpx;


        @media (max-width: 350px) {
            width: 82%;

        }
    }


    /* 确保 uni-search-bar 不占据整个宽度 */
    uni-search-bar {
        flex-grow: 1;
    }

    .search-button {
        height: 30px;
        padding: 0 30rpx;

        background: linear-gradient(to right, #fea518, #fe7b18);
        color: white;
        border: none;
        border-radius: 40rpx;
        z-index: 20;
        position: absolute;
        font-size: 24rpx;
        display: flex;
        align-items: center;
        right: 34rpx;
    }

    /* 如果需要进一步调整 uni-search-bar 的样式 */
    uni-search-bar input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
}

.search-bar {
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 40rpx;
    padding: 0 20rpx;
    margin-bottom: 40rpx;
}

.back-icon {
    margin-right: 20rpx;
}

.back-icon image {
    width: 40rpx;
    height: 40rpx;
}

input {
    flex: 1;
    border: none;
    height: 80rpx;
}

.search-btn {
    background-color: #ff9900;
    color: white;
    padding: 10rpx 30rpx;
    border-radius: 40rpx;
    margin-right: 20rpx;
}

.extra-btns {
    display: flex;
    align-items: center;
}

.dots {
    margin-right: 20rpx;
}

.camera-icon {
    width: 40rpx;
    height: 40rpx;
}

.history-search {
    padding: 10rpx 40rpx 10rpx 40rpx;
}

.title {
    font-size: 18px;
    margin-bottom: 10px;
    display: block;
    margin-bottom: 40rpx;
}

.history-list {
    display: flex;
    flex-wrap: wrap;
    gap: 30rpx;
}

.history-item {
    background-color: #f0f0f0;
    border-radius: 40rpx;
    padding: 10rpx 20rpx;
    display: flex;
}

.text {
    font-size: 24rpx;
    color: #767676;
}



::v-deep .uni-searchbar__box {
    background-color: #efefef;
    border: 2rpx solid #efefef !important;
}
</style>