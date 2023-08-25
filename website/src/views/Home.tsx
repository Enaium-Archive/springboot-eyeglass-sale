import type { RequestOf } from '@/__generated'
import { BASE_URL, api } from '@/common/ApiInstance'
import { useImmer } from '@/hooks/useImmer'
import { useQuery } from '@tanstack/vue-query'
import { NCard, NEllipsis, NGrid, NGridItem, NImage, NPagination, NSpin } from 'naive-ui'
import { defineComponent } from 'vue'

const Home = defineComponent(() => {
  const [options, setOptions] = useImmer<RequestOf<typeof api.commodityController.getCommodities>>(
    {}
  )

  const { data } = useQuery({
    queryKey: ['commodity', options],
    queryFn: () => api.commodityController.getCommodities(options.value)
  })

  return () =>
    data.value == undefined ? (
      <NSpin />
    ) : (
      <div class={'container mx-auto'}>
        <NCard class={'mt-5'}>
          <NGrid xGap={5} yGap={5} cols={6}>
            {data.value.content.map((item) => {
              return (
                <NGridItem key={item.id}>
                  <NCard
                    v-slots={{
                      cover: () => (
                        <NImage
                          class={'w-full h-full'}
                          src={`${BASE_URL}/images/${item.image.id}/`}
                          alt=""
                        />
                      )
                    }}
                  >
                    <NEllipsis>{item.name}</NEllipsis>
                    <div>
                      <span class={'text-2xl text-red-500'}>￥{item.price}</span>
                    </div>
                  </NCard>
                </NGridItem>
              )
            })}
          </NGrid>
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
      </div>
    )
})

export default Home
