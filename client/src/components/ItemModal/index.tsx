import { useState } from 'react';
import { SkipNext } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/material';
import { useItems } from '~/api/item';
import { Item } from '~/schema';
import { useAppDispatch } from '~/state/hooks';
import { setItemModal } from '~/state/slice';
import styles from './ItemModal.module.css';

const MAX_QUANTITY = 20;
const MAX_DESCRIPTION_LENGTH = 100;
const QUANTITY_OPTIONS = Array.from({ length: MAX_QUANTITY }, (_, i) => i + 1);

const CharacterCount = ({ count, max }: { count: number; max: number }) => (
  <Box className={styles.characterCount} component="span">
    <Box color={count >= max ? 'error.main' : undefined} component="span">
      {count} / {max}
    </Box>
  </Box>
);

interface ItemModalProps {
  item: Item | null;
}

export const ItemModal = ({ item }: ItemModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { createItem, updateItem } = useItems();

  const [name, setName] = useState(item?.name ?? '');
  const [description, setDescription] = useState(item?.description ?? '');
  const [quantity, setQuantity] = useState(item?.quantity ?? 1);
  const [checked, setChecked] = useState(item?.checked ?? false);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setItemModal({ isOpen: false }));
  };

  const handleSubmit = () => {
    if (item?.id) {
      updateItem({ ...item, checked, description, name, quantity });
    } else {
      createItem({
        checked,
        description,
        name,
        quantity,
      });
    }
    handleClose();
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      fullScreen={fullScreen}
      PaperProps={{
        className: styles.paper,
      }}>
      <DialogTitle className={styles.headerBar}>
        SHOPPING LIST
        <IconButton onClick={handleClose}>
          <SkipNext />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.content}>
        <Typography variant="h5">{`${item ? 'Edit' : 'Add'} an Item`}</Typography>
        <Typography variant="body1">{`${item ? 'Edit' : 'Add'} your item below`}</Typography>
        <TextField
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          sx={{ position: 'relative' }}
          helperText={
            <CharacterCount
              count={description.length}
              max={MAX_DESCRIPTION_LENGTH}
            />
          }
          placeholder="Item Description"
          inputProps={{ maxLength: MAX_DESCRIPTION_LENGTH }}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          rows={6}
          multiline
          fullWidth
        />
        <TextField
          select
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          fullWidth>
          {QUANTITY_OPTIONS.map((_, index) => (
            <MenuItem key={index} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              inputProps={{ 'aria-label': 'purchased' }}
            />
          }
          label="Purchased"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="info" variant="text">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="secondary"
          disabled={!name || !description}>
          {`${item ? 'Edit' : 'Add'} Item`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
