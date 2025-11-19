import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VPie } from 'vuetify/labs/VPie'

const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: '#FA4A0C',
    blue: '#06177A',
    orange: '#F65901',
    green: '#32D74B',
    lime: '#CFBB03',
    wine: '#AE0C0C',
    brown: '#AE6D0C',
    yellow: '#FEF9C3',
    'purple-200': '#AE0C6D',
    'blue-200': '#0C6AAE',
    'green-200': '#0CAEA5',
  },
}

const vuetify = createVuetify({
  components: {
    ...components,
    VPie,
  },
  directives,
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
})

export default vuetify
