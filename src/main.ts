import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './style.css'
import App from './App.vue'
import {QueryClient, VueQueryPlugin} from "@tanstack/vue-query";

const app = createApp(App);
const pinia = createPinia();

const queryClient = new QueryClient();
app.use(VueQueryPlugin, { queryClient });

app.use(pinia);

app.mount('#app');
