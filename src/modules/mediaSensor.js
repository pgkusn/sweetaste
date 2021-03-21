import { reactive, toRefs } from 'vue';

export default () => {
    const screens = reactive({
        md: null
    });

    const mediaSensor = ({ width, size }) => {
        const resizeWidth = pMatchMedia => (screens[size] = pMatchMedia.matches);
        const mm = window.matchMedia(`(min-width: ${width}px)`);
        mm.addListener(resizeWidth);
        resizeWidth(mm);
    };

    mediaSensor({
        width: 768,
        size: 'md'
    });

    return toRefs(screens);
};