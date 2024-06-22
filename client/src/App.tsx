import { AppBar, Box, Typography } from '@mui/material';
import styles from './App.module.css';

export const App = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <AppBar position="static" className={styles.appBar}>
        <Typography variant="h1" className={styles.headerTitle}>
          SHOPPING LIST
        </Typography>
      </AppBar>
    </Box>
  );
};
