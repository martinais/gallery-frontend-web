import { createApp, h } from 'vue'

import LoginPage from './pages/LoginPage.vue'
import HomePage from './pages/HomePage.vue'
import GalleryPage from './pages/GalleryPage.vue'

const NotFoundComponent = { template: '<p>Page not found</p>' }

const routes = {
  '/': LoginPage,
  '/home': HomePage,
  '/album': GalleryPage
}

const router = {
  data: () => ({
    currentRoute: window.location.pathname
  }),
  computed: {
    CurrentComponent() {
      return routes[this.currentRoute] || NotFoundComponent
    }
  },
  render() {
    return h(this.CurrentComponent)
  }
}

createApp(router).mount('#app')
