import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AlertType, AlertTypeEnum } from '../../types';

interface ShowAlert {
  type: AlertType;
  message: string;
}

export interface AlertState {
  type: AlertType;
  message: string;
  isOpen: boolean;
}

const initialState: AlertState = {
  type: AlertTypeEnum.Success,
  message: '',
  isOpen: false,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,

  reducers: {
    showAlert: (state, { payload: alert }: PayloadAction<ShowAlert>) => {
      state.isOpen = true;
      state.type = alert.type;
      state.message = alert.message;
    },

    closeAlert: (state) => {
      state.isOpen = false;
    } 
  },
});

export const { showAlert, closeAlert } = alertSlice.actions;
export default alertSlice.reducer;
