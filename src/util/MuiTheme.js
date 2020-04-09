import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
        light: '#484848',
        main: '#212121',
        dark: '#000000',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#e5e5e5',
        main: '#1565c0',
        dark: '#003c8f',
        contrastText: '#ffffff',
      },
  },
})

export default theme

