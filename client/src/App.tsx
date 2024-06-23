import { useEffect } from 'react';
import { AppBar, Box, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { getItems } from '~/api/getItems';
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import { setIsLoading, setItems } from '~/state/slice';
import styles from './App.module.css';

export const App = () => {
  const items = useAppSelector((state) => state.cart.items);
  const isLoading = useAppSelector((state) => state.cart.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    getItems()
      .then((items) => {
        dispatch(setItems(items));
      })
      .catch((err: unknown) => {
        console.error(err);
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }, [dispatch]);

  return (
    <Box sx={{ height: '100%' }}>
      <AppBar position="static" className={styles.appBar}>
        <Typography variant="h1" className={styles.headerTitle}>
          SHOPPING LIST
        </Typography>
      </AppBar>
      <div>
        {isLoading && <CircularProgress size="6rem" thickness={2} />}
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </Box>
  );
};
