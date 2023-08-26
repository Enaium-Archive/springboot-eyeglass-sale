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
  NInputNumber,
  NSelect,
  NCard,
  NTag,
  NButtonGroup,
  NPopconfirm
} from 'naive-ui'
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import { defineComponent, ref } from 'vue'
import dayjs from 'dayjs'
import type { CategoryDto, CommodityDto } from '@/__generated/model/dto'
import { useSessionStore } from '@/store'

const Commodity = defineComponent(() => {
  const message = useMessage()
  const session = useSessionStore()

  const currentCommodityRef = ref<FormInst | undefined>(undefined)
  const currentCommodity = ref<CommodityInput | undefined>(undefined)

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
      title: '分类',
      key: 'category.name'
    },
    {
      title: '创建时间',
      key: 'createdTime',
      render: (row) => <div>{dayjs(row.createdTime).format('YYYY-MM-DD HH:mm:ss')}</div>
    },
    {
      title: '操作',
      key: 'action',
      render: (row: CommodityDto['CommodityController/DEFAULT']) => {
        return (
          <NButtonGroup>
            <NButton type={'primary'} onClick={() => (currentCommodity.value = { ...row })}>
              修改
            </NButton>
            <NPopconfirm
              v-slots={{ trigger: <NButton type={'error'}>删除</NButton> }}
              onPositiveClick={() => {
                api.commodityController
                  .removeCommodity({ id: row.id })
                  .then(() => {
                    message.success('删除成功')
                    refetch()
                  })
                  .catch(() => {
                    message.error('请先删除该商品下的所有订单')
                  })
              }}
            >
              你确定要删除吗？
            </NPopconfirm>
          </NButtonGroup>
        )
      }
    }
  ]

  const [options, setOptions] = useImmer<RequestOf<typeof api.commodityController.getCommodities>>(
    {}
  )

  const { data, refetch } = useQuery({
    queryKey: ['commodity', options],
    queryFn: () => api.commodityController.getCommodities(options.value)
  })

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.categoryController.getCategories()
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
        message.success('上传成功')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const removeCategory = (id: number) => {
    api.categoryController
      .removeCategory({ id })
      .then(() => {
        message.success('删除成功')
        categories.refetch()
      })
      .catch(() => {
        message.error('请先删除该分类下的所有商品')
      })
  }

  const newCategory = ref('')
  const showNewCategory = ref(false)

  return () =>
    data.value == undefined ? (
      <NSpin />
    ) : (
      <>
        <NCard v-slots={{ header: <div>商品管理</div> }}>
          <NButton type={'primary'} onClick={() => (currentCommodity.value = { category: {} })}>
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
        </NCard>
        <div class={'mt-5'} />
        <NCard v-slots={{ header: <div>分类管理</div> }}>
          {categories.data.value == undefined ? (
            <NSpin />
          ) : (
            <>
              <div>
                <NButton type={'primary'} onClick={() => (showNewCategory.value = true)}>
                  新增
                </NButton>
                <div class={'mt-5 flex gap-5 flex-wrap'}>
                  {categories.data.value.map((item: CategoryDto['DEFAULT']) => {
                    return (
                      <NTag
                        key={item.id}
                        type={'primary'}
                        closable
                        onClose={() => removeCategory(item.id)}
                      >
                        {item.name}
                      </NTag>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </NCard>
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
                <NUpload customRequest={uploadImage} listType={'image-card'} max={1} />
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
              <NFormItem
                label={'分类'}
                path={'category.name'}
                rule={{
                  required: true,
                  message: '请选择分类',
                  trigger: ['blur', 'change']
                }}
              >
                <NSelect
                  filterable
                  tag
                  value={currentCommodity.value.category.name}
                  onUpdateValue={(value: string) => {
                    currentCommodity.value = {
                      ...currentCommodity.value!,
                      category: {
                        name: value
                      }
                    }
                  }}
                  options={categories.data.value as []}
                  labelField={'name'}
                  valueField={'name'}
                />
              </NFormItem>
              <NFormItem>
                <NButton type={'primary'} onClick={submit}>
                  提交
                </NButton>
              </NFormItem>
            </NForm>
          )}
        </NModal>
        <NModal
          preset={'confirm'}
          show={showNewCategory.value}
          onClose={() => (showNewCategory.value = false)}
        >
          <div class={'flex gap-5'}>
            <NInput v-model:value={newCategory.value} />
            <NButton
              type={'primary'}
              onClick={() => {
                if (newCategory.value.trim() == '') {
                  message.error('请输入分类名')
                  return
                }

                api.categoryController
                  .saveCategory({ body: { name: newCategory.value } })
                  .then(() => {
                    message.success('保存成功')
                    newCategory.value = ''
                    categories.refetch()
                  })
                  .catch(() => {
                    message.error('分类名已存在')
                  })
              }}
            >
              提交
            </NButton>
          </div>
        </NModal>
      </>
    )
})

export default Commodity
