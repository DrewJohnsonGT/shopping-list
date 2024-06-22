import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { App } from '~/App';
import { store } from '~/state/store';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4d80b7',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
