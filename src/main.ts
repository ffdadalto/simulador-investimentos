import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue';
import Aura from '@primevue/themes/aura';

import '@/style.css';
import '@/assets/layout/bootstrap/css/bootstrap.min.css';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: 'light'
        }
    }
});
app.mount('#app');