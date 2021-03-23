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