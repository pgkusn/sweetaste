import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';

export default () => {
    const store = useStore();
    const router = useRouter();

    const googleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const { uid, displayName, email, photoURL } = result.user;
                const userProfile = {
                    uid,
                    displayName,
                    email,
                    photoURL
                };
                store.commit('login/setUserProfile', userProfile);
                localStorage.setItem('userProfile', JSON.stringify(userProfile));

                const beforeLoginPage = sessionStorage.getItem('beforeLoginPage') || 'Home';
                router.push({ name: beforeLoginPage });
                sessionStorage.removeItem('beforeLoginPage');
            })
            .catch(error => console.error(error.message));
    };

    return { googleLogin };
};