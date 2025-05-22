<template>
    <view class="waterfall-container">
        <!-- 双列布局 -->
        <view class="waterfall-columns">
            <!-- 左列 -->
            <view class="column left-column">
                <block v-for="(item, index) in leftList" :key="index">
                    <CardItem :item="item" @like="handleLike" :showDeleteButton="showDeleteButton"
                        :showViews="showViews" @views="handleSetViews" />
                </block>
            </view>

            <!-- 右列 -->
            <view class="column right-column">
                <block v-for="(item, index2) in rightList" :key="index2">
                    <CardItem :item="item" @like="handleLike" :showDeleteButton="showDeleteButton"
                        :showViews="showViews" @views="handleSetViews" />
                </block>
            </view>
        </view>

        <!-- 无数据提示 -->
        <view v-if="spots.length === 0 && !loading" class="empty-data">暂无数据</view>
        <!-- 加载中 -->
        <view v-if="loading" class="loading">加载中...</view>
    </view>
</template>

<script>
import CardItem from "./CardItem.vue";

export default {
    components: {
        CardItem,
    },
    props: {
        spots: {
            type: Array,
            required: true,
            default: () => [],
        },
        showDeleteButton: {
            type: Boolean,
            default: false,
        },
        showViews: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        // 将数据按奇偶分发到左右列
        leftList() {
            return this.spots.filter((_, index) => index % 2 === 0);
        },
        rightList() {
            return this.spots.filter((_, index) => index % 2 === 1);
        },
    },
    methods: {
        handleSetViews(updated) {
            // 更新本地数据
            if (this.showViews) {
                this.$emit('views', updated);
            }

        },
        handleLike(updated) {
            // 更新本地数据
            if (this.showViews) {
                this.$emit('like', updated);

            } else {
                const idx = this.spots.findIndex((i) => i.mediaId === updated.mediaId);
                if (idx > -1) {
                    this.$set(this.spots, idx, updated);
                    this.$store.dispatch("updateWorkLike", {
                        mediaId: updated.mediaId,
                        isLiked: updated.isLiked,
                        likes: updated.likes,
                    });
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.waterfall-container {
    padding: 20rpx;
}

.waterfall-columns {
    display: flex;
    justify-content: space-between;
}

.column {
    width: 49%;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

.empty-data {
    text-align: center;
    margin-top: 50rpx;
    color: #999;
    font-size: 32rpx;
}
</style>