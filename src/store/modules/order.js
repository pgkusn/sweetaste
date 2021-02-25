import axios from 'axios';
import API from '@/data/api.js';

export default {
    namespaced: true,
    actions: {
        async getOrderList (context, uid) {
            try {
                const { data } = await axios({
                    method: API.orderList.method,
                    url: `${API.orderList.url}/${uid}`,
                    baseURL: 'https://kenge-mock-api.herokuapp.com/sweetaste'
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
                    baseURL: 'https://kenge-mock-api.herokuapp.com/sweetaste',
                    data: payload
                });
                return data;
            }
            catch (error) {
                console.error(error.message);
                return {
                    status: 'error',
                    message: '網路錯誤 請稍後再試'
                };
            }
        }
    }
}
;
