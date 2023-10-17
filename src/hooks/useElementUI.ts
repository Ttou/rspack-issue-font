import { ElementUIOptions } from 'element-ui'
import type { VueConstructor } from 'vue'

export function useElementUI(Vue: VueConstructor) {
  Vue.prototype.$ELEMENT = { size: 'small' } as ElementUIOptions
}
