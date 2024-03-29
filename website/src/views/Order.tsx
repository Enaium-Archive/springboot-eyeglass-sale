import type { RequestOf } from '@/__generated'
import { api } from '@/common/ApiInstance'
import { useImmer } from '@/hooks/useImmer'
import { useQuery } from '@tanstack/vue-query'
import { NButton, NDataTable, NPagination, NPopconfirm, NSpin, useMessage } from 'naive-ui'
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import { defineComponent } from 'vue'
import type { OrderDto } from '@/__generated/model/dto'
import dayjs from 'dayjs'
import { RouterLink } from 'vue-router'

const Member = defineComponent(() => {
  const message = useMessage()

  const columns: TableColumn<OrderDto['OrderController/DEFAULT']>[] = [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: '商品名',
      key: 'commodity.name',
      render: (row) => (
        <RouterLink to={{ name: 'commodity-detail', params: { id: row.commodity.id } }}>
          {row.commodity.name}
        </RouterLink>
      )
    },
    {
      title: '单价',
      key: 'commodity.price'
    },
    {
      title: '数量',
      key: 'quantity'
    },
    {
      title: '总价',
      key: 'totalPrice',
      render: (row) => <div>{row.commodity.price * row.quantity}</div>
    },
    {
      title: '创建时间',
      key: 'createdTime',
      render: (row) => <div>{dayjs(row.createdTime).format('YYYY-MM-DD HH:mm:ss')}</div>
    },
    {
      title: '操作',
      key: 'action',
      render: (row) => (
        <NPopconfirm
          onPositiveClick={() =>
            api.orderController.removeOrder({ id: row.id }).then(() => {
              message.success('删除成功')
            })
          }
          v-slots={{
            trigger: <NButton type={'error'}>删除</NButton>
          }}
        >
          确认删除？
        </NPopconfirm>
      )
    }
  ]

  const [options, setOptions] = useImmer<RequestOf<typeof api.orderController.getOrders>>({})

  const { data } = useQuery({
    queryKey: ['member', options],
    queryFn: () => api.orderController.getOrders(options.value)
  })

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
      </>
    )
})

export default Member
