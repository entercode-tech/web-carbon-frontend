import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'

import './css/main.css'

// Init Pinia
const pinia = createPinia()

// Create Vue app

// Init main store
const mainStore = useMainStore(pinia)

// Fetch sample data
mainStore.fetchSampleClients()
mainStore.fetchSampleHistory()

const clearLocalStorage = () => {
  localStorage.removeItem('dataUser');
  localStorage.removeItem('access_token');
};

const startTimer = () => {
  let timer;
  const inactivityTime = 2 * 60 * 1000;

  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      clearLocalStorage();
    }, inactivityTime);
  };

  window.onload = resetTimer;
  window.onmousemove = resetTimer;
  window.onkeypress = resetTimer;
};

createApp(App).use(router).use(pinia).mount('#app') .$nextTick(() => {
    startTimer();
  });

// Default title tag
const defaultDocumentTitle = 'Carbon'

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})
