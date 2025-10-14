import type { App } from 'vue'
import ButtonIcon from './ButtonIcon.vue'
import Icon from './Icon.vue'
import Input from './Input.vue'
import Select from './Select.vue'

const components = [
  { name: 'UIInput', component: Input },
  { name: 'UISelect', component: Select },
  { name: 'UIButtonWithIcon', component: ButtonIcon },
  { name: 'UIIcon', component: Icon },
]

export default {
  install(app: App) {
    components.forEach(({ name, component }) => {
      app.component(name, component)
    })
  },
}