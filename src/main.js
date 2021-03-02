import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import device from 'current-device';
import { ElCollapse, ElCollapseItem } from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'nprogress/nprogress.css';

createApp(App).use(store).use(router).use(ElCollapse).use(ElCollapseItem).mount('#app');
