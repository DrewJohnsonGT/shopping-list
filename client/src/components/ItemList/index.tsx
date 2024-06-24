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
  const { deleteItems, isLoading, items } = useItems();
  if (isLoading) {
    return (
      <CircularProgress size="6rem" thickness={2} sx={{ margin: 'auto' }} />
    );
  }
  if (!items?.length) {
    return <EmptyMessage />;
  }
  const hasCheckedItems = items.some((item) => item.checked);
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Typography
          variant="h6"
          fontSize={18}
          sx={{ marginRight: 'auto', userSelect: 'none' }}>
          Your items
        </Typography>
        {hasCheckedItems && (
          <Button
            variant="text"
            color="primary"
            sx={{ textTransform: 'none' }}
            onClick={() => {
              deleteItems(items.filter((item) => item.checked));
            }}>
            Clear Checked Items
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(setItemModal({ isOpen: true }))}
          sx={{ textTransform: 'none' }}>
          Add Item
        </Button>
      </div>
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
      <DeleteItemModal />
    </div>
  );
};
