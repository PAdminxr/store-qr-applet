import Vue from 'vue';
import VueRouter from 'vue-router';

// 支付相关页面
import QRCodePage from '@/paypages/pay/index.vue';
import PaymentResult from '@/paypages/pay/paymentresult.vue';

// 优惠券相关页面
import CouponDetailPage from '@/userpages/couponInfo/detail.vue';
import CouponIndexPage from '@/userpages/couponInfo/index.vue';

// 违章相关信息页面
import PenaltyDetailPage from '@/izaolifepages/penaltyInfo/detail.vue';
import PenaltyIndexPage from '@/izaolifepages/penaltyInfo/index.vue';
import BusinessIndexPage from '@/izaolifepages/businessInfo/index.vue'; // 假设这是正确的路径

// 厨房检查相关页面
import KitchenInspectionIndexPage from '@/izaolifepages/kitchenInspection/index.vue';

// 健康信息页面
import HealthPage from '@/izaolifepages/health/index.vue';
//首页
import IndexPage from '@/pages/izaolife/index.vue';



Vue.use(VueRouter);

const routes = [
    // 支付相关路由
    { path: '/qrcodePage', component: QRCodePage },
    { path: '/paymentResult', component: PaymentResult },

    // 优惠券相关路由
    { path: '/couponDetail', component: CouponDetailPage, name: 'CouponDetail' },
    { path: '/couponIndex', component: CouponIndexPage, name: 'CouponIndex' },

    // 违章相关信息路由
    { path: '/penaltyDetail', component: PenaltyDetailPage, name: 'PenaltyDetail' },
    { path: '/penaltyIndex', component: PenaltyIndexPage, name: 'PenaltyIndex' },
    { path: '/businessIndex', component: BusinessIndexPage, name: 'businessIndex' },

    // 厨房检查相关路由
    { path: '/kitchenInspectionIndex', component: KitchenInspectionIndexPage, name: 'KitchenInspectionIndex' },

    // 健康信息路由
    { path: '/health', component: HealthPage, name: 'HealthPage' },
    { path: '/index', component: IndexPage, name: 'IndexPage' },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;