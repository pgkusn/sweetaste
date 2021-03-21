import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default () => {
    const store = useStore();
    const router = useRouter();

    const fbLogin = () => {
        const getStatus = res => {
            if (res.status === 'connected') {
                // get user profile
                FB.api('/me', 'GET', { fields: ['picture', 'name', 'email'] }, res => {
                    const userProfile = {
                        uid: res.id,
                        displayName: res.name,
                        email: res.email,
                        photoURL: res.picture.data.url
                    };
                    store.commit('login/setUserProfile', userProfile);
                    localStorage.setItem('userProfile', JSON.stringify(userProfile));

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