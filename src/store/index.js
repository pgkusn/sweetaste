import { createStore } from 'vuex';

export default createStore({
    state: {
        tabletWidth: false
    },
    mutations: {
        updateDevice (state, payload) {
            state[payload.deviceType + 'Width'] = payload.value;
        }
    },
    actions: {
    },
    modules: {
    }
});
