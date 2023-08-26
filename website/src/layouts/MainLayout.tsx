import { NMenu, type MenuOption } from 'naive-ui'
import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const MainLayout = defineComponent(() => {
  const options: MenuOption[] = [
    {
      label: () => <RouterLink to={{ name: 'home' }}>主页</RouterLink>,
      key: 'home'
    },
    {
      label: () => <RouterLink to={{ name: 'buy-history' }}>购买记录</RouterLink>,
      key: 'buy-history'
    },
    {
      label: () => <RouterLink to={{ name: 'member-detail' }}>个人信息</RouterLink>,
      key: 'member-detail'
    }
  ]

  return () => (
    <>
      <div class={'container mx-auto'}>
        <NMenu options={options} mode={'horizontal'} />
        <RouterView />
      </div>
    </>
  )
})

export default MainLayout
