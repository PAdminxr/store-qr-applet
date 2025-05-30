<template>
    <div class="container">
        <!-- 页面顶部间距 -->
        <div class="top-space"></div>

        <!-- 消息内容区域 -->
        <div v-if="loading" class="loading">加载中...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="message-box">
            <div class="time">{{ formattedDate }}</div>
            <div class="content">
                {{ message.content }}
            </div>
        </div>
    </div>
</template>

<script>
// 模拟数据源
const messages = [
    {
        id: 1,
        time: '2025-05-28T10:30:00Z',
        content: '关于本周末信息系统将暂停服务的通知，包括界面交互改进、性能提升以及部分功能调整。本次更新旨在为您提供更加流畅和便捷的使用体验。感谢您的理解与支持，如您在使用过程中遇到任何问题，请随时联系客服人员协助处理。祝您生活愉快，工作顺利！'
    },
    {
        id: 2,
        time: '2025-05-27T15:45:00Z',
        content: '邀请好友，享4重好礼！好友通过你的邀请注册即送福利，双方都能获得奖励！邀请越多，奖励越丰厚，限时活动不容错过！快来邀请好友一起畅玩，福利拿到手软！'
    },
    {
        id: 3,
        time: '2025-05-26T09:15:00Z',
        content: '亲爱的顾客，本店菜品上新，诚意邀请您再次光临本店品尝，如有疑问，请及时联系客服人员获取帮助。'
    },
    {
        id: 4,
        time: '2025-05-28T10:30:00Z',
        content: '尊敬的用户，您好！我们平台于近期进行了系统优化升级，包括界面交互改进、性能提升以及部分功能调整。本次更新旨在为您提供更加流畅和便捷的使用体验。感谢您的理解与支持，如您在使用过程中遇到任何问题，请随时联系客服人员协助处理。祝您生活愉快，工作顺利！'
    },
    {
        id: 5,
        time: '2025-05-27T15:45:00Z',
        content: '为了进一步提升平台稳定性，我们计划于北京时间 2025 年 5 月 29 日凌晨进行一次系统维护。届时可能会出现短暂的服务中断情况。请您提前做好相关准备。我们将在最短时间内完成维护工作，并恢复所有服务。感谢您的耐心等待与配合！'
    },
    {
        id: 6,
        time: '2025-05-26T09:15:00Z',
        content: '检测到您的账号在新设备上登录，请确认是否本人操作。如果您未进行任何登录行为，请立即修改密码并检查账户安全设置。为保障您的账户安全，建议开启双重验证功能。如有疑问，请及时联系客服人员获取帮助。'
    }
]

export default {
    props: ['id'],
    data() {
        return {
            message: null,
            loading: false,
            error: null
        }
    },
    computed: {
        // 格式化日期：YYYY-MM-DD HH:mm:ss
        formattedDate() {
            const date = new Date(this.message?.time)
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            const hours = String(date.getHours()).padStart(2, '0')
            const minutes = String(date.getMinutes()).padStart(2, '0')
            const seconds = String(date.getSeconds()).padStart(2, '0')
            return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`
        }
    },
    created() {
        this.loadMessage()
    },
    methods: {
        loadMessage() {
            this.loading = true
            this.error = null

            setTimeout(() => {
                const msg = messages.find(m => m.id === Number(this.id))
                if (msg) {
                    this.message = msg
                } else {
                    this.error = '未找到该消息'
                }
                this.loading = false
            }, 300)
        }
    }
}
</script>

<style scoped>
.container {
    font-family: Arial, sans-serif;
    padding: 0 20px;
}

/* 顶部间距 20rpx（uni-app 中 1rpx=0.5px，所以 20rpx=10px） */
.top-space {
    height: 10px;
}

.message-box {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.time {
    color: #666;
    font-size: 14px;
    margin-bottom: 15px;
}

.content {
    line-height: 1.8;
    font-size: 15px;
    white-space: pre-wrap;
    /* 支持换行 */
}

.loading,
.error {
    color: red;
    font-size: 16px;
}
</style>