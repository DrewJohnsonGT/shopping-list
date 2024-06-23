import { Delete, Edit } from '@mui/icons-material';
import { Checkbox, IconButton, Typography } from '@mui/material';
import { Item } from '~/schema';
import { useAppDispatch } from '~/state/hooks';
import { setDeleteItemModalItem, setItemModal } from '~/state/slice';
import styles from './ItemCard.module.css';

interface ItemCardProps {
  item: Item;
}

export const ItemCard = ({ item }: ItemCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.card}>
      <Checkbox />
      <div className={styles.text}>
        <Typography>{item.name}</Typography>
        <Typography>{item.description}</Typography>
      </div>
      <IconButton
        onClick={() => dispatch(setItemModal({ isOpen: true, item }))}>
        <Edit />
      </IconButton>
      <IconButton onClick={() => dispatch(setDeleteItemModalItem(item))}>
        <Delete />
      </IconButton>
    </div>
  );
};
