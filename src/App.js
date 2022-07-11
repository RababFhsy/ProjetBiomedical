import { makeStyles } from '@material-ui/core'
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';

// components
import ScrollToTop from './components/ScrollToTop';

import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';



// ----------------------------------------------------------------------

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '1px',
    width: '50%'
  }
})

export default function App() {
  const classes = useStyles(); 
  return (
    <ThemeProvider>
      <ScrollToTop />
      
      <BaseOptionChartStyle />
      
      <Router />
    </ThemeProvider>
  );
}
