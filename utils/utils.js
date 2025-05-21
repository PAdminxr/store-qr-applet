
export function truncate(text, length = 10, suffix = '...') {
    return text && text.length > length ? text.substring(0, length) + suffix : text || '';
}


export function getYYYYMMDD(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


export function formatTime(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
export function safeParseDate(dateLike) {
    if (!dateLike) return null;
    if (dateLike instanceof Date) return dateLike;
    try {
        return new Date(dateLike);
    } catch (e) {
        console.warn("Invalid date format:", dateLike);
        return null;
    }
}

export function formatTimeAgo(date) {
    const dateLike = safeParseDate(date);
    if (!dateLike) return '未知时间';
    const now = new Date();
    const diffMs = now - dateLike;
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return '刚刚';
    } else if (minutes < 60) {
        return `${minutes} 分钟前`;
    } else if (hours < 24) {
        return `${hours} 小时前`;
    } else if (days < 30) {
        return `${days} 天前`;
    } else {
        return `一个月前`;
    }
}

export function groupAndSortData(data) {
    const now = new Date();
    const groupedData = {
        '近3天': [],
        '3天前': []
    };

    data.forEach(item => {
        const dateLike = this.safeParseDate(item.time);
        if (!dateLike) return;

        const diffMs = now - dateLike;
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (days < 3) {
            groupedData['近3天'].push(item);
        } else {
            groupedData['3天前'].push(item);
        }
    });

    Object.keys(groupedData).forEach(key => {
        groupedData[key].sort((a, b) => {
            const dateA = this.safeParseDate(a.time);
            const dateB = this.safeParseDate(b.time);
            return dateB - dateA;
        });
    });

    return groupedData;
}