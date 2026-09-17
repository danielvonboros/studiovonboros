import { createApp } from 'vue';
import App from '@/App.vue';
import { router } from '@/router';
import { i18n } from '@/i18n';
import {createHead} from '@unhead/vue/client';
import '@/style.css';

import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/archivo';

document.documentElement.lang = i18n.global.locale.value;

const head = createHead();

createApp(App).use(router).use(i18n).use(head).mount('#app');
