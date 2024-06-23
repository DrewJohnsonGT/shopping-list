import { useState } from 'react';
import { SkipNext } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/material';
import { createItem, updateItem } from '~/api/item';
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const item = useAppSelector((state) => state.cart.itemModalItem);
  const isItemModalOpen = useAppSelector((state) => state.cart.isItemModalOpen);
  const [name, setName] = useState(item?.name ?? '');
  const [description, setDescription] = useState(item?.description ?? '');
  const [quantity, setQuantity] = useState(item?.quantity || 1);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setIsItemModalOpen(false));
    setName('');
    setDescription('');
    setQuantity(1);
  };

  const handleSubmit = async () => {
    if (item) {
      await updateItem({ ...item, description, name, quantity });
    } else {
      await createItem({ checked: false, description, name, quantity });
    }
    handleClose();
  };

  return (
    <Dialog
      open={isItemModalOpen}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="info" variant="text">
          Cancel
        </Button>
        <Button
          onClick={() => {
            // https://typescript-eslint.io/rules/no-misused-promises/#checksvoidreturn
            const handle = async () => {
              await handleSubmit();
            };
            handle().catch((err: unknown) => console.log(err));
          }}
          variant="contained"
          color="secondary"
          disabled={!name || !description}>
          {`${item ? 'Edit' : 'Add'} Item`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
