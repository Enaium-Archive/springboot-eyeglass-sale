import type { RequestOf } from '@/__generated'
import type { CommodityInput } from '@/__generated/model/static'
import { BASE_URL, api } from '@/common/ApiInstance'
import { useImmer } from '@/hooks/useImmer'
import { useQuery } from '@tanstack/vue-query'
import {
  NButton,
  NDataTable,
  NForm,
  NFormItem,
  NModal,
  NPagination,
  NSpin,
  type FormInst,
  useMessage,
  NPopover,
  NImage,
  NInput,
  NUpload,
  type UploadCustomRequestOptions,
  type UploadInst,
  NGrid,
  NGridItem,
  NInputNumber
} from 'naive-ui'
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import { defineComponent, ref } from 'vue'
import dayjs from 'dayjs'
import type { CommodityDto } from '@/__generated/model/dto'
import { useSessionStore } from '@/store'

const Commodity = defineComponent(() => {
  const message = useMessage()
  const session = useSessionStore()

  const currentCommodity = ref<CommodityInput | undefined>(undefined)
  const currentCommodityRef = ref<FormInst | undefined>(undefined)

  const columns: TableColumn<CommodityDto['CommodityController/DEFAULT']>[] = [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: '商品名',
      key: 'name'
    },
    {
      title: '描述',
      key: 'description',
      render: (row) => (
        <NPopover trigger="hover" v-slots={{ trigger: <div>查看</div> }}>
          {row.description}
        </NPopover>
      )
    },
    {
      title: '图片',
      key: 'image',
      render: (row) => <NImage width={50} src={`${BASE_URL}/images/${row.image.id}/`} />
    },
    
    {
      title: '价格',
      key: 'price'
    },
    {
      title: '最小度数',
      key: 'minimumPrescription'
    },
    {
      title: '最大度数',
      key: 'maximumPrescription'
    },
    {
      title: '创建时间',
      key: 'createdTime',
      render: (row) => <div>{dayjs(row.createdTime).format('YYYY-MM-DD HH:mm:ss')}</div>
    },
    {
      title: '操作',
      key: 'action',
      render: (row: CommodityDto['CommodityController/DEFAULT']) => (
        <NButton type={'primary'} onClick={() => (currentCommodity.value = { ...row })}>
          修改
        </NButton>
      )
    }
  ]

  const [options, setOptions] = useImmer<RequestOf<typeof api.commodityController.getCommodities>>(
    {}
  )

  const { data, refetch } = useQuery({
    queryKey: ['commodity', options],
    queryFn: () => api.commodityController.getCommodities(options.value)
  })

  const submit = () => {
    currentCommodityRef.value?.validate((error) => {
      if (error) return
      api.commodityController
        .saveCommodity({
          body: currentCommodity.value!
        })
        .then(() => {
          message.success('保存成功')
          currentCommodity.value = undefined
          refetch()
        })
    })
  }

  const uploadRef = ref<UploadInst | null>(null)

  const uploadImage = (options: UploadCustomRequestOptions) => {
    const formData = new FormData()
    if (options.file.file) {
      formData.append('file', options.file.file)
    }

    fetch(`${BASE_URL}/images/`, {
      method: 'POST',
      body: formData,
      headers: {
        token: session.session.token!
      }
    })
      .then((response) => response.json())
      .then((data: number) => {
        currentCommodity.value = {
          ...currentCommodity.value!,
          //@ts-ignore
          image: {
            id: data
          }
        }
        uploadRef.value?.clear()
        message.success('上传成功')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return () =>
    data.value == undefined ? (
      <NSpin />
    ) : (
      <>
        <NButton type={'primary'} onClick={() => (currentCommodity.value = {})}>
          新增
        </NButton>
        <div class={'mt-5'} />
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
          show={currentCommodity.value != undefined}
          preset="dialog"
          onClose={() => (currentCommodity.value = undefined)}
        >
          {currentCommodity.value != undefined && (
            <NForm model={currentCommodity.value} ref={currentCommodityRef}>
              <NFormItem
                label={'名称'}
                path={'name'}
                rule={[{ required: true, message: '请输入名称', trigger: ['blur', 'input'] }]}
              >
                <NInput v-model:value={currentCommodity.value.name} />
              </NFormItem>
              <NFormItem
                label={'描述'}
                path={'description'}
                rule={[{ required: true, message: '请输入描述', trigger: ['blur', 'input'] }]}
              >
                <NInput type={'textarea'} v-model:value={currentCommodity.value.description} />
              </NFormItem>
              <NFormItem
                label={'图片'}
                path={'image.id'}
                rule={[
                  {
                    required: true,
                    message: '请上传图片',
                    trigger: ['blur', 'input'],
                    type: 'number'
                  }
                ]}
              >
                <NUpload
                  ref={uploadRef}
                  customRequest={uploadImage}
                  listType={'image-card'}
                  max={1}
                />
              </NFormItem>
              <NFormItem
                label={'价格'}
                path={'price'}
                rule={[
                  {
                    required: true,
                    message: '请输入价格',
                    trigger: ['blur', 'input'],
                    type: 'number'
                  }
                ]}
              >
                <NInputNumber class={'w-full'} v-model:value={currentCommodity.value.price} />
              </NFormItem>
              <NGrid xGap={5} cols={2}>
                <NGridItem>
                  <NFormItem
                    label={'最小度数'}
                    path={'minimumPrescription'}
                    rule={[
                      {
                        required: true,
                        message: '请输入最小度数',
                        trigger: ['blur', 'input'],
                        type: 'number'
                      }
                    ]}
                  >
                    <NInputNumber v-model:value={currentCommodity.value.minimumPrescription} />
                  </NFormItem>
                </NGridItem>
                <NGridItem>
                  <NFormItem
                    label={'最大度数'}
                    path={'maximumPrescription'}
                    rule={[
                      {
                        required: true,
                        message: '请输入最大度数',
                        trigger: ['blur', 'input'],
                        type: 'number'
                      }
                    ]}
                  >
                    <NInputNumber v-model:value={currentCommodity.value.maximumPrescription} />
                  </NFormItem>
                </NGridItem>
              </NGrid>

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

export default Commodity
