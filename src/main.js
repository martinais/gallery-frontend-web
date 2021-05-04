import { createApp, h } from 'vue'

import LoginPage from './pages/LoginPage.vue'
import HomePage from './pages/HomePage.vue'
import GalleryPage from './pages/GalleryPage.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash)
library.add(faCheck)
library.add(faTimes)

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

const app = createApp(router)
app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
