import { defineComponent, ref } from 'vue'
import { NButton, NCard, NForm, NFormItem, NInput, type FormInst, useMessage } from 'naive-ui'
import type { MemberInput } from '@/__generated/model/static'
import { api } from '@/common/ApiInstance'
import { RouterLink, useRouter } from 'vue-router'

const Login = defineComponent(() => {
  const router = useRouter()
  const message = useMessage()
  const input = ref<MemberInput>({})
  const inputRef = ref<FormInst | null>(null)

  const submit = () => {
    inputRef.value?.validate((error) => {
      if (error) return
      api.memberController
        .saveMember({
          body: input.value
        })
        .then((res) => {
          router.push('/login')
          message.success('注册成功')
        })
        .catch((err) => {
          message.error('注册失败')
        })
    })
  }

  return () => (
    <div class={'flex justify-center items-center h-screen'}>
      <NCard class={'w-1/4'} v-slots={{ header: <div>注册</div> }}>
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
          <RouterLink to={'/login'}>登录</RouterLink>
          <NButton class={'w-full'} type={'primary'} onClick={submit}>
            注册
          </NButton>
        </NForm>
      </NCard>
    </div>
  )
})

export default Login
