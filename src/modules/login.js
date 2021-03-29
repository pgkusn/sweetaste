import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import firebase from 'firebase/app';
import 'firebase/auth';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';

export const useGoogleLogin = () => {
    const store = useStore();
    const router = useRouter();

    const googleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const { uid, displayName, email, photoURL } = result.user;
                store.dispatch('login/setUserProfileHandler', {
                    uid,
                    displayName,
                    email,
                    photoURL
                });

                const beforeLoginPage = sessionStorage.getItem('beforeLoginPage') || 'Home';
                router.push({ name: beforeLoginPage });
                sessionStorage.removeItem('beforeLoginPage');
            })
            .catch(error => console.error(error.message));
    };

    return { googleLogin };
};

export const useFbLogin = () => {
    const store = useStore();
    const router = useRouter();

    const fbLogin = () => {
        const getStatus = res => {
            if (res.status === 'connected') {
                // get user profile
                FB.api('/me', 'GET', { fields: ['picture', 'name', 'email'] }, res => {
                    store.dispatch('login/setUserProfileHandler', {
                        uid: res.id,
                        displayName: res.name,
                        email: res.email,
                        photoURL: res.picture.data.url
                    });

                    const beforeLoginPage = sessionStorage.getItem('beforeLoginPage') || 'Home';
                    router.push({ name: beforeLoginPage });
                    sessionStorage.removeItem('beforeLoginPage');
                });
            }
        };
        FB.login(getStatus);
    };

    return { fbLogin };
};

export const useLineLogin = () => {
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

export const useLineLoginCallback = async () => {
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

export const useUserLogin = () => {
    const store = useStore();
    const router = useRouter();

    const loginInfo = reactive({
        email: '',
        password: '',
        rememberMe: false
    });

    // 記住我
    if (Cookies.get('userLoginInfo')) {
        const userLoginInfo = JSON.parse(Cookies.get('userLoginInfo'));
        loginInfo.email = userLoginInfo.email;
        loginInfo.password = userLoginInfo.password;
        loginInfo.rememberMe = true;
    }

    const userLogin = async () => {
        const data = await store.dispatch('login/userLogin', {
            email: loginInfo.email.trim(),
            password: loginInfo.password.trim()
        });

        if (!data.success) {
            alertify.error(data.message);
            return;
        }

        alertify.success('登入成功');

        // 記住我
        if (loginInfo.rememberMe) {
            Cookies.set('userLoginInfo', JSON.stringify({ email: loginInfo.email, password: loginInfo.password }, { expires: 7 }));
        }
        else {
            Cookies.remove('userLoginInfo');
        }

        const { localId: uid, displayName, email } = data;
        store.dispatch('login/setUserProfileHandler', {
            uid,
            displayName,
            email
        });

        const beforeLoginPage = sessionStorage.getItem('beforeLoginPage') || 'Home';
        router.push({ name: beforeLoginPage });
        sessionStorage.removeItem('beforeLoginPage');
    };

    return {
        loginInfo,
        userLogin
    };
};

export const checkLogin = () => localStorage.getItem('userProfile');