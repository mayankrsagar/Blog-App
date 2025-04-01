// store.ts
// import { configureStore } from '@reduxjs/toolkit';

// import blogReducer from '../features/blogSlice';

// export const store = configureStore({
//   reducer: {
//     // Add your reducers here
//     blog: blogReducer,
//   },
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import blogReducer from '@/features/blogSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
