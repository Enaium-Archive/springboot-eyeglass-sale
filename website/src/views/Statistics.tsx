import { api } from '@/common/ApiInstance'
import { useQuery } from '@tanstack/vue-query'
import { NCard, NNumberAnimation, NStatistic } from 'naive-ui'
import { defineComponent } from 'vue'

const Statistics = defineComponent(() => {
  const monthly = useQuery({
    queryKey: ['monthly'],
    queryFn: () => api.orderController.getMonthlyCount()
  })

  const quarterly = useQuery({
    queryKey: ['quarterly'],
    queryFn: () => api.orderController.getQuarterlyCount()
  })

  return () => (
    <>
      <div class={'flex gap-5'}>
        <NCard>
          <NStatistic label={'这个月一共有'} tabularNums v-slots={{ suffix: <div>个订单</div> }}>
            <NNumberAnimation from={0} to={monthly.data.value} />
          </NStatistic>
        </NCard>
        <NCard>
          <NStatistic label={'这个季度一共有'} tabularNums v-slots={{ suffix: <div>个订单</div> }}>
            <NNumberAnimation from={0} to={quarterly.data.value} />
          </NStatistic>
        </NCard>
      </div>
    </>
  )
})

export default Statistics
