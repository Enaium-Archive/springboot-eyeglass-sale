import { defineComponent, ref } from 'vue'
import { NButton, NCard, NForm, NFormItem, NInput, type FormInst, useMessage } from 'naive-ui'
import type { MemberInput, Session } from '@/__generated/model/static'
import { api } from '@/common/ApiInstance'
import type { ApiErrors } from '@/__generated'
import { useSessionStore } from '@/store'
import { useRouter } from 'vue-router'

const Login = defineComponent(() => {
  const router = useRouter()
  const message = useMessage()
  const session = useSessionStore()
  const input = ref<MemberInput>({})
  const inputRef = ref<FormInst | null>(null)

  const submit = () => {
    inputRef.value?.validate((error) => {
      if (error) return
      api.sessionController
        .login({
          body: input.value
        })
        .then((res: Session) => {
          session.setSession(res)
          message.success('登录成功')
          router.push('/')
        })
        .catch((error: ApiErrors['sessionController']['login']) => {
          switch (error.code) {
            case 'USERNAME_NOT_FOUND':
              message.error('用户名不存在')
              break
            case 'PASSWORD_NOT_MATCHED':
              message.error('密码错误')
              break
          }
        })
    })
  }

  return () => (
    <div class={'flex justify-center items-center h-screen'}>
      <NCard class={'w-1/4'} v-slots={{ header: <div>登录</div> }}>
        <NForm model={input.value} ref={inputRef}>
          <NFormItem
            label={'用户名'}
            path={'username'}
            rule={[{ required: true, message: '请输入用户名', trigger: ['blur', 'input'] }]}
          >
            <NInput v-model:value={input.value.username} />
          </NFormItem>
          <NFormItem
            label={'密码'}
            path={'password'}
            rule={[{ required: true, message: '请输入用户名', trigger: ['blur', 'input'] }]}
          >
            <NInput v-model:value={input.value.password} />
          </NFormItem>
          <NButton class={'w-full'} type={'primary'} onClick={submit}>
            登录
          </NButton>
        </NForm>
      </NCard>
    </div>
  )
})

export default Login
