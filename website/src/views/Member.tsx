import type { RequestOf } from '@/__generated'
import type { MemberInput } from '@/__generated/model/static'
import { api } from '@/common/ApiInstance'
import { useImmer } from '@/hooks/useImmer'
import { useQuery } from '@tanstack/vue-query'
import {
  NButton,
  NDataTable,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NPagination,
  NRadio,
  NRadioGroup,
  NSpin,
  type FormInst,
  useMessage
} from 'naive-ui'
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import { defineComponent, ref } from 'vue'
import dayjs from 'dayjs'
import type { MemberDto } from '@/__generated/model/dto'

const Member = defineComponent(() => {
  const message = useMessage()

  const currentMember = ref<MemberInput | undefined>(undefined)
  const currentMemberRef = ref<FormInst | undefined>(undefined)

  const columns: TableColumn<MemberDto['MemberController/DEFAULT']>[] = [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: '用户名',
      key: 'username'
    },
    {
      title: '手机',
      key: 'phone'
    },
    {
      title: '性别',
      key: 'gender'
    },
    {
      title: '创建时间',
      key: 'createdTime',
      render: (row) => <div>{dayjs(row.createdTime).format('')}</div>
    },
    {
      title: '操作',
      key: 'action',
      render: (row: MemberDto['MemberController/DEFAULT']) => (
        <NButton type={'primary'} onClick={() => (currentMember.value = { ...row })}>
          修改
        </NButton>
      )
    }
  ]

  const [options, setOptions] = useImmer<RequestOf<typeof api.memberController.getMembers>>({})

  const { data, refetch } = useQuery({
    queryKey: ['member', options],
    queryFn: () => api.memberController.getMembers(options.value)
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
          currentMember.value = undefined
          refetch()
        })
    })
  }

  return () =>
    data.value == undefined ? (
      <NSpin />
    ) : (
      <>
        <NDataTable data={data.value.content as []} columns={columns} />
        {data.value?.totalPages > 1 && (
          <div class={'mt-5 flex-row-reverse'}>
            <NPagination
              page={data.value?.number + 1}
              pageCount={data.value?.totalPages}
              onUpdatePage={(page) => {
                setOptions((draft) => {
                  draft.page = page - 1
                })
              }}
              onUpdatePageSize={(pageSize) => {
                setOptions((draft) => {
                  draft.size = pageSize
                })
              }}
            />
          </div>
        )}
        <NModal
          show={currentMember.value != undefined}
          preset="dialog"
          onClose={() => (currentMember.value = undefined)}
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

export default Member
