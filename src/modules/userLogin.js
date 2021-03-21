import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';

export default () => {
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
        const userProfile = {
            uid,
            displayName,
            email
        };
        store.commit('login/setUserProfile', userProfile);
        localStorage.setItem('userProfile', JSON.stringify(userProfile));

        const beforeLoginPage = sessionStorage.getItem('beforeLoginPage') || 'Home';
        router.push({ name: beforeLoginPage });
        sessionStorage.removeItem('beforeLoginPage');
    };

    return {
        loginInfo,
        userLogin
    };
};