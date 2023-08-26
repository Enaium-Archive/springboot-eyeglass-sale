import type { RequestOf } from '@/__generated'
import type { OrderInput } from '@/__generated/model/static'
import { BASE_URL, api } from '@/common/ApiInstance'
import { useImmer } from '@/hooks/useImmer'
import { useQuery } from '@tanstack/vue-query'
import {
  NButton,
  NCard,
  NForm,
  NFormItem,
  NImage,
  NInputNumber,
  NSpin,
  type FormInst,
  useMessage
} from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

const CommodityDetail = defineComponent(() => {
  const route = useRoute()
  const message = useMessage()

  //@ts-ignore
  const input = ref<OrderInput>({ commodity: { id: Number(route.params.id) } })
  const inputRef = ref<FormInst | undefined>(undefined)

  const sumbit = () => {
    inputRef.value?.validate((error) => {
      if (error) return
      api.orderController
        .createOrder({
          body: input.value
        })
        .then(() => {
          message.success('购买成功')
        })
    })
  }

  const { data, error } = useQuery({
    queryKey: ['commodity', route.params.id],
    queryFn: () => api.commodityController.getCommodity({ id: Number(route.params.id) })
  })

  return () =>
    error.value != undefined ? (
      <div>商品不存在</div>
    ) : data.value == undefined ? (
      <NSpin />
    ) : (
      <>
        <NCard>
          <div class={'flex justify-between'}>
            <NImage class={'w-1/3 h-1/3'} src={`${BASE_URL}/images/${data.value.image.id}/`} />
            <div class={'flex flex-col text-2xl'}>
              <div>{data.value.name}</div>
              <div>{data.value.description}</div>
              <div class={'text-red-500'}>￥{data.value.price}</div>
              <div>浏览次数:{data.value.view}</div>
              <div class={'flex gap-5'}>
                <div>最小度数:{data.value.minimumPrescription}</div>
                <div>最大度数:{data.value.maximumPrescription}</div>
              </div>
              <NCard class={'mt-5'}>
                <NForm model={input.value} ref={inputRef}>
                  <NFormItem
                    label={'度数'}
                    path="prescription"
                    rule={[
                      {
                        required: true,
                        message: '请输入度数',
                        trigger: ['blur', 'input'],
                        type: 'number'
                      }
                    ]}
                  >
                    <NInputNumber
                      min={data.value.minimumPrescription}
                      max={data.value.maximumPrescription}
                      v-model:value={input.value.prescription}
                    />
                  </NFormItem>
                  <NFormItem
                    label={'数量'}
                    path={'quantity'}
                    rule={[
                      {
                        required: true,
                        message: '请输入数量',
                        trigger: ['blur', 'input'],
                        type: 'number'
                      }
                    ]}
                  >
                    <NInputNumber min={1} max={10} v-model:value={input.value.quantity} />
                  </NFormItem>
                  <NFormItem>
                    <NButton type={'primary'} onClick={sumbit}>
                      购买
                    </NButton>
                  </NFormItem>
                </NForm>
              </NCard>
            </div>
          </div>
        </NCard>
      </>
    )
})

export default CommodityDetail
