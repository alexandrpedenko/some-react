import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import auth from "./auth";
import alert from "./alert";

export const store = configureStore({
  reducer: {
    auth,
    alert
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();

    // NOTE: Array with my middleware
    // const middlewares = [];

    // TODO: Put logger only for dev mode

    return middleware.concat(logger);
  },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
