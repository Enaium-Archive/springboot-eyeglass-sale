import { NConfigProvider, NMessageProvider, NWatermark, useMessage, zhCN } from 'naive-ui'
import { defineComponent } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import Message from './components/Message'

const App = defineComponent(() => {
  window.$router = useRouter()

  return () => (
    <NConfigProvider locale={zhCN}>
      <NMessageProvider>
        <Message />
        <RouterView />
      </NMessageProvider>
    </NConfigProvider>
  )
})

export default App
