import { Button, Container, Typography } from '@mui/material';
import { useAppDispatch } from '~/state/hooks';
import { setIsItemModalOpen } from '~/state/slice';
import styles from './EmptyMessage.module.css';

export const EmptyMessage = () => {
  const dispatch = useAppDispatch();
  return (
    <Container className={styles.container}>
      <Typography variant="body1" className={styles.message}>
        Your shopping list is empty :(
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          dispatch(setIsItemModalOpen(true));
        }}>
        Add your first item
      </Button>
    </Container>
  );
};
