import { createApp } from 'vue';
import App from '@/App.vue';
import { router } from '@/router';
import '@/style.css';

import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/archivo';

createApp(App).use(router).mount('#app');
