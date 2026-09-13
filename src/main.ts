import { createApp } from 'vue';

// Schriften kommen aus npm, nicht von fonts.googleapis.com.
// Damit gibt es keinen Request an Google — DSGVO-seitig sauber und schneller.
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/archivo';

import App from '@/App.vue';
import '@/style.css';

// So startet eine Vue-App: App-Komponente an #app haengen.
createApp(App).mount('#app');
