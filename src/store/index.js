import { configureStore } from '@reduxjs/toolkit';

import filtersReducer from '../components/heroesFilters/filtersSlice';
import { apiSlice } from '../api/apiSlice';

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production' ? true : false,
});

export default store;
