import { SyntheticEvent, forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeAlert } from '../../store/alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AppAlert() {
  const dispatch = useAppDispatch();
  const { isOpen, type, message } = useAppSelector(state => state.alert);


  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeAlert());
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar 
        open={isOpen} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%', fontSize: 18 }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}