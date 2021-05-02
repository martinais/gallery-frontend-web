import { createApp, h } from 'vue'
//import App from './App.vue'

import LoginPage from './pages/LoginPage.vue'
import HomePage from './pages/HomePage.vue'
import GalleryPage from './pages/GalleryPage.vue'

const NotFoundComponent = { template: '<p>Page not found</p>' }

const routes = {
  '/': LoginPage,
  '/home': HomePage,
  '/gallery': GalleryPage
}

const SimpleRouter = {
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

createApp(SimpleRouter).mount('#app')
