import API from '@/data/api.js';
import axios from 'axios';

export default {
    namespaced: true,
    actions: {
        async getOrderList (context, uid) {
            try {
                const { data } = await axios({
                    method: API.orderList.method,
                    url: `${API.orderList.url}/${uid}`
                });
                return {
                    success: true,
                    list: data || []
                };
            }
            catch (error) {
                console.error(error.message);
                return {
                    success: false,
                    message: '網路錯誤 請稍後再試'
                };
            }
        },
        async order (context, payload) {
            try {
                const { data } = await axios({
                    method: API.order.method,
                    url: API.order.url,
                    data: payload
                });
                return {
                    success: true,
                    ...data
                };
            }
            catch (error) {
                console.error(error.message);
                return {
                    success: false,
                    message: '網路錯誤 請稍後再試'
                };
            }
        }
    }
};
