// mock.js

export default {

    travel: [
        {

            imageUrl: "/static/izaozixun/travel1.png",
            videoUrl: "",
            type: "image",
            views: 5678,
            title: "",
            desc: "",
            avatar: "",
            author: "",
            likes: 5200,
            isLiked: false,
            parentId: 1,
            workId: 1,
            mediaId: 1,
            timestamp: "2023-08-18 10:30:00",
            typeof: 'scenic'
        },
        {
            imageUrl: "/static/izaozixun/travel3.png",
            videoUrl: "",
            type: "image",
            views: 0,
            title: "夏日避暑：微山湖红荷湿地",
            desc: "",
            avatar: "",
            author: "",
            likes: 0,
            isLiked: false,
            parentId: 6,
            workId: 1,
            mediaId: 2,
            timestamp: "2023-08-18 10:30:00",
            typeof: 'scenic'
        },
        {
            imageUrl: "/static/izaozixun/travel4.png",
            videoUrl: "",
            type: "image",
            views: 5678,
            title: "这是另一个标题这是多于两行的标题这是多于两行的标题这是多于两行的标题这是多于两行的标题",
            desc: "这是另一段描述信息...",
            avatar: "",
            author: "另一位作者",
            likes: 4689,
            isLiked: false,
            parentId: 2,
            workId: 1,
            mediaId: 3,
            timestamp: "2023-08-18 10:30:00",
            typeof: 'scenic'
        },
        {
            imageUrl: "/static/izaozixun/travel2.png",
            videoUrl: "",
            type: "image",
            views: 60,
            title: "去台儿庄攻略一定要收藏 今年山东海边大火",
            desc: "",
            avatar: "/static/c1.png",
            author: "麦兜响当当",
            likes: 45,
            isLiked: false,
            parentId: 3,
            workId: 1,
            mediaId: 4,
            timestamp: "2023-08-18 10:30:00",
            typeof: 'scenic'
        },
        {
            imageUrl: "/static/izaozixun/travel5.png",
            videoUrl: "",
            type: "image",
            views: 15678,
            title: "这是另一个标题这是多于两行的标题这是多于两行的标题这是多于两行的标题这是多于两行的标题",
            desc: "这是另一段描述信息...",
            avatar: "",
            author: "另一位作者",
            likes: 9012,
            isLiked: false,
            parentId: 4,
            workId: 1,
            mediaId: 5,
            timestamp: "2023-08-18 10:30:00",
            typeof: 'scenic'
        },
        {
            imageUrl: "/static/izaozixun/travel6.png",
            videoUrl: "",
            type: "image",
            views: 5,
            title: "",
            desc: "",
            avatar: "",
            author: "",
            likes: 0,
            isLiked: false,
            parentId: 5,
            workId: 1,
            mediaId: 6,
            timestamp: "2023-08-18 10:30:00",
            typeof: 'scenic'
        },
        {
            imageUrl: "/static/izaolife/food1.png",
            videoUrl: "",
            type: "image",
            views: 5678,
            title: "",
            desc: "",
            avatar: "",
            author: "",
            likes: 900,
            isLiked: false,
            parentId: 5,
            typeof: 'food',
            workId: 1,
            mediaId: 7,
            timestamp: "2023-08-18 10:30:00",

        },
    ],

    // 类型为 'photo' 时返回的图片列表数据 (photos)
    photo: [
        { imageUrl: '/static/izaozixun/台儿庄区.png', name: '台儿庄区', id: 1 },
        { imageUrl: '/static/izaozixun/薛城区.png', name: '薛城区', id: 2 },
        { imageUrl: '/static/izaozixun/山亭区.png', name: '山亭区', id: 3 },
        { imageUrl: '/static/izaozixun/滕州市.png', name: '滕州市', id: 4 },
        { imageUrl: '/static/izaozixun/市中区.png', name: '市中区', id: 5 },
        { imageUrl: '/static/izaozixun/峄城区.png', name: '峄城区', id: 6 },
    ],
    hotTags: [
        { name: "热点景区", active: true, type: "scenic" },
        { name: "热点美食", active: false, type: "food" },
        { name: "热点路线", active: false, type: "route" },
        { name: "热点话题", active: false, type: "topic" },
    ],
    zixunArray: ['台儿庄区', '山亭区', '峄城区', '市中区', '滕州市', '薛城区'],
    thumbnails: [
        {
            currentImage: "/static/izaozixun/wlbig.png",
            description: "江北水乡 | 天下第一庄。",
            avatarSrc: "/static/images/avatar.png",
            name: "张三",
        },
        {
            currentImage: "/static/izaozixun/wlbig2.png",
            description: "测试 | 天下第一庄。",
            avatarSrc: "/static/izaozixun/credit.png",
            name: "李四",
        },
        {
            currentImage: "/static/izaozixun/wlbig3.png",
            description: "测试2 | 天下第一庄。",
            avatarSrc: "/static/izaozixun/business.png",
            name: "王五",
        },
    ],
    banners: [
        { image: "/static/izaozixun/banner.png", text: '首艘国产大型邮轮“爱达·魔都号”开启航次' },
        { image: "/static/izaozixun/banner.png", text: '首艘国产大型邮轮“爱达·魔都号”开启航次2' },
    ],
    shortcutItems: [
        {
            icon: "/static/izaozixun/news.png",
            color: "#008000",
            text: "要闻动态",
            url: "/pages/news",
        },
        {
            icon: "/static/izaozixun/policy.png",
            color: "#0000FF",
            text: "政策法规",
            url: "/pages/policy",
        },
        {
            icon: "/static/izaozixun/business.png",
            color: "#FFA500",
            text: "商家亮证",
            url: "/pages/business",
        },
        {
            icon: "/static/izaozixun/promotion.png",
            color: "#FF0000",
            text: "优惠活动",
            url: "/pages/promotion",
        },
        {
            icon: "/static/izaozixun/credit.png",
            color: "#FFA500",
            text: "榴花信用",
            url: "/pages/credit",
        },
        {
            icon: "/static/izaozixun/data.png",
            color: "#008000",
            text: "数据公开",
            url: "/pages/data",
        },
    ],
    hotNews: [
        {
            id: 1,
            title: "全市积极开展《民法典》“送法进企业”活动",
            image: "/static/izaozixun/hot1.png",
            views: 286,
            timeAgo: '2025-04-19 10:29',
            article: {
                id: 1,
                title: '全市积极开展《民法典》“送法进企业”活动',
                date: '2025-04-09 13:29',
                views: 286,
                imageUrl: "/static/izaozixun/hot1.png",// 图片路径
                content: `
          <p>4月8日午间，中国华能、中国石油、中国石化等多家A股上市公司密集发布公告，基于对未来发展前景的信心，将积极开展股票回购增持。</p>
          <h3>中国华能：积极开展股票增持</h3>
          <p>中国华能集团有限公司4月8日宣布，为维护广大投资者利益，中国华能将促使控股上市公司不断提高公司质量，提升公司中长期投资价值，并积极开展股票增持，实现各方共赢。目前，中国华能控股的内蒙华电已经公告增持。</p>
          <h3>中国石油：未来12个月内 增持A股及H股股份</h3>
          <p>中国石油集团计划未来12个月内，增持中国石油天然气股份有限公司A股及H股股份。</p>
          <h3>中国石化：拟增持A股、H股金额不少于人民币20亿元</h3>
          <p>中国石化即日起正式启动新一期增持计划，拟增持中国石化A股、H股金额不少于人民币20亿元，不超过人民币30亿元，资金来源为自有资金和增持股票专项贷款。</p>
       `,
                comments: 2,
                likes: 245,
                isLiked: false,
                favorites: 65,
                isFavorite: false,
            },
            comments: [
                {
                    id: 1,
                    avatar: '/static/izaozixun/ava1.png',
                    author: '民族魂中国梦',
                    text: '好！致敬我们伟大的党和祖国！充满信心！中国资本市场加油！中国股市加油！',
                    time: '2025-05-09 13:29 '
                },
                {
                    id: 2,
                    avatar: '/static/izaozixun/ava2.png',
                    author: '我们爱学习',
                    text: '身在伟大的中国，多么自豪！一切困难都会迎刃而解，雄起！',
                    time: '2025-05-19 13:29'
                }
            ]
        },
        {
            id: 2,
            title: "为资本市场注入信心 多家央企密集宣布回购",
            image: "/static/izaozixun/hot2.png",
            views: 450,
            timeAgo: '2025-05-09 10:29',
            article: {
                id: 2,
                title: '为资本市场注入信心 多家央企密集宣布回购',
                date: '2025-05-09 10:29',
                views: 450,
                imageUrl: "/static/izaozixun/hot2.png",
                content: `
          <p>4月8日午间，中国华能、中国石油、中国石化等多家A股上市公司密集发布公告，基于对未来发展前景的信心，将积极开展股票回购增持。</p>
          <h3>中国华能：积极开展股票增持</h3>
          <p>中国华能集团有限公司4月8日宣布，为维护广大投资者利益，中国华能将促使控股上市公司不断提高公司质量，提升公司中长期投资价值，并积极开展股票增持，实现各方共赢。目前，中国华能控股的内蒙华电已经公告增持。</p>
          <h3>中国石油：未来12个月内 增持A股及H股股份</h3>
          <p>中国石油集团计划未来12个月内，增持中国石油天然气股份有限公司A股及H股股份。</p>
          <h3>中国石化：拟增持A股、H股金额不少于人民币20亿元</h3>
          <p>中国石化即日起正式启动新一期增持计划，拟增持中国石化A股、H股金额不少于人民币20亿元，不超过人民币30亿元，资金来源为自有资金和增持股票专项贷款。</p>
       `,
                comments: 2,
                likes: 445,
                isLiked: false,
                isFavorite: false,
                favorites: 10
            },
            comments: [
                {
                    id: 1,
                    avatar: '/static/izaozixun/ava1.png',
                    author: '民族魂中国梦',
                    text: '好！致敬我们伟大的党和祖国！充满信心！中国资本市场加油！中国股市加油！',
                    time: '2025-05-09 17:29'
                },
                {
                    id: 2,
                    avatar: '/static/izaozixun/ava2.png',
                    author: '我们爱学习',
                    text: '身在伟大的中国，多么自豪！一切困难都会迎刃而解，雄起！',
                    time: '2025-05-19 13:29'
                }
            ]
        },
    ],
    videoNews: [
        {
            id: 3,
            title: "玉渊潭天 | 一部手机看懂美国加关税的代价",
            image: "/static/izaozixun/video1.png",
            views: 2026,
            timeAgo: '2025-05-9 10:29',
            videoSrc: "/static/izaozixun/1.mp4",
            duration: 3000,
            article: {
                id: 1,
                title: '玉渊潭天 | 一部手机看懂美国加关税的代价',
                date: '2025-05-09 10:29',
                views: 2026,
                imageUrl: "/static/izaozixun/video1.png",
                videoSrc: "/static/izaozixun/1.mp4",
                duration: 3000,
                content: `
          <p>4月8日午间，中国华能、中国石油、中国石化等多家A股上市公司密集发布公告，基于对未来发展前景的信心，将积极开展股票回购增持。</p>
          <h3>中国华能：积极开展股票增持</h3>
          <p>中国华能集团有限公司4月8日宣布，为维护广大投资者利益，中国华能将促使控股上市公司不断提高公司质量，提升公司中长期投资价值，并积极开展股票增持，实现各方共赢。目前，中国华能控股的内蒙华电已经公告增持。</p>
          <h3>中国石油：未来12个月内 增持A股及H股股份</h3>
          <p>中国石油集团计划未来12个月内，增持中国石油天然气股份有限公司A股及H股股份。</p>
          <h3>中国石化：拟增持A股、H股金额不少于人民币20亿元</h3>
       `,
                comments: 1,
                likes: 445,
                isLiked: false,
                isFavorite: false,
                favorites: 19
            },
            comments: [
                {
                    id: 1,
                    avatar: '/static/izaozixun/ava1.png',
                    author: '民族魂中国梦',
                    text: '好！致敬我们伟大的党和祖国！充满信心！中国资本市场加油！中国股市加油！',
                    time: '2025-05-09 13:29 '
                }

            ]
        },
        {
            id: 4,
            title: "香港财政司司长:香港将坚持自由贸易政策 保持自由港地位",
            image: "/static/izaozixun/video2.png",
            views: 2130,
            timeAgo: '2025-04-19 11:29',
            videoSrc: "/static/izaozixun/2.mp4",
            duration: 4000,
            article: {
                id: 2,
                title: '香港财政司司长:香港将坚持自由贸易政策 保持自由港地位',
                date: '2025-05-09 10:29',
                views: 2130,
                imageUrl: "/static/izaozixun/video2.png",
                videoSrc: "/static/izaozixun/2.mp4",
                duration: 4000,
                content: `
          <p>4月8日午间，中国华能、中国石油、中国石化等多家A股上市公司密集发布公告，基于对未来发展前景的信心，将积极开展股票回购增持。</p>
          <h3>中国华能：积极开展股票增持</h3>
          <p>中国华能集团有限公司4月8日宣布，为维护广大投资者利益，中国华能将促使控股上市公司不断提高公司质量，提升公司中长期投资价值，并积极开展股票增持，实现各方共赢。目前，中国华能控股的内蒙华电已经公告增持。</p>
          <h3>中国石油：未来12个月内 增持A股及H股股份</h3>
          <p>中国石油集团计划未来12个月内，增持中国石油天然气股份有限公司A股及H股股份。</p>
          <h3>中国石化：拟增持A股、H股金额不少于人民币20亿元</h3>
       `,
                comments: 2,
                likes: 445,
                isLiked: false,
                isFavorite: false,
                favorites: 9
            },
            comments: [
                {
                    id: 1,
                    avatar: '/static/izaozixun/ava1.png',
                    author: '民族魂中国梦',
                    text: '好！致敬我们伟大的党和祖国！充满信心！中国资本市场加油！中国股市加油！',
                    time: '2025-05-09 13:29 '
                },
                {
                    id: 2,
                    avatar: '/static/izaozixun/ava2.png',
                    author: '我们爱学习',
                    text: '身在伟大的中国，多么自豪！一切困难都会迎刃而解，雄起！',
                    time: '2025-05-19 13:29'
                }
            ]
        },
        {
            id: 5,
            title: "清明假期全国揽投快递包裹超28亿件",
            image: "/static/izaozixun/video3.png",
            views: 202,
            timeAgo: '2025-04-22 11:29',
            videoSrc: "/static/izaozixun/3.mp4",
            duration: 50,
            article: {
                id: 2,
                title: '清明假期全国揽投快递包裹超28亿件',
                date: '2025-05-09 10:29',
                views: 202,
                imageUrl: "/static/izaozixun/video3.png",
                videoSrc: "/static/izaozixun/3.mp4",
                duration: 50,
                content: `
          <p>4月8日午间，中国华能、中国石油、中国石化等多家A股上市公司密集发布公告，基于对未来发展前景的信心，将积极开展股票回购增持。</p>
          <h3>中国华能：积极开展股票增持</h3>
          <p>中国华能集团有限公司4月8日宣布，为维护广大投资者利益，中国华能将促使控股上市公司不断提高公司质量，提升公司中长期投资价值，并积极开展股票增持，实现各方共赢。目前，中国华能控股的内蒙华电已经公告增持。</p>
          <h3>中国石油：未来12个月内 增持A股及H股股份</h3>
          <p>中国石油集团计划未来12个月内，增持中国石油天然气股份有限公司A股及H股股份。</p>
          <h3>中国石化：拟增持A股、H股金额不少于人民币20亿元</h3>
       `,
                comments: 2,
                likes: 445,
                isLiked: false,
                isFavorite: false,
                favorites: 2
            },
            comments: [
                {
                    id: 1,
                    avatar: '/static/izaozixun/ava1.png',
                    author: '民族魂中国梦',
                    text: '好！致敬我们伟大的党和祖国！充满信心！中国资本市场加油！中国股市加油！',
                    time: '2025-05-09 13:29 '
                },
                {
                    id: 2,
                    avatar: '/static/izaozixun/ava2.png',
                    author: '我们爱学习',
                    text: '身在伟大的中国，多么自豪！一切困难都会迎刃而解，雄起！',
                    time: '2025-05-19 13:29'
                }
            ]
        },
    ],
    tags: [
        "推荐",
        "地方菜系",
        "小吃快餐",
        "烧烤烤肉",
        "自助餐",
        "奶茶咖啡",
        "面包蛋糕",
        "食品生鲜",
    ],

    ctBannerImgs: [
        "/static/izaolife/sjimg.png",
        "/static/izaolife/sjimg.png",
        "/static/izaolife/sjimg.png",
    ],
    reviews: [
        {
            avatar: "/static/c1.png",
            userName: "用户OIKL7270",
            date: "2025/03/17",
            rating: 5,
            content: "非常好，菜量很大，老板人很大方！！！",
            pics: [
                "/static/izaolife/IMG_3389.png",
                "/static/izaolife/IMG_3390.png",
            ],
            showFullContent: false,
            ishow: true,
            isExpanded: false,
        },
        {
            avatar: "/static/c2.png",
            userName: "匿名用户",
            date: "2025/03/17",
            rating: 4,
            content:
                "非常好，菜量很大，老板人很大方！！！美团上点的，有鱼有鸡的。",
            pics: [
                "/static/izaolife/IMG_3389.png",
                "/static/izaolife/IMG_3390.png",
                "/static/izaolife/IMG_3391.png",
            ],
            showFullContent: false,
            ishow: false,
            isExpanded: false,
        },
        {
            avatar: "/static/c3.png",
            userName: "瓣瓣西瓜",
            date: "2025/03/17",
            rating: 5,
            content:
                "非常好，菜量很大，老板人很大方！！！美团上点的，有鱼有鸡的，都很入味，特别推荐他们的特色菜，非常推荐。",
            pics: [],
            showFullContent: true,
            ishow: true,
            isExpanded: false,
        },
    ],
    merchantInfos: [
        {
            icon: "/static/izaolife/punish-icon.png",
            name: "处罚信息",
            path: "/pages/izaolifepages/penaltyInfo/detail",
        },
        {
            icon: "/static/izaolife/business-icon.png",
            name: "经营信息",
            path: "/pages/izaolifepages/businessInfo/index",
        },
        {
            icon: "/static/izaolife/credit-icon.png",
            name: "榴花信用",
            path: "/pages/izaolifepages/penaltyInfo/index",
        },
        {
            icon: "/static/izaolife/kitchen-icon.png",
            name: "明厨亮灶",
            path: "/pages/izaolifepages/kitchenInspection/index",
        },
        {
            icon: "/static/izaolife/health-icon.png",
            name: "健康证",
            path: "/pages/izaolifepages/health/index",
        },
    ],
    fwInfos: [
        {
            icon: "/static/izaolife/cat.png",
            name: "收费停车场",
        },
        {
            icon: "/static/izaolife/wifi.png",
            name: "免费wifi",
        },
        {
            icon: "/static/izaolife/ct.png",
            name: "餐厅",
        },
        {
            icon: "/static/izaolife/xyq.png",
            name: "吸烟区",
        },
        {
            icon: "/static/izaolife/yqjt.png",
            name: "园区交通",
        },
        {
            icon: "/static/izaolife/sjcd.png",
            name: "手机充电",
        },
    ],
    jqFwInfos: [
        {
            icon: "/static/izaolife/cat.png",
            name: "收费停车场",
        },

        {
            icon: "/static/izaolife/ct.png",
            name: "餐厅",
        },
        {
            icon: "/static/izaolife/xyq.png",
            name: "吸烟区",
        },
        {
            icon: "/static/izaolife/yqjt.png",
            name: "园区交通",
        },
    ],
    jqBannerImgs: [
        "/static/izaolife/jqimg.png",
        "/static/izaolife/jqimg.png",
        "/static/izaolife/jqimg.png",
    ],
    jdBannerImgs: [
        "/static/izaolife/jdimg.png",
        "/static/izaolife/jdimg.png",
        "/static/izaolife/jdimg.png",
    ],
    restaurants: [
        {
            id: 1,
            image:
                "/static/izaolife/ct1.png",
            name: "台儿庄运河鱼馆枣庄辣子鸡",
            score: 89,
            isOpen: true,
            businessHours: "09:00-22:00",
            distance: "105m",
            address: "台儿庄区东顺南路古城东门对面",
            tags: ["美食", "小吃快餐", "烧烤烤肉", "地方菜系", "食品生鲜"],
            addressOwner: "山东省枣庄市台儿庄区运河街道运河北岸路与兴中路交叉口东北500米",
            distanceOwner: "距您直线距离约2.6km",
            recommendation: `
          <p>枣庄，辣子鸡的故乡！</p>
          <p>我们是枣庄首家门店，一家酒香不怕巷子深的辣子鸡馆子，位置在一个隐蔽的小山坡上，走地小公鸡是店家在自家园子里散养的，现做现杀的小公鸡真的好好吃！李大厨的辣子鸡拌面真的是份大又好吃了！</p>
         <p>图片上是老板的手，和这份菜的大小相比有点儿“渺小”了...另外面条超级劲道！鸡肉也超级入味儿！如果不能吃辣的，可以让他做微微辣，不辣星人绝对可以接受的辣度。土豆，鸡块，宽面条每一项都超好吃哒，欢迎大家过来品鉴！</p>
          `,
            isFavorite: false,
        },
        {
            id: 2,
            image:
                "/static/izaolife/ct2.png",
            name: "花家地艺术餐厅",
            score: 80,
            isOpen: false,
            businessHours: "17:00-03:00",
            distance: "66m",
            address: "台儿庄区东顺南路古城东门对面",
            tags: ["美食", "小吃快餐", "地方菜系"],
            addressOwner: "山东省枣庄市台儿庄区运河街道运河北岸路与兴中路交叉口东北500米",
            distanceOwner: "距您直线距离约0.6km",
            isFavorite: false,
            recommendation: `
          <p>花家地艺术餐厅！</p>
          <p>我们是枣庄首家门店，一家酒香不怕巷子深的花家地艺术餐厅，位置在一个隐蔽的小山坡上，走地小公鸡是店家在自家园子里散养的，现做现杀的小公鸡真的好好吃！李大厨的辣子鸡拌面真的是份大又好吃了！</p>
         <p>图片上是老板的手，和这份菜的大小相比有点儿“渺小”了...另外面条超级劲道！鸡肉也超级入味儿！如果不能吃辣的，可以让他做微微辣，不辣星人绝对可以接受的辣度。土豆，鸡块，宽面条每一项都超好吃哒，欢迎大家过来品鉴！</p>
          `,
        },
        {
            id: 3,
            image:
                "/static/izaolife/ct3.png",
            name: "运河鱼馆（古城店）",
            score: 77,
            isOpen: true,
            businessHours: "09:00-22:00",
            distance: "1.2km",
            address: "台儿庄区东顺南路古城东门对面",
            tags: ["美食", "食品生鲜", "地方菜系"],
            addressOwner: "山东省枣庄市台儿庄区运河街道运河北岸路与兴中路交叉口东北500米",
            distanceOwner: "距您直线距离约0.6km",
            isFavorite: false,
            recommendation: `
          <p>运河鱼馆（古城店）！</p>
          <p>我们是枣庄首家门店，一家酒香不怕巷子深的运河鱼馆（古城店），位置在一个隐蔽的小山坡上，走地小公鸡是店家在自家园子里散养的，现做现杀的小公鸡真的好好吃！李大厨的辣子鸡拌面真的是份大又好吃了！</p>
         <p>图片上是老板的手，和这份菜的大小相比有点儿“渺小”了...另外面条超级劲道！鸡肉也超级入味儿！如果不能吃辣的，可以让他做微微辣，不辣星人绝对可以接受的辣度。土豆，鸡块，宽面条每一项都超好吃哒，欢迎大家过来品鉴！</p>
          `,
        },
        {
            id: 4,
            image:
                "/static/izaolife/ct4.png",
            name: "小火柴大鱼头·铁锅炖·鲁菜",
            score: 98,
            isOpen: true,
            businessHours: "09:00-22:00",
            distance: "320m",
            address: "台儿庄区东顺南路古城东门对面",
            tags: ["美食", "食品生鲜", "地方菜系"],
            addressOwner: "山东省枣庄市台儿庄区运河街道运河北岸路与兴中路交叉口东北500米",
            distanceOwner: "距您直线距离约0.6km",
            isFavorite: false,
            recommendation: `
          <p>小火柴大鱼头·铁锅炖·鲁菜！</p>
          <p>我们是枣庄首家门店，一家酒香不怕巷子深的小火柴大鱼头·铁锅炖·鲁菜，位置在一个隐蔽的小山坡上，走地小公鸡是店家在自家园子里散养的，现做现杀的小公鸡真的好好吃！李大厨的辣子鸡拌面真的是份大又好吃了！</p>
         <p>图片上是老板的手，和这份菜的大小相比有点儿“渺小”了...另外面条超级劲道！鸡肉也超级入味儿！如果不能吃辣的，可以让他做微微辣，不辣星人绝对可以接受的辣度。土豆，鸡块，宽面条每一项都超好吃哒，欢迎大家过来品鉴！</p>
          `,
        },
    ],
    hotelInfo: [
        {
            id: 5,
            image:
                "/static/izaolife/jdms1.png",
            name: "滕州滨江国际大酒店",
            score: 89,
            isOpen: true,
            businessHours: "09:00-22:00",
            distance: "105m",
            address: "台儿庄古城附近",
            addressOwner: "山东省枣庄市台儿庄区运河街道运河北岸路与兴中路交叉口东北500米",
            distanceOwner: "距您直线距离约0.6km",
            isFavorite: false,
            recommendation: `
            <p> 这是一家非常新的如家，进去以后发现最新版本的如家酒店也太棒了。 </p>
            <p> 早餐也好吃，如家这碗面没得说</p>
            <p> 房间也很适合年轻人，tcl大电视还可以投屏</p>
            <p> 还有洗衣房，茶水吧，咖啡机，还可以寄存行李</p>
            <p> 一百块出头你会选择如家吗？</p>
            <p> 欢迎各大看官来本店入住！</p>`
        },
        {
            id: 6,
            image:
                "/static/izaolife/jdms2.png",
            name: "布丁连锁酒店",
            score: 80,
            isOpen: false,
            businessHours: "17:00-03:00",
            distance: "66m",
            address: "台儿庄区东顺南路古城东门对面",
            addressOwner: "山东省枣庄市台儿庄区运河街道运河北岸路与兴中路交叉口东北500米",
            distanceOwner: "距您直线距离约0.6km",
            isFavorite: false,
            recommendation: `
            <p> 这是一家非常新的如家，进去以后发现最新版本的如家酒店也太棒了。 </p>
            <p> 早餐也好吃，如家这碗面没得说</p>
            <p> 房间也很适合年轻人，tcl大电视还可以投屏</p>
            <p> 还有洗衣房，茶水吧，咖啡机，还可以寄存行李</p>
            <p> 一百块出头你会选择如家吗？</p>
            <p> 欢迎各大看官来本店入住！</p>`
        },
        {
            id: 7,
            image:
                "/static/izaolife/jdms3.png",
            name: "那片海文艺酒店",
            score: 77,
            isOpen: true,
            businessHours: "09:00-22:00",
            distance: "1.2km",
            address: "台儿庄区东顺南路古城东门对面",
            addressOwner: "山东省枣庄市台儿庄区运河街道运河北岸路与兴中路交叉口东北500米",
            distanceOwner: "距您直线距离约0.6km",
            isFavorite: false,
            recommendation: `
            <p> 这是一家非常新的如家，进去以后发现最新版本的如家酒店也太棒了。 </p>
            <p> 早餐也好吃，如家这碗面没得说</p>
            <p> 房间也很适合年轻人，tcl大电视还可以投屏</p>
            <p> 还有洗衣房，茶水吧，咖啡机，还可以寄存行李</p>
            <p> 一百块出头你会选择如家吗？</p>
            <p> 欢迎各大看官来本店入住！</p>`
        },
        {
            id: 8,
            image:
                "/static/izaolife/jdms4.png",
            name: "舜和枣庄大酒店",
            score: 98,
            isOpen: true,
            businessHours: "09:00-22:00",
            distance: "320m",
            address: "台儿庄区东顺南路古城东门对面",
            addressOwner: "山东省枣庄市台儿庄区运河街道运河北岸路与兴中路交叉口东北500米",
            distanceOwner: "距您直线距离约0.6km",
            isFavorite: false,
            recommendation: `
            <p> 这是一家非常新的如家，进去以后发现最新版本的如家酒店也太棒了。 </p>
            <p> 早餐也好吃，如家这碗面没得说</p>
            <p> 房间也很适合年轻人，tcl大电视还可以投屏</p>
            <p> 还有洗衣房，茶水吧，咖啡机，还可以寄存行李</p>
            <p> 一百块出头你会选择如家吗？</p>
            <p> 欢迎各大看官来本店入住！</p>`
        },
        {
            id: 9,
            image:
                "/static/izaolife/jdms5.png",
            name: "艺龙米高时尚酒店",
            score: 98,
            isOpen: true,
            businessHours: "09:00-22:00",
            distance: "320m",
            address: "台儿庄区东顺南路古城东门对面",
            addressOwner: "山东省枣庄市台儿庄区运河街道运河北岸路与兴中路交叉口东北500米",
            distanceOwner: "距您直线距离约0.6km",
            isFavorite: false,
            recommendation: `
            <p> 这是一家非常新的如家，进去以后发现最新版本的如家酒店也太棒了。 </p>
            <p> 早餐也好吃，如家这碗面没得说</p>
            <p> 房间也很适合年轻人，tcl大电视还可以投屏</p>
            <p> 还有洗衣房，茶水吧，咖啡机，还可以寄存行李</p>
            <p> 一百块出头你会选择如家吗？</p>
            <p> 欢迎各大看官来本店入住！</p>`
        },
    ],
    travelInfo: [
        {
            id: 10,
            image:
                "/static/izaolife/jq1.png",
            name: "台儿庄古城",
            score: 89,
            isOpen: true,
            businessHours: "09:00-22:00",
            distance: "105m",
            address: "台儿庄区东顺南路古城东门对面",
            addressOwner: "山东省枣庄市台儿庄区运河街道运河北岸路与兴中路交叉口东北500米",
            distanceOwner: "距您直线距离约0.6km",
            isFavorite: false,
            recommendation: `
               <p>  台儿庄古城，位于山东省枣庄市台儿庄区，是一处具有深厚历史文化底蕴的旅游景区。这座古城的历史可以追溯到秦汉时期，
                        经历了唐宋时期的发展，至明清时期达到繁荣。古城以其独特的历史文化价值和美丽的自然风光而闻名。</p>
          <p>   一步一景：古城内的建筑、街道、桥梁都充满了古朴的气息，仿佛穿越回了古代。</p>
            <p> 夜景璀璨：夜晚的古城更是美轮美奂，灯火阑珊，如梦如幻。</p>`
        },
        {
            id: 11,
            image:
                "/static/izaolife/jq2.png",
            name: "铁道游击队纪念园",
            score: 80,
            isOpen: false,
            businessHours: "17:00-03:00",
            distance: "66m",
            address: "台儿庄区东顺南路古城东门对面",
            addressOwner: "山东省枣庄市台儿庄区运河街道运河北岸路与兴中路交叉口东北500米",
            distanceOwner: "距您直线距离约0.6km",
            isFavorite: false,
            recommendation: `
               <p>  台儿庄古城，位于山东省枣庄市台儿庄区，是一处具有深厚历史文化底蕴的旅游景区。这座古城的历史可以追溯到秦汉时期，
                        经历了唐宋时期的发展，至明清时期达到繁荣。古城以其独特的历史文化价值和美丽的自然风光而闻名。</p>
          <p>   一步一景：古城内的建筑、街道、桥梁都充满了古朴的气息，仿佛穿越回了古代。</p>
            <p> 夜景璀璨：夜晚的古城更是美轮美奂，灯火阑珊，如梦如幻。</p>`
        },
        {
            id: 12,
            image:
                "/static/izaolife/jq3.png",
            name: "铁道游击队纪念园",
            score: 77,
            isOpen: true,
            businessHours: "09:00-22:00",
            distance: "1.2km",
            address: "台儿庄区东顺南路古城东门对面",
            addressOwner: "山东省枣庄市台儿庄区运河街道运河北岸路与兴中路交叉口东北500米",
            distanceOwner: "距您直线距离约0.6km",
            isFavorite: false,
            recommendation: `
               <p>  台儿庄古城，位于山东省枣庄市台儿庄区，是一处具有深厚历史文化底蕴的旅游景区。这座古城的历史可以追溯到秦汉时期，
                        经历了唐宋时期的发展，至明清时期达到繁荣。古城以其独特的历史文化价值和美丽的自然风光而闻名。</p>
          <p>   一步一景：古城内的建筑、街道、桥梁都充满了古朴的气息，仿佛穿越回了古代。</p>
            <p> 夜景璀璨：夜晚的古城更是美轮美奂，灯火阑珊，如梦如幻。</p>`
        }

    ],
    siteMessages: [
        {
            icon: '/static/izaozixun/icon-1.png',
            title: '系统消息',
            description: '关于本周末信息系统将暂停服务的通知',
            time: '昨天17:00',
            tag: true,
            value: 6
        },
        {
            icon: '/static/izaozixun/icon-2.png',
            title: '活动消息',
            description: '邀请好友，享4重好礼！',
            time: '2小时前',
            tag: false,
            value: 100000
        },
        {
            icon: '/static/izaozixun/icon-1.png',
            title: '云南过桥米线',
            description: '亲爱的顾客，本店菜品上新，诚意邀请您再次光临本店品尝',
            time: '04-08 13:00',
            tag: false,
            value: 1
        }
    ],
    systemAnnouncements: [
        {
            icon: '/static/izaozixun/icon-3.png',
            title: '升级公告',
            description: '系统已完成新版本迭代！修复已知问题，新增新增',
            time: '昨天17:00',
            tag: false
        },
        {
            icon: '/static/izaozixun/icon-3.png',
            title: '升级公告',
            description: '系统已完成新版本迭代！修复已知问题，新增新增',
            time: '昨天17:00',
            tag: false
        },
        {
            icon: '/static/izaozixun/icon-3.png',
            title: '升级公告',
            description: '系统已完成新版本迭代！修复已知问题，新增新增',
            time: '昨天17:00',
            tag: false
        }
    ],
    functionList: [
        { icon: "/static/izaolife/food-icon.png", name: "美食餐饮", path: '/pages/izaolifepages/fineFood/index' },
        { icon: "/static/izaolife/hotel-icon.png", name: "酒店民宿", path: '/pages/izaolifepages/hotelAndHome/index' },
        { icon: "/static/izaolife/techan-icon.png", name: "枣庄特产" },
        { icon: "/static/izaolife/scenic-icon.png", name: "景区出行", path: '/pages/izaolifepages/scenicTravel/index' },
        { icon: "/static/izaolife/play-icon.png", name: "休闲玩乐" },
        { icon: "/static/izaolife/cash-icon.png", name: "天天现金" },
        { icon: "/static/izaolife/parent-child-icon.png", name: "亲子乐园" },
        { icon: "/static/izaolife/vacation-icon.png", name: "旅游度假" },
        { icon: "/static/izaolife/parent-child-icon.png", name: "测试滑动1" },
        { icon: "/static/izaolife/vacation-icon.png", name: "测试滑动2" },
    ],
    mustEatList: [
        {
            image: "/static/izaolife/food1.png",
            name: "素雨辣子鸡",
            desc: "地道枣庄味",
            top: 1,
        },
        {
            image: "/static/izaolife/food2.png",
            name: "枣庄菜煎饼",
            desc: "品味枣庄味",
            top: 2,
        },
        {
            image: "/static/izaolife/food3.png",
            name: "滕州卷饼",
            desc: "寻觅古县美食",
            top: 3,
        },
    ],
    hotelList: [
        {
            image: "/static/izaolife/hotel1.png",
            location: "近台儿庄古城",
            name: "北方世纪酒店",
        },
        {
            image: "/static/izaolife/hotel2.png",
            location: "近抱犊崮",
            name: "黑龙江宾馆",
        },
        {
            image: "/static/izaolife/hotel3.png",
            location: "近台儿庄古城",
            name: "状元楼客栈",
        },
    ],
    scenicBigList: [
        {
            image: "/static/izaolife/scenic1.png",
            name: "旅游攻略",
            desc: "你想知道的门票时刻、交通时刻表等应有尽有",
        },

    ],
    scenicSmallList: [
        { image: "/static/izaolife/scenic2.png", name: "纪念园攻略" },
        { image: "/static/izaolife/scenic3.png", name: "特色游记" },
        { image: "/static/izaolife/scenic4.png", name: "VR导览" },
    ],
};