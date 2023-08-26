import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

const Message = defineComponent(() => {
  window.$message = useMessage()
  return () => <div></div>
})

export default Message
