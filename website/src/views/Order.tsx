import type { RequestOf } from '@/__generated'
import { api } from '@/common/ApiInstance'
import { useImmer } from '@/hooks/useImmer'
import { useQuery } from '@tanstack/vue-query'
import { NDataTable, NPagination, NSpin, useMessage } from 'naive-ui'
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import { defineComponent } from 'vue'
import type { OrderDto } from '@/__generated/model/dto'

const Member = defineComponent(() => {
  const message = useMessage()

  const columns: TableColumn<OrderDto['DEFAULT']>[] = [
    {
      title: 'ID',
      key: 'id'
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
