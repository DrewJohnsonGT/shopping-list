import { useState } from 'react';
import { LastPageSharp } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
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

interface ItemModalProps {
  item: Item | null;
}

export const ItemModal = ({ item }: ItemModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { createItem, updateItem } = useItems();

  const [name, setName] = useState(item?.name ?? '');
  const [description, setDescription] = useState(item?.description ?? '');
  const [quantity, setQuantity] = useState(item?.quantity);
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
        quantity: quantity || 1,
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
        sx: {
          borderBottom: (theme) => `5px solid ${theme.palette.secondary.main}`,
        },
      }}>
      <DialogTitle className={styles.headerBar}>
        SHOPPING LIST
        <IconButton onClick={handleClose}>
          <LastPageSharp />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.content}>
        <div>
          <Typography
            fontSize={18}
            fontWeight={400}
            sx={{
              marginBottom: 0,
            }}>{`${item ? 'Edit' : 'Add'} an Item`}</Typography>
          <Typography
            fontSize={16}
            fontWeight={400}
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}>{`${item ? 'Edit' : 'Add'} your item below`}</Typography>
        </div>
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
        <FormControl>
          {!quantity && <InputLabel>How many?</InputLabel>}
          <Select
            value={quantity || ''}
            onChange={(e) => setQuantity(Number(e.target.value))}
            fullWidth>
            {QUANTITY_OPTIONS.map((_, index) => (
              <MenuItem
                key={index}
                value={index + 1}
                sx={{
                  padding: '0.75rem',
                }}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              inputProps={{ 'aria-label': 'purchased' }}
            />
          }
          label="Purchased"
          sx={{ color: (theme) => theme.palette.text.secondary }}
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
