import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useItems } from '~/api/item';
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import { setDeleteItemModalItem } from '~/state/slice';

export const DeleteItemModal = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { deleteItem, isLoading } = useItems();
  const itemToBeDeleted = useAppSelector(
    (state) => state.cart.deleteItemModalItem,
  );

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setDeleteItemModalItem(null));
  };

  const handleSubmit = () => {
    itemToBeDeleted?.id && deleteItem(itemToBeDeleted.id);
    handleClose();
  };

  return (
    <Dialog
      open={!!itemToBeDeleted}
      onClose={handleClose}
      fullScreen={fullScreen}>
      <DialogTitle>Delete Item?</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this item? This can not be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="info" variant="text">
          Cancel
        </Button>
        <LoadingButton
          onClick={handleSubmit}
          variant="contained"
          color="secondary"
          loading={isLoading}>
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
