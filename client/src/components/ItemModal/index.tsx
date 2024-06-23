import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import { setIsItemModalOpen } from '~/state/slice';

export const ItemModal = () => {
  const item = useAppSelector((state) => state.cart.itemModalItem);
  const isItemModalOpen = useAppSelector((state) => state.cart.isItemModalOpen);
  const [name, setName] = useState(item?.name);
  const [description, setDescription] = useState(item?.description);
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
          label="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          fullWidth
          margin="dense"
        />
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
