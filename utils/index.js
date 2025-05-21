import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userLoginInfo: {}, // 用户登录信息
        isLogin: false, // 是否登录
        receivedRedEnvelopes: [], // 领取的红包列表
        orders: [], // 我的订单
        favorites: [],// 收藏的资讯
        merchants: [],// 收藏的商家
        works: [], // 我的作品
        feedbacks: [], // 投诉反馈
        comments: [] // 所有用户提交的评论（每个评论是一个完整对象）
    },
    mutations: {
        SET_USER_INFO(state, info) {
            state.userLoginInfo = info;
        },
        CLEAR_USER_INFO(state) {
            state.userLoginInfo = null;
        },
        SET_IS_LOGIN(state, isLogin) {
            state.isLogin = isLogin;
        },
        ADD_RECEIVED_RED_ENVELOPE(state, redEnvelope) {
            redEnvelope.isReceived = true;
            state.receivedRedEnvelopes.push(redEnvelope);
        },
        SET_RECEIVED_RED_ENVELOPES(state, redEnvelopes) {
            state.receivedRedEnvelopes = redEnvelopes.map(re => ({
                ...re,
                isReceived: true
            }));
        },

        ADD_COMMENT(state, comment) {
            state.comments.push(comment);
        },
        ADD_FAVORITES(state, favorites) {
            state.favorites.unshift(favorites);
        },
        ADD_MERCHANTS(state, merchants) {
            state.merchants.unshift(merchants);
        },
        ADD_WORKS(state, work) {
            state.works.unshift(work);
        },

        REMOVE_COMMENT(state, index) {
            state.comments.splice(index, 1);
        },
        UPDATE_COMMENT_FIELD(state, { index, field, value }) {
            if (state.comments[index]) {
                Vue.set(state.comments[index], field, value);
            }
        },

        UPDATE_ORDER(state, { orderId, field, value }) {
            const order = state.orders.find(order => order.orderId === orderId);
            if (order) {
                Vue.set(order, field, value);
                uni.setStorageSync('orders', state.orders);
            }
        },
        UPDATE_ENVELOPES(state, { id, field, value }) {
            const envelopes = state.receivedRedEnvelopes.find(envelope => envelope.id === id);
            if (envelopes) {
                Vue.set(envelopes, field, value);
                uni.setStorageSync('receivedRedEnvelopes', state.receivedRedEnvelopes);
            }

        },
        setComments(state, comments) {
            state.comments = comments;
        },
        SAVE_USER_INFO_TO_STATE(state, { userInfo, isLogin }) {
            state.userLoginInfo = userInfo;
            state.isLogin = isLogin;
        },
        SAVE_RECEIVED_RED_ENVELOPES(state, envelopes) {
            state.receivedRedEnvelopes = envelopes;
        },
        ADD_ORDERS(state, orders) {
            state.orders.push(orders);
        },
        SAVE_ORDERS(state, orders) {
            state.orders = orders;
        },
        SAVE_FAVORITES(state, favorites) {
            state.favorites = favorites;
        },
        REMOVE_FAVORITES(state, id) {
            state.favorites = state.favorites.filter(favorite => favorite.articleId !== id);
            uni.setStorageSync('favorites', state.favorites);
        },
        REMOVE_MERCHANTS(state, id) {
            state.merchants = state.merchants.filter(merchant => merchant.articleId !== id);
            uni.setStorageSync('merchants', state.merchants);
        },
        SAVE_MERCHANTS(state, merchants) {
            state.merchants = merchants;
        },
        SAVE_WORKS(state, works) {
            state.works = works;
        },
        ADD_FEEDBACKS(state, feedbacks) {
            state.feedbacks.push(feedbacks);
        },
        ADD_ENVELOPE(state, envelopes) {
            state.receivedRedEnvelopes.push(envelopes);
        },
        SAVE_FEEDBACKS(state, feedbacks) {
            state.feedbacks = feedbacks;
        },
        SAVE_ENVELOPE(state, envelopes) {
            state.receivedRedEnvelopes = envelopes;
        },
        UPDATE_WORK_LIKE(state, { id, isLiked, likes }) {
            // 遍历所有作品
            for (const work of state.works) {
                // 找到匹配的媒体项
                const media = work.mediaList.find(m => m.id === id);
                if (media) {
                    media.isLiked = isLiked;
                    media.likes = likes;
                    break;
                }
            }
            uni.setStorageSync('works', state.works);
        },
        UPDATE_FAVORTITE_VIEW(state, { id, views }) {

            const favorite = state.favorites.find(favorite => favorite.articleId === id);
            if (favorite) {
                favorite.views = views;
            }
            uni.setStorageSync('favorites', state.favorites);
        },
        UPDATE_VIEWS(state, { mediaId, workId }) {
            const work = state.works.find(work => work.workId === workId);
            if (work) {
                const media = work.mediaList.find(m => m.mediaId === mediaId);
                if (media) {
                    media.views += 1;
                }
                uni.setStorageSync('works', state.works);
            }
        }
    },
    actions: {
        setUserInfo({ commit }, info) {
            commit('SET_USER_INFO', info);
            uni.setStorageSync('userLoginInfo', info);
        },
        clearUserInfo({ commit }) {
            commit('CLEAR_USER_INFO');
        },
        setIsLogin({ commit }, isLogin) {
            commit('SET_IS_LOGIN', isLogin);
        },
        addReceivedRedEnvelope({ commit, state }, redEnvelope) {
            let updatedList = state.receivedRedEnvelopes.slice();
            updatedList.push(redEnvelope);
            commit('SET_RECEIVED_RED_ENVELOPES', updatedList);
        },
        submitComment({ commit }, comment) {
            commit('ADD_COMMENT', comment);
        },
        updateCommentField({ commit }, payload) {
            commit('UPDATE_COMMENT_FIELD', payload);
        },

        loadCommentsFromCache({ commit, state }) {
            if (state.comments.length > 0) return; // 已有评论，不重复加载
            const cachedComments = uni.getStorageSync('comments') || [];
            commit('setComments', cachedComments);
        },
        saveCommentToCacheAndStore({ commit }, comment) {
            commit('ADD_COMMENT', comment);
            let commentsCache = uni.getStorageSync('comments') || [];
            commentsCache.unshift(comment);
            uni.setStorageSync('comments', commentsCache);
        },
        saveUserInfoToCache({ commit }, { userInfo, isLogin }) {
            uni.setStorageSync('userLoginInfo', userInfo);
            uni.setStorageSync('isLogin', isLogin);
            commit('SAVE_USER_INFO_TO_STATE', { userInfo, isLogin });
        },
        loadUserInfoFromCache({ commit, state }) {
            const userInfo = uni.getStorageSync('userLoginInfo') || null;
            const isLogin = uni.getStorageSync('isLogin') || false;
            commit('SAVE_USER_INFO_TO_STATE', { userInfo, isLogin });
        },
        saveReceivedRedEnvelopesToCache({ commit, state }) {
            uni.setStorageSync('receivedRedEnvelopes', state.receivedRedEnvelopes);
        },
        saveEnvelopeToCache({ commit }, receivedRedEnvelopes) {
            commit('ADD_ENVELOPE', receivedRedEnvelopes);
            let envelopesCache = uni.getStorageSync('receivedRedEnvelopes') || [];
            envelopesCache.unshift(receivedRedEnvelopes);
            uni.setStorageSync('receivedRedEnvelopes', envelopesCache);
        },
        loadReceivedRedEnvelopesFromCache({ commit, state }) {

            if (state.receivedRedEnvelopes.length > 0) return;
            const receivedRedEnvelopes = uni.getStorageSync('receivedRedEnvelopes') || [];
            commit('SAVE_ENVELOPE', receivedRedEnvelopes);
        },

        saveOrdersToCache({ commit }, orders) {
            commit('ADD_ORDERS', orders);
            let ordersCache = uni.getStorageSync('orders') || [];
            ordersCache.unshift(orders);
            uni.setStorageSync('orders', ordersCache);
        },
        loadOrdersFromCache({ commit, state }) {
            if (state.orders.length > 0) return;
            const orders = uni.getStorageSync('orders') || [];
            commit('SAVE_ORDERS', orders);
        },
        updateOrderStatus({ commit }, payload) {
            commit('UPDATE_ORDER', payload);
        },
        updateReceivedRedEnvelopesStatus({ commit }, payload) {
            commit('UPDATE_ENVELOPES', payload);
        },

        saveFavoritesToCache({ commit }, favorite) {
            commit('ADD_FAVORITES', favorite);
            let favoritesCache = uni.getStorageSync('favorites') || [];
            favoritesCache.unshift(favorite);
            uni.setStorageSync('favorites', favoritesCache);
        },

        loadFavoritesFromCache({ commit, state }) {
            if (state.favorites.length > 0) return;
            const favorites = uni.getStorageSync('favorites') || [];
            commit('SAVE_FAVORITES', favorites);
        },
        deleteFavorite({ commit }, id) {
            commit('REMOVE_FAVORITES', id);
        },
        saveMerchantsToCache({ commit }, merchant) {
            commit('ADD_MERCHANTS', merchant);
            let merchantsCache = uni.getStorageSync('merchants') || [];
            merchantsCache.unshift(merchant);
            uni.setStorageSync('merchants', merchantsCache);
        },
        loadMerchantsFromCache({ commit, state }) {
            if (state.merchants.length > 0) return;
            const merchants = uni.getStorageSync('merchants') || [];
            commit('SAVE_MERCHANTS', merchants);
        },
        deleteMerchants({ commit }, id) {
            commit('REMOVE_MERCHANTS', id);
        },

        saveWorksToCache({ commit }, work) {
            commit('ADD_WORKS', work);
            let worksCache = uni.getStorageSync('works') || [];
            worksCache.unshift(work);
            uni.setStorageSync('works', worksCache);
        },

        loadWorksFromCache({ commit, state }) {
            if (state.works.length > 0) return;
            const feedbacks = uni.getStorageSync('works') || [];
            commit('SAVE_WORKS', feedbacks);
        },

        saveFeedbacksToCache({ commit }, feedbacks) {
            commit('ADD_FEEDBACKS', feedbacks);
            let feedbacksCache = uni.getStorageSync('feedbacks') || [];
            feedbacksCache.unshift(feedbacks);
            uni.setStorageSync('feedbacks', feedbacksCache);
        },

        loadFeedbacksFromCache({ commit, state }) {
            if (state.feedbacks.length > 0) return;
            const feedbacks = uni.getStorageSync('feedbacks') || [];
            commit('SAVE_FEEDBACKS', feedbacks);
        },
        updateWorkLike({ commit }, payload) {
            commit('UPDATE_WORK_LIKE', payload);
        },
        updateFavoriteView({ commit }, payload) {
            commit('UPDATE_FAVORTITE_VIEW', payload);
        }

    },
    getters: {
        getUserInfo: state => state.userLoginInfo,
        getIsLogin: state => state.isLogin,
        getReceivedRedEnvelopes: state => state.receivedRedEnvelopes,
        getOrders: state => state.orders,
        getFavorites: state => state.favorites,
        getMerchants: state => state.merchants,
        getWorks: state => state.works,
        getFeedbacks: state => state.feedbacks,
        getComments: state => state.comments,
        getWorkSpots(state) {
            return state.works.flatMap(work =>
                work.mediaList.map((media, index) => ({
                    workId: work.workId,
                    mediaId: media.mediaId,
                    imageUrl: media.type === "image" ? media.url : "",
                    videoUrl: media.type === "video" ? media.url : "",
                    type: media.type,
                    title: work.title,
                    desc: "",
                    avatar: work.avatar,
                    author: work.author,
                    timestamp: work.timestamp,
                    likes: media.likes || 0,
                    isLiked: media.isLiked || false,
                    views: work.views || 0
                }))
            );
        }
    }
});