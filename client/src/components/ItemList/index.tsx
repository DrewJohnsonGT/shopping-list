import { CircularProgress } from '@mui/material';
import { useItems } from '~/api/item';
import { DeleteItemModal } from './DeleteItemModal';
import { EmptyMessage } from './EmptyMessage';
import { ItemCard } from './ItemCard';
import styles from './ItemList.module.css';

export const ItemList = () => {
  const { isLoading, items } = useItems();
  return (
    <div className={styles.root}>
      {isLoading && <CircularProgress size="6rem" thickness={2} />}
      {!isLoading && items?.length === 0 && <EmptyMessage />}
      {items?.map((item) => <ItemCard key={item.id} item={item} />)}
      <DeleteItemModal />
    </div>
  );
};
