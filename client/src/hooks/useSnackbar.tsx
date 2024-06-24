import { createContext, useContext, useState } from 'react';
import { Alert, AlertProps, Snackbar } from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';

interface SnackbarInput {
  message: string;
  open?: boolean;
  severity?: AlertProps['severity'];
  timeout?: number;
}

const SnackbarContext = createContext<{
  setSnackbar: (snackbar: SnackbarInput) => void;
}>({
  setSnackbar: () => null,
});

const DEFAULT_SNACKBAR_STATE: SnackbarInput = {
  message: '',
  open: false,
  severity: 'success',
};

const SlideTransition = (props: SlideProps) => (
  <Slide {...props} direction="up" />
);

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarInput>(
    DEFAULT_SNACKBAR_STATE,
  );
  const handleSetSnackbar = (snackbar: SnackbarInput) => {
    setSnackbar({ ...snackbar, open: true });
  };

  return (
    <SnackbarContext.Provider value={{ setSnackbar: handleSetSnackbar }}>
      {children}
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={snackbar.open}
        autoHideDuration={snackbar.timeout || 5000}
        TransitionComponent={SlideTransition}
        onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ whiteSpace: 'pre-line' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSnackbar = () => {
  const { setSnackbar } = useContext(SnackbarContext);

  return setSnackbar;
};
