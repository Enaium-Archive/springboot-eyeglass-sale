import type { MemberInput } from '@/__generated/model/static'
import { api } from '@/common/ApiInstance'
import { useSessionStore } from '@/store'
import { useQuery } from '@tanstack/vue-query'
import dayjs from 'dayjs'
import {
  NButton,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NRadio,
  NRadioGroup,
  NSpin,
  type FormInst,
  useMessage,
  NTag
} from 'naive-ui'
import { defineComponent, ref } from 'vue'

const MemberDetail = defineComponent(() => {
  const session = useSessionStore()
  const message = useMessage()

  const showEditMember = ref(false)
  const currentMember = ref<MemberInput>({
    id: session.session.id
  })
  const currentMemberRef = ref<FormInst | undefined>(undefined)

  const { data, refetch } = useQuery({
    queryKey: ['member-detail', session.session.id],
    queryFn: () =>
      api.memberController.getMember({
        id: session.session.id
      })
  })

  const submit = () => {
    currentMemberRef.value?.validate((error) => {
      if (error) return
      api.memberController
        .saveMember({
          body: currentMember.value!
        })
        .then(() => {
          message.success('保存成功')
          showEditMember.value = false
          refetch()
        })
    })
  }

  return () =>
    data.value === undefined ? (
      <NSpin />
    ) : (
      <>
        <NCard class={'w-1/3'}>
          <div class={'flex justify-between'}>
            <div class={'flex flex-col text-2xl'}>
              <div>
                <span>用户名：</span>
                <span>{data.value.username}</span>
              </div>
              <div>
                <span>手机：</span>
                <span>{data.value.phone}</span>
              </div>
              <div>
                <span>性别：</span>
                <span>{data.value.gender === 'FEMALE' ? '男' : '女'}</span>
              </div>
              <div>
                <span>角色：</span>
                <NTag type={'primary'}>{data.value.role === 'ADMIN' ? '管理员' : '普通用户'}</NTag>
              </div>
              <div>
                <span>创建时间：</span>
                <span>{dayjs(data.value.createdTime).format('YYYY-MM-DD HH:mm:ss')}</span>
              </div>
            </div>
            <NButton type={'primary'} class={'ml-2'} onClick={() => (showEditMember.value = true)}>
              修改
            </NButton>
          </div>
        </NCard>
        <NModal
          show={showEditMember.value}
          preset="dialog"
          onClose={() => (showEditMember.value = false)}
        >
          {currentMember.value != undefined && (
            <NForm model={currentMember.value} ref={currentMemberRef}>
              <NFormItem
                label={'手机'}
                path={'phone'}
                rule={[{ required: true, message: '请输入手机号', trigger: ['blur', 'input'] }]}
              >
                <NInput v-model:value={currentMember.value.phone} />
              </NFormItem>
              <NFormItem
                label={'性别'}
                path={'gender'}
                rule={[{ required: true, message: '请输入性别', trigger: ['blur', 'change'] }]}
              >
                <NRadioGroup v-model:value={currentMember.value.gender}>
                  <NRadio label={'男'} value={'FEMALE'} />
                  <NRadio label={'女'} value={'MALE'} />
                </NRadioGroup>
              </NFormItem>
              <NFormItem>
                <NButton type={'primary'} onClick={submit}>
                  提交
                </NButton>
              </NFormItem>
            </NForm>
          )}
        </NModal>
      </>
    )
})

export default MemberDetail
