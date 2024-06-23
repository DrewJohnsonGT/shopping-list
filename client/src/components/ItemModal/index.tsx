import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import { setIsItemModalOpen } from '~/state/slice';
import styles from './ItemModal.module.css';

const MAX_QUANTITY = 10;
const MAX_DESCRIPTION_LENGTH = 100;
const QUANTITY_OPTIONS = Array.from({ length: MAX_QUANTITY }, (_, i) => i + 1);

const CharacterCount = ({ count, max }: { count: number; max: number }) => (
  <Box className={styles.characterCount} component="span">
    <Box color={count >= max ? 'error.main' : undefined} component="span">
      {count} / {max}
    </Box>
  </Box>
);

export const ItemModal = () => {
  const item = useAppSelector((state) => state.cart.itemModalItem);
  const isItemModalOpen = useAppSelector((state) => state.cart.isItemModalOpen);
  const [name, setName] = useState(item?.name ?? '');
  const [description, setDescription] = useState(item?.description ?? '');
  const [quantity, setQuantity] = useState(item?.quantity || 1);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setIsItemModalOpen(false));
  };

  return (
    <Dialog open={isItemModalOpen} onClose={handleClose}>
      <DialogTitle>{`${item ? 'Edit' : 'Add'} an Item`}</DialogTitle>
      <DialogContent>
        <TextField
          label="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          sx={{ position: 'relative' }}
          helperText={
            <CharacterCount
              count={description.length}
              max={MAX_DESCRIPTION_LENGTH}
            />
          }
          label="Item Description"
          inputProps={{ maxLength: MAX_DESCRIPTION_LENGTH }}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          rows={5}
          multiline
          fullWidth
        />
        <TextField
          select
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          fullWidth
          margin="dense">
          {QUANTITY_OPTIONS.map((_, index) => (
            <MenuItem key={index} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            // Add or edit the item logic
            handleClose();
          }}
          color="primary">
          {`${item ? 'Edit' : 'Add'} Item`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
