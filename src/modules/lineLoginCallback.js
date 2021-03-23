import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default async () => {
    const store = useStore();
    const router = useRouter();

    const removeQueryString = () => {
        history.replaceState({}, '', location.href.split(/[?#]/)[0]);
    };

    const { channelID, channelSecret, callbackURL, state: urlState } = store.getters['login/lineInfo'];

    // 1. check url
    const searchParams = (new URL(document.location)).searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    if (!code || urlState !== state) return;

    // 2. get token
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', callbackURL);
    params.append('client_id', channelID);
    params.append('client_secret', channelSecret);
    const tokenData = await store.dispatch('login/getLineToken', params);
    if (!tokenData.success) {
        alertify.error(tokenData.message);
        removeQueryString();
        return;
    }

    // 3. get user profile
    const profileData = await store.dispatch('login/getLineProfile', tokenData.access_token);
    if (!profileData.success) {
        alertify.error(profileData.message);
        removeQueryString();
        return;
    }
    store.dispatch('login/setUserProfileHandler', {
        uid: profileData.userId,
        displayName: profileData.displayName,
        photoURL: profileData.pictureUrl
    });

    removeQueryString();
    const beforeLoginPage = sessionStorage.getItem('beforeLoginPage') || 'Home';
    router.push({ name: beforeLoginPage });
    sessionStorage.removeItem('beforeLoginPage');
};