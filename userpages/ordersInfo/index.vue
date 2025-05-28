<template>
    <view class="order-page">
        <!-- 筛选年月 -->
        <view class="filter-section">
            <picker mode="date" :value="selectedDate" @change="onDateChange" fields="month">

                <view class="filter-icon">
                    <view class="filter-text">{{ selectedDate }}</view>
                    <my-icon type="xiala" color="#333333" size="24rpx" line-height="1"></my-icon>
                </view>
            </picker>
        </view>

        <!-- 订单列表 -->
        <view class="order-list" v-if="filteredOrders.length > 0">
            <view v-for="(order, index) in filteredOrders" :key="index" class="order-container"
                @click="goToOrderDetail(order)">
                <view class="order-item">
                    <view class="order-info">
                        <label>
                            <image class="shop-icon" :src="order.shopImage"></image>
                            <text class="shop-name">{{ displayedRemarkText(order.shopName) }}</text>
                            <uni-icons type="right" size="34rpx" color="#333"></uni-icons>
                        </label>
                        <view class="order-status">{{ order.status }}</view>
                    </view>
                    <view class="order-content">
                        <image :src="order.orderimg" class="order-image"></image>
                        <view class="order-data">
                            <view class="order-title">{{ displayedRemarkText(order.orderContent) }}</view>
                            <view class="order-time">下单时间：{{ order.orderTime }}</view>
                        </view>
                    </view>
                    <view class="order-price">共{{ order.itemCount }}件 <span>¥</span><text>{{ order.amount }}</text>
                    </view>
                </view>
            </view>
        </view>
        <!-- 空状态 -->
        <view class="empty-state" v-else>

            <text class="empty-data">暂无数据</text>
        </view>
    </view>
</template>

<script>
import myIcon from '@/components/myIcon.vue'
export default {
    components: {
        myIcon
    },
    data() {
        return {

            selectedDate: '',
            orders: [],
        };
    },
    computed: {

        filteredOrders() {
            const orders = this.orders || [];
            const selectedYear = parseInt(this.selectedDate.slice(0, 4));
            const selectedMonth = parseInt(this.selectedDate.slice(5, 7)) - 1;

            return orders.filter(order => {
                const orderDate = new Date(order.orderTime);
                return (
                    orderDate.getFullYear() === selectedYear &&
                    orderDate.getMonth() === selectedMonth
                );
            });
        }
    },

    mounted() {
        this.$store.dispatch('loadOrdersFromCache');
        this.loadonDateChange();
    },
    methods: {
        loadonDateChange() {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            this.selectedDate = `${year}年${month < 10 ? '0' + month : month}月`;
            this.orders = this.$store.getters.getOrders || [];
            console.log('当前订单数据：', this.orders);

        },

        displayedRemarkText(title) {

            return this.$utils.truncate(title, 13);
        },
        onDateChange(e) {
            console.log(e)

            // this.selectedDate = this.parseCustomDate(e)
            this.selectedDate = e.detail.value.replace(/-/g, '年') + '月';
        },
        goToOrderDetail(order) {
            uni.navigateTo({
                url: `/userpages/ordersInfo/detail?orderId=${order.orderId}`
            });
        }
    }
};
</script>

<style scoped>
.order-page {
    padding-bottom: 100rpx;
}

.filter-section {
    margin-bottom: 20rpx;
    background: white;
    padding: 20rpx;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 20;
}

.filter-icon {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10rpx;
    gap: 10rpx;

}

.filter-text {
    font-size: 30rpx;
    color: #333;
    font-weight: 600;
    letter-spacing: 0.05em;
}

.order-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 130rpx;
}

.order-container {
    background-color: white;
    border-radius: 20rpx;
    padding: 20rpx 20rpx 0rpx 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 85%;
    margin-bottom: 30rpx;
}

.order-item {
    background-color: white;
    border-radius: 20rpx;
    /* padding: 20rpx; */

    width: 100%;
    margin-bottom: 30rpx;
}

.order-image {
    width: 120rpx;
    height: 120rpx;
    margin-right: 20rpx;
    border-radius: 10rpx;
}

.order-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx
}

.order-info label {
    display: flex;
    align-items: center;
}

.shop-icon {
    width: 60rpx;
    height: 60rpx;
    border-radius: 10rpx;
}

.shop-name {
    font-size: 28rpx;
    margin-left: 15rpx;
    flex-grow: 1;
    font-weight: 600;
}

.order-title {
    font-size: 28rpx;
    font-weight: 600;
}

.order-content {
    display: flex;
    justify-content: flex-start;

    padding-left: 80rpx;
}

.order-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20rpx;
}

.order-time {
    font-size: 22rpx;
    color: #666;
    margin-bottom: 10rpx;
}

.order-price {
    font-size: 24rpx;
    color: #767676;
    text-align: right;
}

.order-price span {
    font-weight: 500;
    color: #333;
    display: inline-block;
    padding-left: 10rpx;
    padding-right: 4rpx;
}

.order-price text {
    font-size: 38rpx;
    font-weight: 500;
    color: #333;
    letter-spacing: 2rpx;
}

.order-status {
    font-size: 26rpx;
    color: red;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.empty-data {
    text-align: center;
    margin: 50rpx 0;
    color: #999;
    display: inline-block;
    width: 100%;
    margin-top: 150rpx;
}
</style>