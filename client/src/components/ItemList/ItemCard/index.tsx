import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { Box, Checkbox, IconButton, Typography } from '@mui/material';
import { useItems } from '~/api/item';
import { Item } from '~/schema';
import { useAppDispatch } from '~/state/hooks';
import { setDeleteItemModalItem, setItemModal } from '~/state/slice';
import styles from './ItemCard.module.css';

interface ItemCardProps {
  item: Item;
}

export const ItemCard = ({ item }: ItemCardProps) => {
  const dispatch = useAppDispatch();
  const { updateItem } = useItems();
  return (
    <Box
      className={styles.card}
      sx={{
        '&:hover': {
          backgroundColor: (theme) => theme.palette.grey[100],
          cursor: 'pointer',
        },
        backgroundColor: (theme) =>
          item.checked
            ? theme.palette.grey[200]
            : theme.palette.background.paper,
      }}>
      <Checkbox
        checked={Boolean(item.checked)}
        onChange={(e) =>
          updateItem({
            ...item,
            checked: e.target.checked,
          })
        }
      />
      <Box
        className={styles.text}
        sx={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
        <Typography
          fontSize={16}
          sx={{
            color: (theme) =>
              item.checked
                ? theme.palette.primary.main
                : theme.palette.text.primary,
          }}>
          {item.name}
        </Typography>
        <Typography
          fontSize={14}
          color={(theme) => theme.palette.text.secondary}>
          {item.description}
        </Typography>
      </Box>
      <IconButton
        onClick={() => dispatch(setItemModal({ isOpen: true, item }))}>
        <EditOutlined />
      </IconButton>
      <IconButton onClick={() => dispatch(setDeleteItemModalItem(item))}>
        <DeleteOutlined />
      </IconButton>
    </Box>
  );
};
