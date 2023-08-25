import { NMenu, type MenuOption, NLayout, NLayoutSider } from 'naive-ui'
import { defineComponent } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const MainLayout = defineComponent(() => {
  const route = useRoute()

  const options: MenuOption[] = [
    {
      label: () => <RouterLink to={{ name: 'member' }}>用户管理</RouterLink>,
      key: 'member'
    },
    {
      label: () => <RouterLink to={{ name: 'commodity' }}>商品管理</RouterLink>,
      key: 'commodity'
    },
    {
      label: () => <RouterLink to={{ name: 'order' }}>订单管理</RouterLink>,
      key: 'order'
    }
  ]

  return () => (
    <>
      <NLayout hasSider position={'absolute'}>
        <NLayoutSider bordered content-style="padding: 24px;">
          <NMenu options={options} value={route.name as string} />
        </NLayoutSider>
        <NLayout content-style="padding: 24px;">
          <RouterView />
        </NLayout>
      </NLayout>
    </>
  )
})

export default MainLayout
