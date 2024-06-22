import { AppBar, Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import { decrement, increment } from '~/state/slice';
import styles from './App.module.css';

export const App = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ height: '100%' }}>
      <AppBar position="static" className={styles.appBar}>
        <Typography variant="h1" className={styles.headerTitle}>
          SHOPPING LIST
        </Typography>
      </AppBar>
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}>
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}>
            Decrement
          </button>
        </div>
      </div>
    </Box>
  );
};
