import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    if (import.meta.env.MODE !== 'production') {
      return getDefaultMiddleware().concat(logger, apiSlice.middleware);
    }
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: import.meta.env.MODE !== 'production'
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
