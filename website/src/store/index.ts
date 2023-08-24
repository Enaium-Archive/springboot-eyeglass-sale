import type { Session } from "@/__generated/model/static"
import { createPinia, defineStore } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
const store = createPinia()

store.use(piniaPluginPersistedstate)

export default store

export const useSessionStore = defineStore('session-store', {
  state: () => <{ session: Session }>{ session: {} },
  actions: {
    setSession(session: Session) {
      this.session = session
    }
  },
  persist: true
})