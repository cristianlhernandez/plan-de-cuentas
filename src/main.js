import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App)
app.use(Quasar, quasarUserOptions)
app.use(router)

window.Office.onReady(() => {
    app.mount('#app')
})
