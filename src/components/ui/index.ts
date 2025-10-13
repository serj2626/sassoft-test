import type { App } from 'vue'
import ButtonIcon from './ButtonIcon.vue'
import Input from './Input.vue'
import Select from './Select.vue'

const components = [
  { name: 'UIButton', component: Input },
  { name: 'UISelect', component: Select },
  { name: 'UIButtonWithIcon', component: ButtonIcon },
]

export default {
  install(app: App) {
    components.forEach(({ name, component }) => {
      app.component(name, component)
    })
  },
}