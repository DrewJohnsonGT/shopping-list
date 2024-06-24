import { AppBar, Typography } from '@mui/material';
import { ItemList, ItemModal } from '~/components';
import styles from './App.module.css';
import { useAppSelector } from './state/hooks';

export const App = () => {
  const itemModalItem = useAppSelector((state) => state.cart.itemModalItem);
  const isItemModalOpen = useAppSelector((state) => state.cart.isItemModalOpen);
  return (
    <main className={styles.page}>
      <AppBar position="static" elevation={0} className={styles.appBar}>
        <Typography variant="h1" className={styles.headerTitle}>
          SHOPPING LIST
        </Typography>
      </AppBar>
      <ItemList />
      {isItemModalOpen && <ItemModal item={itemModalItem} />}
    </main>
  );
};
