import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: '#FA4A0C',
    blue: '#06177A',
    orange: '#F65901',
    green: '#009930',
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
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
})

export default vuetify
