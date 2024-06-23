import { useEffect } from 'react';
import { AppBar, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { getItems } from '~/api/item';
import { EmptyMessage, ItemModal } from '~/components';
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
    <main className={styles.page}>
      <AppBar position="static" className={styles.appBar}>
        <Typography variant="h1" className={styles.headerTitle}>
          SHOPPING LIST
        </Typography>
      </AppBar>
      <div className={styles.content}>
        {isLoading && <CircularProgress size="6rem" thickness={2} />}
        {!isLoading && items.length === 0 && <EmptyMessage />}
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      <ItemModal />
    </main>
  );
};
