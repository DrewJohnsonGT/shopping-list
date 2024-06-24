import { Button, CircularProgress, Typography } from '@mui/material';
import { useItems } from '~/api/item';
import { useAppDispatch } from '~/state/hooks';
import { setItemModal } from '~/state/slice';
import { DeleteItemModal } from './DeleteItemModal';
import { EmptyMessage } from './EmptyMessage';
import { ItemCard } from './ItemCard';
import styles from './ItemList.module.css';

export const ItemList = () => {
  const dispatch = useAppDispatch();
  const { isLoading, items } = useItems();
  if (isLoading) {
    return <CircularProgress size="6rem" thickness={2} />;
  }
  if (!items?.length) {
    return <EmptyMessage />;
  }
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Typography variant="h6" fontSize={18} sx={{ userSelect: 'none' }}>
          Your items
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(setItemModal({ isOpen: true }))}
          sx={{ textTransform: 'none' }}>
          Add Item
        </Button>
      </div>
      <div className={styles.items}>
        {items
          .sort((a, b) => {
            if (a.createdAt > b.createdAt) {
              return 1;
            }
            if (a.createdAt < b.createdAt) {
              return -1;
            }
            return 0;
          })
          .map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
      </div>
      <DeleteItemModal />
    </div>
  );
};
