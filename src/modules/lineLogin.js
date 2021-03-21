import { useStore } from 'vuex';

export default () => {
    const store = useStore();

    const lineLogin = () => {
        const { channelID, callbackURL, state } = store.getters['login/lineInfo'];
        let url = 'https://access.line.me/oauth2/v2.1/authorize?';
        url += 'response_type=code';
        url += '&client_id=' + channelID;
        url += '&redirect_uri=' + callbackURL;
        url += '&state=' + state;
        url += '&scope=openid%20email%20profile';
        location.href = url; // 前往 line 登入畫面
    };

    return { lineLogin };
};
